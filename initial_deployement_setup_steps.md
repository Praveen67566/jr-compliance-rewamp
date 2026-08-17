# Initial deployment setup steps

This guide is the first-deployment checklist for the temporary JR Compliance
test environment on a shared VPS:

| Public hostname | Application | Private upstream |
| --- | --- | --- |
| `https://cms.jrcompliance.com` | Strapi CMS/admin | `127.0.0.1:1337` |
| `https://test.jrcompliance.com` | Next.js frontend | `127.0.0.1:8123` |

Nginx is the only public entry point. PostgreSQL, Strapi, and Next.js must not
be reachable directly from the internet.

This is a test-environment guide, not permission to treat the test host as the
future production host. Before a real production launch, follow
[`prod.md`](./prod.md), use durable CMS media storage, take database/media
backups, and address the documented CMS dependency-audit gate.

## Safety rules for this shared server

- Inspect existing processes, ports, and Nginx hosts before changing anything.
- Never use `pm2 delete all`, change another project's Nginx server block, or
  remove another project's certificate.
- Keep `8123`, `1337`, and PostgreSQL `5432` private. Do not open them in the
  firewall.
- Use a dedicated non-root deploy user on a new or long-lived environment. If
  the current test PM2 daemon is already owned by `root`, do not change its
  owner halfway through a deployment without a separate migration plan.
- Keep `cms/.env` and `frontend/.env.production.local` out of Git and mode
  `0600`. Never paste their values into tickets, chat, or commits.

The examples use this checkout path:

```bash
PROJECT_DIR=/var/www/jr-compliance-rewamp
```

Adjust it only if the project was cloned elsewhere.

## 1. Inspect the host first

Run these read-only checks before installing or starting anything:

```bash
node --version
npm --version
pm2 status
sudo ss -ltnp | grep -E ':(80|443|5432|8123|1337)\b'
sudo nginx -T
git -C "$PROJECT_DIR" status --short
git -C "$PROJECT_DIR" ls-files cms | sed -n '1,20p'
```

Node.js must be at least `20.9`; Node 22 is the documented baseline. Confirm
that the PM2 names `jr-compliance-cms` and `jr-compliance-frontend` do not
belong to another app, and that ports `8123` and `1337` are unused.

If a private port is already occupied, **do not stop the other project**.
Choose a different unused port and update all related values together:

1. `ecosystem.config.js`;
2. the matching Nginx `proxy_pass` upstream; and
3. `NEXT_REVALIDATE_URL` in `cms/.env` when changing the frontend port.

Ensure DNS A/AAAA records for both requested subdomains point to this VPS
before requesting TLS certificates.

## 2. Prepare PostgreSQL

The CMS requires PostgreSQL in every active environment. The retained
`cms/.tmp/data.db` SQLite file is an offline rollback source from the local
migration and must not be configured or copied to this server.

First check the server and cluster:

```bash
psql --version
pg_lsclusters
systemctl is-active postgresql
```

If only `postgresql-client-14` exists, there is no database server yet. After
checking that port `5432` is unused, install the matching server package:

```bash
sudo apt update
sudo apt install postgresql-14
pg_lsclusters
```

The expected cluster is `14 main` on port `5432` with status `online`. Only if
the package was installed but no `14/main` cluster was created, run:

```bash
sudo pg_createcluster 14 main --start
```

Create one restricted role and database for this test site. Generate a
URL-safe password first; `openssl rand -hex 32` contains no characters that
need URL encoding in `DATABASE_URL`.

```bash
openssl rand -hex 32
sudo -u postgres psql
```

At the PostgreSQL prompt, run each command on its own line:

```sql
CREATE ROLE jr_compliance_test LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION;
\password jr_compliance_test
CREATE DATABASE jr_compliance_test OWNER jr_compliance_test;
\q
```

`\password` prompts securely for the generated password. Do not put a password
in shell history. Verify the new application login:

```bash
psql -h 127.0.0.1 -U jr_compliance_test -d jr_compliance_test -W
```

Inside the successful connection, run `SELECT current_database(),
current_user;`, then `\q`.

