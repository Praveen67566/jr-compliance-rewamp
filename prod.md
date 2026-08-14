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

For a concrete first setup of the temporary
`cms.jrcompliance.com` / `test.jrcompliance.com` VPS environment, see
[`initial_deployement_setup_steps.md`](./initial_deployement_setup_steps.md).
That guide does not replace the production launch gates in this document.

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
3. **Verify the CMS source before each release.** The intended `cms/` source,
   configuration, lockfile, and public assets must remain tracked and reviewed
   in the release commit. Keep `.env`, `.tmp/`, `public/uploads/`, `dist/`,
   and `.strapi/` ignored.
4. **Use an isolated production database and migrate content deliberately.**
   Do not deploy the local SQLite database or enable the demo seed in
   production. The CMS bootstrap can upgrade only an exact known demo
   header-menu signature (the original flat menu or the previous categorized
   menu with two placeholder Company Registration links); it does not replace
   customized navigation records.

The PostgreSQL driver (`pg@8.22.0`) is included in the CMS lockfile. The
remaining database, media, and audit gates require deployment-environment
decisions and cannot be completed from this repository alone.

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
SEED_COMPANY_REGISTRATION_PAGES=false
SEED_LEAD_FORM_SETTINGS=false

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
LEAD_WEBHOOK_BASE_URL=https://webhook.jrcompliance.com
```

`STRAPI_URL` and `STRAPI_API_TOKEN` are optional only while deliberately using
the typed local fallback. Production CMS mode needs both. `SITE_URL` is
required for absolute canonical metadata, `robots.txt`, and `sitemap.xml`.
`LEAD_WEBHOOK_BASE_URL` is server-only and required before accepting live
consultation requests; the route fails closed when it is missing or invalid.
Keep `STRAPI_URL` on the public CMS hostname, not `127.0.0.1`: the frontend
makes relative Strapi media URLs browser-visible using this origin, and visitors
cannot load a loopback URL from their own devices.

Create a Strapi Content API token with only the read operations required for
the five published single types, the Company Registration Page collection, and
their populated content/media. Do not grant the public role content or upload
access, and never send this token to the browser.

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
# This file is included from Nginx's http context.
limit_req_zone $binary_remote_addr zone=jr_lead_submissions:10m rate=10r/m;

server {
    listen 80;
    server_name example.com;
    return 301 http://www.example.com$request_uri;
}

server {
    listen 80;
    server_name www.example.com;

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
The `/api/leads` edge limit is required in production. Its application-level
Map is intentionally bounded for the current one-process VPS deployment, resets
on restart, and must be replaced with shared storage before adding frontend
instances. Keep Next.js bound to loopback so Nginx-controlled `X-Real-IP`
remains trustworthy; configure real-IP handling explicitly if another proxy or
CDN is introduced.

## Deploy order

### 1. Prepare staging first

1. Provision a staging PostgreSQL database and durable media bucket/provider.
2. Deploy the CMS from `cms/` with all `SEED_*` flags set to `false`.
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

The full local seed and narrow local backfills are for local SQLite only. All
`SEED_*` flags must stay off in production.

For the current seeded/local content, first rehearse an encrypted Strapi export
and import on staging. Take a PostgreSQL snapshot and media backup before every
import. The CLI prompts for an export encryption key unless one is supplied:

```bash
# In the populated source CMS environment
npm run strapi -- export --file /secure-backups/jr-cms-YYYY-MM-DD

