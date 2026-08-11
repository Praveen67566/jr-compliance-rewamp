# Production deployment runbook

This repository deploys two applications:

| Application | Source directory | Production role |
| --- | --- | --- |
| Frontend | `frontend/` | Next.js 16 public site, ISR, metadata routes, and signed cache-revalidation endpoint. |
| CMS | `cms/` | Strapi v5 editor/admin API, PostgreSQL-backed content, media, and publish webhooks. |

`site/` is a legacy Webflow archive and content reference. Do **not** deploy it.

For a 24/7 Linux/VPS host, use the committed
[`ecosystem.config.js`](./ecosystem.config.js) to supervise both applications
with PM2. PM2 is the process manager; Nginx (or an equivalent TLS reverse
proxy) is still required in front of it.

## Release status

The application build and smoke tests pass, but the following gates must be
closed before a production launch:

1. **Resolve the CMS dependency audit.** At the latest validation it reports
   29 production dependency vulnerabilities, including 3 high-severity issues
   in the Strapi upload/admin dependency chain (`sharp`/libvips among them).
   The latest checked Strapi release is also `5.51.2` and pins this dependency,
   so wait for a vendor remediation or obtain a formal security risk acceptance;
   do not override `sharp` or use `npm audit fix --force` as a production fix.
2. **Configure durable media storage.** `cms/config/plugins.ts` currently uses
   Strapi's local upload provider. Choose and configure a Strapi-v5-compatible
   object-storage provider (or a backed persistent volume for a single CMS
   instance) before importing content. Ephemeral container storage will lose
   uploads.
3. **Track the CMS source.** At validation time almost all of `cms/` was
   untracked. A Git-based deploy will omit it until the intended CMS source,
   configuration, lockfile, and public assets are reviewed and committed.
   Keep `.env`, `.tmp/`, `public/uploads/`, `dist/`, and `.strapi/` ignored.
4. **Use an isolated production database and migrate content deliberately.**
   Do not deploy the local SQLite database or enable the demo seed in
   production. The CMS bootstrap can upgrade only the exact original demo
   header-menu signature; it does not replace customized navigation records.

The PostgreSQL driver (`pg@8.22.0`) is included in the CMS lockfile. The
remaining database, media, audit, and source-control gates require deployment
environment decisions and cannot be completed from this repository alone.

## Hosting requirements

- Use Node.js **20.9+**; use the same supported Node major for frontend and
  CMS (Node 22 is a sensible baseline).
- Host the frontend on a Node/Next.js runtime, not static-only hosting. It
  needs ISR and `POST /api/revalidate`.
- Run the CMS behind HTTPS and a reverse proxy/load balancer. Set
  `IS_PROXIED=true` only when that proxy is present.
- Use managed PostgreSQL with TLS, automated backups, and restricted network
  access. SQLite is local-development only.
- Put both public domains behind TLS. Enforce the canonical host and redirect
  the alternate host at the edge.
- Start with one frontend instance or use platform-integrated caching. If the
  frontend is horizontally scaled, add a shared Next.js cache with coordinated
  tag invalidation before relying on instant publish updates across instances.
- Run PM2 as a non-root deployment user. Allow only SSH, HTTP, and HTTPS from
  the internet; keep PostgreSQL, Next (`8123`), and Strapi (`1337`) private to
  the server/network.

## Pre-deployment source check

Review the working tree before any build is connected to Git or a platform:

```bash
git status --short
git ls-files cms
git check-ignore -v cms/.env cms/.tmp/data.db cms/public/uploads
```

Add and review the intended CMS source before committing; `git add cms` honors
`cms/.gitignore`, so it does not add the local environment, database, generated
build, or local uploads. Do not blindly stage unrelated user changes.

## Production environment

Store every value in the host's secret manager. Never commit an `.env` file or
use a `NEXT_PUBLIC_*` prefix for a secret.

For a single VPS without a secret manager, create protected, ignored files at
`cms/.env` and `frontend/.env.production.local`, owned by the non-root deploy
user and mode `0600`. If releases use separate checkout directories, keep the
secret files outside those directories and securely symlink or install them
into each release. They must be present **before** `npm run build`, not only
before PM2 starts.

### CMS (`cms/`)

```dotenv
# PM2 and Nginx run on the same server. Do not expose this port publicly.
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://cms.example.com
IS_PROXIED=true
CORS_ORIGINS=https://www.example.com,https://example.com

# Generate independent high-entropy values. APP_KEYS is comma-separated.
APP_KEYS=<key-1>,<key-2>,<key-3>,<key-4>
API_TOKEN_SALT=<random-secret>
ADMIN_JWT_SECRET=<random-secret>
TRANSFER_TOKEN_SALT=<random-secret>
JWT_SECRET=<random-secret>
ENCRYPTION_KEY=<random-secret>

DATABASE_CLIENT=postgres
DATABASE_URL=postgres://<user>:<password>@<host>:5432/<database>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

SEED_DEMO_CONTENT=false

# Same-VPS private publish notification; Nginx denies this endpoint publicly.
NEXT_REVALIDATE_URL=http://127.0.0.1:8123/api/revalidate
STRAPI_REVALIDATE_SECRET=<shared-random-secret>
```