Because this test database is local to the VPS, use `DATABASE_SSL=false` in
the CMS environment. A remote/managed database should use TLS as described in
[`prod.md`](./prod.md).

## 3. Configure and start the CMS

Create the ignored CMS environment file before building. Generate a different
random value for every secret; `APP_KEYS` has four comma-separated values.

```bash
cd "$PROJECT_DIR/cms"
nano .env
chmod 600 .env
```

Use this template, replacing every angle-bracket placeholder locally:

```dotenv
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://cms.jrcompliance.com
IS_PROXIED=true
CORS_ORIGINS=https://test.jrcompliance.com

APP_KEYS=<key-1>,<key-2>,<key-3>,<key-4>
API_TOKEN_SALT=<random-secret>
ADMIN_JWT_SECRET=<random-secret>
TRANSFER_TOKEN_SALT=<random-secret>
JWT_SECRET=<random-secret>
ENCRYPTION_KEY=<random-secret>

DATABASE_CLIENT=postgres
DATABASE_URL=postgres://jr_compliance_test:<database-password>@127.0.0.1:5432/jr_compliance_test
DATABASE_SSL=false
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

SEED_DEMO_CONTENT=false
SEED_COMPANY_REGISTRATION_PAGES=false
SEED_MCA_SERVICE_PAGES=false
SEED_LEAD_FORM_SETTINGS=false

NEXT_REVALIDATE_URL=http://127.0.0.1:8123/api/revalidate
STRAPI_REVALIDATE_SECRET=<shared-random-secret>
```

The `CORS_ORIGINS` entry is only for an approved browser client. The Next.js
server reads Strapi server-to-server, so it does not need CORS permission.

The current CMS uses Strapi's local upload provider. Git does not track its
upload directory, so create it before starting Strapi:

```bash
mkdir -p "$PROJECT_DIR/cms/public/uploads"
chmod 755 "$PROJECT_DIR/cms/public/uploads"
```

For this temporary test setup, uploads live in that directory. Back it up if
you add media. A future production deployment needs object storage or a backed
persistent volume before content is imported.

Install and build the CMS:

```bash
cd "$PROJECT_DIR/cms"
npm ci
npm run build
```

Start only the CMS; this does not touch the other PM2 projects:

```bash
cd "$PROJECT_DIR"
pm2 start ecosystem.config.js --only jr-compliance-cms --env production
pm2 status
pm2 logs jr-compliance-cms --lines 80 --nostream
curl -I http://127.0.0.1:1337/admin
```

If this project was already started, use this instead of starting a duplicate:

```bash
pm2 restart jr-compliance-cms --update-env
```

The local CMS check must return `200`, `301`, or `302` before configuring the
public proxy.

## 4. Expose the CMS through Nginx and TLS

First check that no existing server block already claims the hostname:

```bash
sudo nginx -T 2>/dev/null | grep -n 'cms\.jrcompliance\.com'
```

If it has no output, create a separate file named
`/etc/nginx/sites-available/jr-compliance-test.conf` containing this CMS block:

```nginx
server {
    listen 80;
    server_name cms.jrcompliance.com;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
}
```

Enable, validate, and reload only after validation succeeds:

```bash
sudo ln -s /etc/nginx/sites-available/jr-compliance-test.conf /etc/nginx/sites-enabled/jr-compliance-test.conf
sudo nginx -t
sudo systemctl reload nginx
```

Issue a certificate only for the CMS hostname:

```bash
sudo certbot --nginx --redirect -d cms.jrcompliance.com
```

`certbot renew --dry-run` tests every certificate on a shared host. Failures
for unrelated domains do not mean this CMS certificate failed; confirm that
the `cms.jrcompliance.com` line itself reports success.

Now open `https://cms.jrcompliance.com/admin` and create the first Strapi
administrator.

## 5. Populate the CMS and create the frontend reader token

The Git clone supplies the **schemas** (the fields and content types), so
Strapi Content Manager knows about Home Page, About Page, Site Setting, and
the other defined types. The new PostgreSQL database contains no actual page
records or uploaded media until they are created or imported.

- For a quick frontend test, leave the CMS empty. The frontend uses its typed
  fallback data and the images already in `frontend/public/images`.