# In the empty target CMS environment, after a verified backup
npm run strapi -- import --file /secure-backups/jr-cms-YYYY-MM-DD
```

To populate an empty test CMS with this repository's included starter content,
run `SEED_DEMO_CONTENT=true` only in a fresh disposable **local SQLite** source,
then export that source and import the archive into the empty test target. See
the detailed procedure in
[`initial_deployement_setup_steps.md`](./initial_deployement_setup_steps.md).
Never enable any `SEED_*` flag in a deployed PostgreSQL environment.

Do not add `--force` unless the target, backup, and recovery plan have been
verified. Confirm all five single types and the nineteen Company Registration
records are **Published**, media records point to durable storage, and the
frontend token can read only published data.

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
enable HSTS once the canonical HTTPS domain is confirmed, keep `/api/revalidate`
private, rate-limit `/api/leads`, and add a tested Content-Security-Policy that permits the
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

Not every change needs a server deployment. Choose the smallest correct path:

| Change | How it becomes live |
| --- | --- |
| CMS copy, links, sort order, SEO, or media | Save and **Publish** it in Strapi. No code build/restart is needed. The signed webhook invalidates the affected frontend cache; normal ISR refreshes within 60 seconds if the webhook is unavailable. |
| Frontend code or static `frontend/public/` assets only | Build a new frontend release and reload only `jr-compliance-frontend`. |
| CMS code, schema, or plugin configuration | Back up database/media first, build a new CMS release, and reload `jr-compliance-cms`. Also rebuild/reload the frontend when its types, mapper, fallback, or CMS contract changed. |
| Environment, port, Nginx, TLS, or database settings | Treat as infrastructure work: update the protected environment before building, coordinate related configuration, validate Nginx before reload, and restart only the affected process. |

### CMS content or media change

An editor should save the record, then click **Publish**. A draft alone does
not update the public site. Do not manually call the public revalidation route:
Nginx deliberately denies it. On the same VPS, Strapi calls it privately over
`NEXT_REVALIDATE_URL` with the shared HMAC secret.

Confirm the live result in the browser, or check the CMS log for a revalidation
warning. A webhook failure does not block publishing; the frontend falls back
to its normal 60-second cache refresh. For uploaded media, also verify that the
file survives a CMS restart and is included in the media backup.

### Safe code or configuration release

Build every reviewed release in a **new** checkout or release directory. Do
not run `npm ci` over the `node_modules` of a process currently serving
traffic, and do not overwrite an existing secret file with an unreviewed copy.
Keep the previous release until post-deploy smoke checks pass.

Before changing a release, inspect rather than overwrite its state:

```bash
git status --short
git fetch origin
git log --oneline HEAD..origin/main
```

Use the repository's actual branch name in place of `main` if it differs. If
`git status --short` reports changes, review them before proceeding; do not use
`git reset --hard` to make deployment easier.

Create a new release from the reviewed commit, install its protected
environment files **before** its builds, and ensure they retain mode `0600`.
Build only the applications affected by the change:

```bash
# A frontend-only code or static-asset change.
cd /srv/jr-compliance-releases/<new-release>/frontend
npm ci
npm run typecheck
npm run build

# A CMS code/schema change. Take a verified database/media backup first.
cd ../cms
npm ci
npm run build
```

The current local upload provider stores media under
`cms/public/uploads/`, which a fresh checkout does not contain. Before
activating a CMS release, connect that path to the persistent, backed upload
storage (for example, with the host's bind mount or a carefully verified
symlink), or restore the media there and verify ownership. Do not switch to a
fresh release with an empty upload directory and assume existing CMS media will
still work.

After the build succeeds, activate the new release according to the host's
release mechanism. If it uses a stable `current` symlink, switch that symlink
only after both the build and protected environment files are ready. Then
reload only the process that changed:

```bash
# Run through the active release's ecosystem file.
pm2 startOrReload /srv/jr-compliance-releases/current/ecosystem.config.js \
  --only jr-compliance-frontend --env production --update-env

# Use this instead for a CMS-only release.
pm2 startOrReload /srv/jr-compliance-releases/current/ecosystem.config.js \
  --only jr-compliance-cms --env production --update-env

pm2 status
pm2 save
```

When the CMS schema and frontend CMS contract changed together, build both and
reload the CMS first, then the frontend. A rollback must restore compatible
application versions together in that case.

For a protected-environment-only change that does not alter the release path,
restart the named process with refreshed variables after checking the edited
file:

```bash
pm2 restart jr-compliance-frontend --update-env
# or
pm2 restart jr-compliance-cms --update-env
```

`STRAPI_URL`, `STRAPI_API_TOKEN`, `STRAPI_REVALIDATE_SECRET`, `SITE_URL`, and
`LEAD_WEBHOOK_BASE_URL`
must be present before rebuilding the frontend. For a CMS port change, update
the PM2 port, Nginx upstream, and `NEXT_REVALIDATE_URL` together. For an Nginx
change, run `sudo nginx -t` and reload Nginx only when that validation succeeds.
Do not delete the previous release until the launch-validation checks pass.

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
5. Submit one approved staging consultation and verify exact lead-type routing,
   required-message/consent errors, successful `/thank-you` redirect, and no PII
   in application logs. Confirm the sixth rapid request is rejected and Nginx
   returns `429` under the configured edge limit; do not run this against live
   lead intake without coordinating the test record.
6. With the frontend token, verify all five published CMS endpoints return
   expected content. Confirm the anonymous CMS request is denied.
7. Change a harmless CMS field, save a draft, publish it, and verify the
   matching page updates through the signed webhook (or within 60 seconds if
   the webhook is intentionally unavailable).
8. Check the CMS admin, media upload, database backup job, and object-storage
   restore procedure.
9. Re-run `npm audit --omit=dev` for both applications. Do not launch while
   the CMS high-severity findings remain unresolved or formally risk-accepted.

## Rollback

Keep the previous frontend and CMS build identifiers, a tested PostgreSQL
snapshot, and a versioned media backup. On a bad release, roll back the
frontend and CMS together when their content schemas changed; restore the
database/media only through the documented, rehearsed recovery procedure.
After rollback, publish or wait for the frontend cache interval so cached
content matches the restored CMS state.