Configure the selected media provider with its own least-privilege credentials
and public/CDN base URL. Limit upload types to the approved image formats
already configured by `cms/config/plugins.ts`; verify a freshly uploaded image
survives a CMS restart and loads from the frontend origin.

Strapi's default email provider is development-only. Configure SMTP or another
approved provider if production administrators need password-reset or other
outbound email flows.

### Frontend (`frontend/`)

```dotenv
STRAPI_URL=https://cms.example.com
STRAPI_API_TOKEN=<read-only-next-site-reader-token>
STRAPI_REVALIDATE_SECRET=<same-shared-random-secret-as-cms>
SITE_URL=https://www.example.com
```

`STRAPI_URL` and `STRAPI_API_TOKEN` are optional only while deliberately using
the typed local fallback. Production CMS mode needs both. `SITE_URL` is
required for absolute canonical metadata, `robots.txt`, and `sitemap.xml`.
Keep `STRAPI_URL` on the public CMS hostname, not `127.0.0.1`: the frontend
makes relative Strapi media URLs browser-visible using this origin, and visitors
cannot load a loopback URL from their own devices.

Create a Strapi Content API token with only the read operations required for
the five published single types and their populated content/media. Do not grant
the public role content or upload access, and never send this token to the
browser.

## 24/7 VPS process supervision (PM2)

The root [`ecosystem.config.js`](./ecosystem.config.js) starts exactly two
single-instance forked processes:

| PM2 name | Working directory | Command | Private port |
| --- | --- | --- |
| `jr-compliance-frontend` | `frontend/` | `npm run start -- --hostname 127.0.0.1` | `8123` |
| `jr-compliance-cms` | `cms/` | `npm run start` | `1337` |

The frontend is deliberately one instance because its current Next.js cache and
cache-tag invalidation are process-local. Do not scale it with `pm2 scale` or
change `instances` until a shared cache/tag-coordination implementation is in
place.

On the server, use the non-root deployment user that owns the checkout and its
ignored environment files:

```bash
cd /srv/jr-compliance-rewamp

# Install PM2 once for this Node.js/deployment user.
npm install --global pm2

# Build both applications first; see the Deploy order below.
pm2 startOrReload ecosystem.config.js --env production --update-env
pm2 status

# Enable restart after a reboot. Run the exact privileged command that PM2 prints.
pm2 startup
pm2 save

# Prevent unbounded 24/7 log growth.
pm2 install pm2-logrotate
```

Useful operations:

```bash
pm2 status
pm2 logs jr-compliance-frontend
pm2 logs jr-compliance-cms
pm2 monit
pm2 restart jr-compliance-cms --update-env
pm2 save
```

If the server's Node.js installation changes (especially when using NVM), run
`pm2 unstartup`, then `pm2 startup`, run the newly printed command, and finish
with `pm2 save`. This keeps systemd pointing at the current Node.js binary.

## Reverse proxy and TLS (Nginx example)

Point `example.com`, `www.example.com`, and `cms.example.com` to the server
first. On Ubuntu/Debian, place the following initial HTTP configuration in
`/etc/nginx/sites-available/jr-compliance.conf`, replace the example domains,
then enable it. Nginx is the only service that should listen publicly.

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 http://www.example.com$request_uri;
}

server {
    listen 80;
    server_name www.example.com;

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

    # Strapi calls this directly over loopback; do not accept internet traffic.
    location = /api/revalidate {
        deny all;
    }
}