- For editable CMS content, import a reviewed Strapi export or create records
  and publish them in Content Manager.
- Keep every `SEED_*` setting `false` on this PostgreSQL server and in the
  local PostgreSQL source CMS.

### Populate this empty test CMS from the approved PostgreSQL transfer

The repository already includes starter data for the current routes, shared
navigation/footer, collections, relationships, and approved local images. The
verified local PostgreSQL migration is the source of that content. Use its
reviewed encrypted Strapi content/files archive; never configure the retained
SQLite rollback database and never set `SEED_DEMO_CONTENT=true`.

The import replaces the target's selected content and upload files, so do this
only while `jr_compliance_test` is the new test database. If editors have
already added content or uploads, make the backups below and get approval
before continuing. Strapi does not transfer administrator accounts or API
tokens, so the CMS administrator and `next-site-reader` token remain
environment-specific.

1. Use the approved encrypted archive from the verified local PostgreSQL
   migration. If a replacement archive is ever needed, create it from a
   verified scratch copy of the populated PostgreSQL source with every
   `SEED_*` value `false`:

   ```bash
   cd <scratch-postgres-cms>/cms
   npm run strapi -- export \
     --file /secure-backups/jr-cms-YYYY-MM-DD \
     --only content,files
   ```

   Let the CLI prompt for an encryption key; store it separately from the
   archive and never put it in shell history or Git.
2. Copy the encrypted archive to a protected directory on the VPS outside the
   repository. Verify its checksum before importing.

3. On the VPS, verify that target content/uploads are empty or that explicit
   replacement approval exists. Back up the target before importing, verify the
   backups, then stop only this CMS:

   ```bash
   sudo install -d -m 0700 -o postgres -g postgres /var/backups/jr-compliance-test
   sudo -u postgres pg_dump -Fc jr_compliance_test \
     -f /var/backups/jr-compliance-test/before-import-YYYY-MM-DD.dump
   sudo tar -C "$PROJECT_DIR/cms/public" \
     -czf /var/backups/jr-compliance-test/before-import-uploads-YYYY-MM-DD.tar.gz uploads
   sudo -u postgres pg_restore --list \
     /var/backups/jr-compliance-test/before-import-YYYY-MM-DD.dump >/dev/null
   sudo tar -tzf \
     /var/backups/jr-compliance-test/before-import-uploads-YYYY-MM-DD.tar.gz >/dev/null
   pm2 stop jr-compliance-cms
   ```

4. Import the archive interactively. Substitute the actual protected archive
   path; do not add `--force`:

   ```bash
   cd "$PROJECT_DIR/cms"
   npm run strapi -- import \
     --file /secure-transfer/jr-cms-YYYY-MM-DD.tar.gz.enc \
     --only content,files
   ```

   Enter the encryption key when prompted and read the deletion confirmation
   carefully. It is expected to replace the target's old content and upload
   files.

5. Start the CMS after the successful import:

   ```bash
   cd "$PROJECT_DIR"
   pm2 start ecosystem.config.js --only jr-compliance-cms --env production
   pm2 status
   ```

   Open Content Manager and confirm that the five single types, Company
   Registration Pages, MCA Service Pages, Import Export Service Pages,
   Government License & Certification Pages, supporting collections, and Media
   Library now contain records. The imported entries are published and can be
   edited normally: save your change, then click **Publish** to make it live.

   If the frontend was already deployed before the import, refresh its cached
   data after the CMS is online:

   ```bash
   pm2 restart jr-compliance-frontend --update-env
   ```

   Otherwise, continue to the frontend deployment in the next section; its
   first start will use the imported CMS content.

Create a Strapi API token for the frontend:

1. In the CMS, open **Settings → API Tokens → Create new API Token**.
2. Name it `next-site-reader` and choose **Custom**.
3. Grant only required read operations (`find`/`findOne`) to the five single
   types, Company Registration Pages, MCA Service Pages, Import Export Service
   Pages, Government License & Certification Pages, their selected supporting
   collections, and Upload `find`.
4. Keep the Public role without content or Upload read access.
5. Copy the token once and store it securely.

## 6. Configure and start the frontend

Create the frontend environment file after the reader token exists:

```bash
cd "$PROJECT_DIR/frontend"
nano .env.production.local
chmod 600 .env.production.local
```

```dotenv
STRAPI_URL=https://cms.jrcompliance.com
STRAPI_API_TOKEN=<next-site-reader-token>
STRAPI_REVALIDATE_SECRET=<exactly-the-same-value-as-cms/.env>
SITE_URL=https://test.jrcompliance.com
LEAD_WEBHOOK_BASE_URL=https://webhook.jrcompliance.com
```

None of these server values may use a `NEXT_PUBLIC_*` variable name.
`LEAD_WEBHOOK_BASE_URL` is required before accepting live consultation
requests; the lead route fails closed when it is missing or invalid. Build and
start only the frontend:

```bash
cd "$PROJECT_DIR/frontend"
npm ci
npm run typecheck
npm run build

cd "$PROJECT_DIR"
pm2 start ecosystem.config.js --only jr-compliance-frontend --env production
pm2 status
pm2 logs jr-compliance-frontend --lines 80 --nostream
curl -I http://127.0.0.1:8123/
```

The local frontend check must return `200`. If its PM2 process already exists,
restart that named process rather than creating another one:

```bash
pm2 restart jr-compliance-frontend --update-env
```

## 7. Expose the frontend through Nginx and TLS

Append this second server block to the existing
`/etc/nginx/sites-available/jr-compliance-test.conf` file. Do not replace the
CMS block. Add the `limit_req_zone` declaration once outside both server
blocks, because this sites-enabled file is included from Nginx's `http`
context:

```nginx
limit_req_zone $binary_remote_addr zone=jr_lead_submissions:10m rate=10r/m;

server {
    listen 80;
    server_name test.jrcompliance.com;

    # Public lead intake: keep the payload small and add an edge flood limit in
    # front of the app's stricter per-address single-process limiter.
    location = /api/leads {
        client_max_body_size 16k;
        limit_req zone=jr_lead_submissions burst=5 nodelay;
        limit_req_status 429;

        proxy_pass http://127.0.0.1:8123;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 10s;
    }

    location / {
        proxy_pass http://127.0.0.1:8123;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Strapi posts this route directly over loopback. Do not expose it publicly.
    location = /api/revalidate {
        deny all;
    }
}
```

Validate and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx --redirect -d test.jrcompliance.com
```

The `/api/leads` edge limit is required whenever live submissions are enabled.
Keep Next.js bound to loopback so the application can trust Nginx's
`X-Real-IP`; configure real-IP handling explicitly before adding another proxy
or CDN.

## 8. Initial validation and what happens after publishing

Run the following checks:

```bash
curl -I https://cms.jrcompliance.com/admin
curl -I https://test.jrcompliance.com/
curl -I https://test.jrcompliance.com/robots.txt
curl -I https://test.jrcompliance.com/sitemap.xml
curl -I https://cms.jrcompliance.com/api/home-page
curl -i -X POST https://test.jrcompliance.com/api/revalidate
```

Expected results:

- CMS admin and frontend routes return `200`, `301`, or `302`.
- The anonymous CMS API request is denied (`401` or `403`).
- The public revalidation request is denied (`403`).
- `pm2 status` shows the two JR Compliance processes as `online`; other PM2
  projects remain untouched.

When an editor changes and **publishes** CMS content or media, no code deploy
is needed. Strapi sends a signed loopback revalidation request to Next.js, so
the matching frontend page normally refreshes immediately; if that request is
unavailable, the normal cache refresh happens within about 60 seconds.

Static fallback images are already part of the repository:

```text
frontend/public/images/team.webp
→ https://test.jrcompliance.com/images/team.webp
```

Images uploaded in Strapi are stored in `cms/public/uploads/` for this test
host and are served from `https://cms.jrcompliance.com/uploads/...`.

For code, schema, environment, or proxy changes after initial setup, follow
the **Routine server update** section in [`prod.md`](./prod.md). It explains
which changes need a build/restart and which changes go live simply by
publishing in Strapi.