server {
    listen 80;
    server_name cms.example.com;
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

Enable and validate the configuration, then issue certificates only after DNS
has propagated:

```bash
sudo ln -s /etc/nginx/sites-available/jr-compliance.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx --redirect -d example.com -d www.example.com -d cms.example.com
sudo certbot renew --dry-run
```

After HTTPS works for every required subdomain, add HSTS to the generated TLS
server blocks. Keep a tested Content-Security-Policy at the edge that permits
the selected CMS/media origin. The loopback webhook configuration above means
external `POST /api/revalidate` requests are denied by Nginx; if the CMS moves
off-host, remove that denial only after adding strict edge rate limiting.

## Deploy order

### 1. Prepare staging first

1. Provision a staging PostgreSQL database and durable media bucket/provider.
2. Deploy the CMS from `cms/` with `SEED_DEMO_CONTENT=false`.
3. Create the first administrator, configure editor/publisher permissions, and
   create the read-only frontend token.
4. Deploy the frontend from `frontend/` with its staging CMS URL and secrets.
5. Complete the validation checklist below in staging before using production
   credentials or importing production content.

### 2. Build the CMS

Set the service root to `cms/`:

```bash
npm ci
npm run build
```

Strapi will create/update its schema in the configured empty PostgreSQL
database. Confirm the configured public CMS URL, proxy headers, media URL, and
admin login before moving data.

### 3. Move content and media

The local seed is for a fresh local SQLite database only. It must stay off in
production.

For the current seeded/local content, first rehearse an encrypted Strapi export
and import on staging. Take a PostgreSQL snapshot and media backup before every
import. The CLI prompts for an export encryption key unless one is supplied:

```bash
# In the populated source CMS environment
npm run strapi -- export --file /secure-backups/jr-cms-YYYY-MM-DD

# In the empty target CMS environment, after a verified backup
npm run strapi -- import --file /secure-backups/jr-cms-YYYY-MM-DD
```

Do not add `--force` unless the target, backup, and recovery plan have been
verified. Confirm all five single types are **Published**, media records point
to durable storage, and the frontend token can read only published data.

### 4. Build the frontend

Set the service root to `frontend/`:

```bash
npm ci
npm run typecheck
npm run build
```

`npm run start` honors the host-provided `PORT` and otherwise defaults to
`8123` locally. Do not use `output: "export"` or a static-only host.

The frontend already emits baseline `nosniff`, frame, referrer, permissions,
and opener-policy headers and suppresses `X-Powered-By`. At the TLS edge also
enable HSTS once the canonical HTTPS domain is confirmed, rate-limit
`/api/revalidate`, and add a tested Content-Security-Policy that permits the
chosen CMS/media origin.

### 5. Start or reload both services with PM2

Run this only after both builds succeeded. On the first deploy it starts both
services; on later deploys it reloads the configured processes and preserves
the boot-time process list:

```bash
cd /srv/jr-compliance-rewamp
pm2 startOrReload ecosystem.config.js --env production --update-env
pm2 status
pm2 save
```

Do not run `pm2 delete all` during a normal release. A single forked frontend
process can have a short connection-drain window during reload; do not claim
multi-instance zero-downtime behavior until shared caching and coordinated tag
invalidation are configured.

### 6. Connect publishing to cache revalidation

Set the same `STRAPI_REVALIDATE_SECRET` in both services. The CMS sends a
signed publish/update/unpublish/delete/media notification to
`NEXT_REVALIDATE_URL`; the frontend accepts only known cache tags and validates
the HMAC before invalidating them. A failed notification does not block a
publish because the frontend also refreshes content on its 60-second interval.

### Routine server update

Build a reviewed release in a **new** checkout or release directory; do not run
`npm ci` over the `node_modules` of a process currently serving traffic. Keep
the prior release until post-deploy smoke checks pass. After the new release is
built and its protected environment files are in place, activate it and reload
PM2 from that release:

```bash
cd /srv/jr-compliance-releases/<new-release>/frontend
npm ci
npm run typecheck
npm run build

cd ../cms
npm ci
npm run build

cd ..
pm2 startOrReload ecosystem.config.js --env production --update-env
pm2 status
pm2 save
```

If your release mechanism uses a stable `current` symlink, run the PM2 command
through the new `current/ecosystem.config.js` after switching the symlink. Do
not delete the prior release until the validation checklist passes.

## Launch validation

Run these checks against the production domains after DNS and TLS are live:

1. `GET /`, `/about-us`, `/careers`, and `/contact-us` returns `200`; an
   unknown route returns `404`.
2. `GET /robots.txt`, `/sitemap.xml`, and `/icon` returns `200`; sitemap URLs
   use the canonical HTTPS origin.
3. Inspect a page response for the baseline security headers and no
   `X-Powered-By` header.
4. Confirm every local image, CMS image, primary navigation link, direct phone
   link, email link, and external social link works. Test desktop, tablet,
   mobile, keyboard focus, and reduced-motion behavior in real browsers.
5. With the frontend token, verify all five published CMS endpoints return
   expected content. Confirm the anonymous CMS request is denied.
6. Change a harmless CMS field, save a draft, publish it, and verify the
   matching page updates through the signed webhook (or within 60 seconds if
   the webhook is intentionally unavailable).
7. Check the CMS admin, media upload, database backup job, and object-storage
   restore procedure.
8. Re-run `npm audit --omit=dev` for both applications. Do not launch while
   the CMS high-severity findings remain unresolved or formally risk-accepted.

## Rollback

Keep the previous frontend and CMS build identifiers, a tested PostgreSQL
snapshot, and a versioned media backup. On a bad release, roll back the
frontend and CMS together when their content schemas changed; restore the
database/media only through the documented, rehearsed recovery procedure.
After rollback, publish or wait for the frontend cache interval so cached
content matches the restored CMS state.
