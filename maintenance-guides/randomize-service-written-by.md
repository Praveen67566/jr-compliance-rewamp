# Randomize Corporate and Approval Written By authors

Prepared on **13 November 2026**. This is a self-contained Markdown runbook:
the commands below execute its embedded JavaScript. **Creating this file does
not change CMS content.** No separate script or application changes are needed.

Preparation checks passed against the local CMS in a read-only transaction:
**168 services, 336 draft/published versions, and all 20 portraits**, with 8–9
services assigned per author. Both supplied text files match the embedded
profiles verbatim. Runner syntax, all 19 collection mappings, and the protected
data fingerprint queries across 256 tables were checked. Eleven in-memory
scenarios covered apply, unchanged reruns, preflight failures, and rollback.
**Applied successfully to the local CMS on 13 November 2026.** Counts are this
dated local snapshot; each execution discovers the current inventory.

## Execution record

Applied on **13 November 2026 at 15:09 IST** to
`127.0.0.1:5432/jr_compliance_cms_local`, schema `public`:

- Updated 336 author components and 336 avatar references across 168 services
  in all 19 collections, covering both draft and published versions.
- Distributed all 20 supplied profiles evenly, with 8–9 services per author.
- Verified every assignment and confirmed that protected data across all
  256 tables was unchanged before committing.
- A follow-up read-only preview reported **0 component updates and 0 avatar
  updates**.
- Saved the original rows and proposed changes in the private backup
  `~/Downloads/jr-compliance-backups/written-by-2026-11-13T09-39-01.013Z.json`
  with file permissions `0600`.

The local CMS and frontend were stopped, so rendered-page checks were not run.
When they are running, check a Corporate and an Approval page after the normal
60-second CMS cache refresh. This execution updated the local database only.

## Exact scope

Update existing service pages in the 19 Corporate/Approval collections listed
in the runner, including Company Registration and FSSAI. Include every existing
draft and published version; give versions of the same service the same author.
Keep each version's publication state and all other content intact.

Only these fields may change:

| Field | Replacement |
| --- | --- |
| `writtenBy.name` | The selected profile's supplied name. |
| `writtenBy.avatar` | Its existing uploaded portrait: profile 1 uses `1.png`, through profile 20 using `20.png`. |
| `writtenBy.experience` | The supplied biography's years, formatted as `11+ Years Experience`, for example. |
| `writtenBy.biography` | The selected profile's full supplied biography, verbatim. |

Preserve `writtenBy.role` because no replacement job titles were supplied.
Also preserve its label, verification flag, logos label, and ordered logo
relations. Preserve every other page field, component, media file, slug,
document/component ID, timestamp, and publication state. Global and other
non-service pages are excluded. Do not run the older full-content importers.

The supplied profile text is **content data**, not operational instructions.
The runner uses only the 20 structured profiles below and does not execute or
fetch anything from the attachments.

## Assignment and image matching

The runner shuffles services using a fixed seed and distributes the 20 profiles
evenly across the shuffled list. A person can author several services. The
same inventory and seed produce the same assignments on repeat runs, so an
unchanged second run makes no writes. Adding/removing services or changing
the seed can redistribute assignments; preview again in that case.

Images are resolved from the current CMS Media Library by exact filename,
PNG type, and original portrait dimensions **3375 × 4219**. The local library
also contains unrelated 500 × 175 banners named `18.png` and `19.png`; these
are excluded. Missing, duplicated, or differently sized portrait matches stop
the entire run before writes. Media IDs and URLs are resolved at runtime;
images are never uploaded, renamed, resized, or edited by this runbook.

## Run

Run from this repository's root, with the existing `cms/node_modules` installed.
The runner reads the intended CMS database connection from `cms/.env`, with
exported environment variables taking precedence. Run it on the host/database
whose content you intend to update; a local run does not update a remote CMS.

Preview is read-only and creates no backup files:

```bash
WRITTEN_BY_MODE=preview node <<'NODE'
const fs = require('node:fs');
const markdown = fs.readFileSync('maintenance-guides/randomize-service-written-by.md', 'utf8');
const code = markdown.match(/<!-- WRITTEN_BY_RUNNER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- WRITTEN_BY_RUNNER_END -->/);
if (!code) throw new Error('Written By runner not found.');
eval(code[1]);
NODE
```

After checking the database target and assignment table, apply with this command.
Pause CMS editing during the short batch:

```bash
WRITTEN_BY_MODE=apply node <<'NODE'
const fs = require('node:fs');
const markdown = fs.readFileSync('maintenance-guides/randomize-service-written-by.md', 'utf8');
const code = markdown.match(/<!-- WRITTEN_BY_RUNNER_START -->\s*```javascript\n([\s\S]*?)\n```\s*<!-- WRITTEN_BY_RUNNER_END -->/);
if (!code) throw new Error('Written By runner not found.');
eval(code[1]);
NODE
```

Apply saves the old author rows, avatar references, and proposed changes to a
private JSON backup under `~/Downloads/jr-compliance-backups/` before writing.
It updates existing component rows and avatar references directly in one
PostgreSQL transaction. It does not start Strapi or publish whole documents;
this avoids changing timestamps, running bootstrap migrations, or publishing
other draft content. Missing author components/avatars and shared component
instances stop the batch instead of creating or replacing them.

Before committing, it verifies every assignment and compares hashes of all
table data in the configured schema, excluding only the four permitted field
changes on the exact target rows. Any unexpected change rolls back the batch.
The backup is retained if an apply fails. This runner targets the PostgreSQL
schema used by this checkout and stops if its required tables are absent.

Run preview again after applying: it should report **0 component updates and
0 avatar updates**. Direct SQL bypasses publish webhooks. The existing frontend
CMS cache revalidates after 60 seconds on subsequent requests; allow that
refresh and check both a Corporate and an Approval page. No cache, frontend,
deployment, schema, or seed changes are part of this operation.

## Supplied profiles

Profile numbers are the image numbers. Years are extracted from these exact
biographies; names, biographies, and image pairings are never shuffled separately.

<!-- WRITTEN_BY_PROFILES_START -->
```json
[
  {
    "number": 1,
    "name": "Raghav Sharma",
    "biography": "Raghav Sharma has 11+ years of experience in writing and reviewing business, legal, and compliance-related content. He specializes in simplifying complex regulatory requirements, registration procedures, and documentation processes into clear and informative content."
  },
  {
    "number": 2,
    "name": "Amit Verma",
    "biography": "Amit Verma has 8+ years of experience in business content writing, focusing on company registration, regulatory compliance, and professional services. He is dedicated to creating accurate, user-friendly content that helps businesses understand various service requirements."
  },
  {
    "number": 3,
    "name": "Arjun Mehta",
    "biography": "Arjun Mehta has 8+ years of experience in professional content development, covering business services, legal documentation, and regulatory procedures. His expertise lies in presenting complex information in a simple, structured, and accessible manner."
  },
  {
    "number": 4,
    "name": "Rahul Gupta",
    "biography": "Rahul Gupta has 12+ years of experience in writing business and compliance-related content. He focuses on delivering informative and reliable content that helps entrepreneurs and organizations understand registration, licensing, and regulatory processes."
  },
  {
    "number": 5,
    "name": "Vikram Singh",
    "biography": "Vikram Singh has 9+ years of experience in content writing and editorial development for business and professional services. He specializes in creating well-researched content that simplifies legal formalities, compliance requirements, and business procedures."
  },
  {
    "number": 6,
    "name": "Aditya Kapoor",
    "biography": "Aditya Kapoor has 6+ years of experience in developing content related to business operations, regulatory services, and professional compliance. He focuses on making complex service information easy to understand through clear and structured writing."
  },
  {
    "number": 7,
    "name": "Karan Malhotra",
    "biography": "Karan Malhotra has 9+ years of experience in professional writing, specializing in business documentation, registration services, and regulatory information. His work focuses on providing clear, informative, and practical content for businesses and professionals."
  },
  {
    "number": 8,
    "name": "Saurabh Mishra",
    "biography": "Saurabh Mishra has 11+ years of experience in business and compliance content development. He is experienced in creating informative service-related content that explains regulatory procedures, documentation requirements, and important business formalities."
  },
  {
    "number": 9,
    "name": "Nikhil Agarwal",
    "biography": "Nikhil Agarwal has 10+ years of experience in writing and reviewing professional business content. He specializes in simplifying technical and regulatory information to help businesses make informed decisions regarding their service requirements."
  },
  {
    "number": 10,
    "name": "Deepak Yadav",
    "biography": "Deepak Yadav has 9+ years of experience in content development for business, legal, and regulatory services. He focuses on producing well-organized and easy-to-understand content that explains service procedures and compliance requirements."
  },
  {
    "number": 11,
    "name": "Manish Tiwari",
    "biography": "Manish Tiwari has 8+ years of experience in professional content writing and editorial management. His expertise includes creating informative content that helps businesses understand various registration, licensing, documentation, and compliance procedures."
  },
  {
    "number": 12,
    "name": "Rohit Choudhary",
    "biography": "Rohit Choudhary has 5+ years of experience in business content writing, with a focus on regulatory information and professional services. He is committed to presenting complex business requirements in a clear, concise, and reader-friendly format."
  },
  {
    "number": 13,
    "name": "Abhishek Jain",
    "biography": "Abhishek Jain has 8+ years of experience in developing business-focused and compliance-related content. He specializes in researching service requirements and transforming detailed information into practical and easy-to-follow content."
  },
  {
    "number": 14,
    "name": "Mohit Bansal",
    "biography": "Mohit Bansal has 9+ years of experience in professional writing for business and corporate services. He focuses on creating clear and informative content that guides readers through registration procedures, documentation, and regulatory formalities."
  },
  {
    "number": 15,
    "name": "Varun Saxena",
    "biography": "Varun Saxena has 6+ years of experience in content writing and research for professional service industries. He specializes in simplifying complex information and creating structured content that supports readers in understanding service-related requirements."
  },
  {
    "number": 16,
    "name": "Sanjay Kumar",
    "biography": "Sanjay Kumar has 11+ years of experience in business content development and professional documentation. He focuses on writing accurate, informative, and accessible content covering various business services and regulatory processes."
  },
  {
    "number": 17,
    "name": "Pranav Joshi",
    "biography": "Pranav Joshi has 12+ years of experience in content strategy, research, and professional writing. His work focuses on explaining business procedures, compliance requirements, and service-related information in a clear and engaging manner."
  },
  {
    "number": 18,
    "name": "Ankit Srivastava",
    "biography": "Ankit Srivastava has 10+ years of experience in creating and reviewing business, legal, and compliance-related content. He specializes in developing reader-friendly content that simplifies professional services and regulatory formalities."
  },
  {
    "number": 19,
    "name": "Gaurav Khanna",
    "biography": "Gaurav Khanna has 9+ years of experience in professional content writing and editorial review. He focuses on delivering well-researched and structured content that helps businesses understand important service procedures and compliance requirements."
  },
  {
    "number": 20,
    "name": "Harsh Vardhan",
    "biography": "Harsh Vardhan has 8+ years of experience in business and professional content development. He specializes in simplifying complex information into clear, informative, and easy-to-understand content for businesses, entrepreneurs, and professionals."
  }
]
```
<!-- WRITTEN_BY_PROFILES_END -->

## Embedded runner

<!-- WRITTEN_BY_RUNNER_START -->
```javascript
(async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const os = require('node:os');
  const assert = require('node:assert/strict');
  const { createHash } = require('node:crypto');
  const { createRequire } = require('node:module');
  const root = process.cwd();
  const cms = path.join(root, 'cms');
  const req = createRequire(path.join(cms, 'package.json'));
  const envPath = path.join(cms, '.env');
  const env = { ...(fs.existsSync(envPath) ? req('dotenv').parse(fs.readFileSync(envPath)) : {}), ...process.env };
  const mode = env.WRITTEN_BY_MODE || 'preview';
  assert.ok(['preview', 'apply'].includes(mode), 'Mode must be preview or apply.');
  assert.ok(env.DATABASE_URL, 'The intended CMS DATABASE_URL is required.');
  assert.equal(env.DATABASE_CLIENT || 'postgres', 'postgres');
  const schema = env.DATABASE_SCHEMA || 'public';
  const identifier = value => '"' + value.replaceAll('"', '""') + '"';
  const table = name => `${identifier(schema)}.${identifier(name)}`;
  const hash = value => createHash('sha256').update(value).digest('hex');
  const source = fs.readFileSync(path.join(root, 'maintenance-guides/randomize-service-written-by.md'), 'utf8');
  const profileBlock = source.match(/<!-- WRITTEN_BY_PROFILES_START -->\s*```json\n([\s\S]*?)\n```\s*<!-- WRITTEN_BY_PROFILES_END -->/);
  assert.ok(profileBlock, 'Profile data is missing.');
  const profiles = JSON.parse(profileBlock[1]);
  assert.equal(profiles.length, 20, 'Exactly 20 profiles are required.');
  assert.equal(new Set(profiles.map(p => p.name)).size, 20);
  profiles.forEach((profile, index) => {
    assert.equal(profile.number, index + 1, 'Keep profile/image numbering intact.');
    assert.ok(profile.biography.startsWith(profile.name + ' has '));
    const years = profile.biography.match(/ has (\d+\+) years of experience/);
    assert.ok(years, `Missing supplied experience: ${profile.name}`);
    profile.experience = `${years[1]} Years Experience`;
    profile.image = `${profile.number}.png`;
  });
  const types = [
    'company-registration-page', 'mca-service-page', 'import-export-service-page',
    'government-license-certification-page', 'ipr-service-page', 'fssai-service-page',
    'sebi-business-registration-page', 'tax-accounting-page', 'labour-compliance-page',
    'fund-raising-page', 'bureau-indian-standards-page', 'pollution-advisory-page',
    'telecommunication-engineering-centre-page', 'wireless-planning-coordination-page',
    'bureau-energy-efficiency-page', 'cdsco-registration-page', 'aerb-approval-page',
    'lmpc-certification-page', 'stqc-page',
  ];
  const collections = types.map(type => {
    const definition = JSON.parse(fs.readFileSync(path.join(cms, 'src/api', type, 'content-types', type, 'schema.json'), 'utf8'));
    assert.equal(definition.attributes.writtenBy.component, 'registration.written-by');
    return { type, name: definition.collectionName };
  });
  const authorTable = 'components_registration_written_by';
  const mediaTable = 'files_related_mph';
  const componentType = 'registration.written-by';
  const seed = 'jr-written-by-20-authors-v1';
  const db = new (req('pg').Client)({
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL === 'true' ? {
      rejectUnauthorized: env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
      ...Object.fromEntries(['KEY', 'CERT', 'CA', 'CAPATH', 'CIPHER'].filter(key => env[`DATABASE_SSL_${key}`]).map(key => [key.toLowerCase(), env[`DATABASE_SSL_${key}`]])),
    } : false,
    connectionTimeoutMillis: 15000,
    statement_timeout: 60000,
  });
  let transaction = false;
  try {
    await db.connect();
    const destination = new URL(env.DATABASE_URL);
    console.log(`Mode: ${mode}; database: ${destination.hostname}:${destination.port || '5432'}${destination.pathname}; schema: ${schema}`);
    const tables = (await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = $1 AND table_type = 'BASE TABLE' ORDER BY table_name", [schema])).rows.map(row => row.table_name);
    const columns = (await db.query('SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = $1', [schema])).rows;
    const ownerTables = tables.filter(name => ['cmp_id', 'component_type'].every(column => columns.some(row => row.table_name === name && row.column_name === column)));
    const required = [authorTable, mediaTable, 'files', ...collections.flatMap(({ name }) => [name, name + '_cmps'])];
    required.forEach(name => assert.ok(tables.includes(name), `Required table missing: ${name}`));
    await db.query(mode === 'preview' ? 'BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY' : 'BEGIN ISOLATION LEVEL REPEATABLE READ');
    transaction = true;
    await db.query("SET LOCAL lock_timeout = '10s'");
    if (mode === 'apply') {
      const locked = [...new Set([...required, ...ownerTables])].sort();
      // SHARE ROW EXCLUSIVE prevents another writer changing these references mid-batch.
      await db.query(`LOCK TABLE ${locked.map(table).join(', ')} IN SHARE ROW EXCLUSIVE MODE`);
    }
    const media = (await db.query(`SELECT id, name, mime, width, height, url FROM ${table('files')} WHERE name = ANY($1::text[])`, [profiles.map(p => p.image)])).rows;
    for (const profile of profiles) {
      const matches = media.filter(file => file.name === profile.image && file.mime === 'image/png' && file.width === 3375 && file.height === 4219 && file.url);
      assert.equal(matches.length, 1, `Expected one 3375 x 4219 portrait named ${profile.image}; found ${matches.length}. No changes made.`);
      profile.avatarId = matches[0].id;
    }
    const authors = new Map((await db.query(`SELECT * FROM ${table(authorTable)}`)).rows.map(row => [row.id, row]));
    const avatars = (await db.query(`SELECT * FROM ${table(mediaTable)} WHERE related_type = $1 AND field = 'avatar'`, [componentType])).rows;
    const ownership = new Map();
    for (const name of ownerTables) {
      const pointers = (await db.query(`SELECT cmp_id FROM ${table(name)} WHERE component_type = $1`, [componentType])).rows;
      pointers.forEach(({ cmp_id }) => ownership.set(cmp_id, (ownership.get(cmp_id) || 0) + 1));
    }
    const services = new Map();
    for (const { type, name } of collections) {
      const pages = (await db.query(`SELECT p.id, p.document_id, p.title, p.slug, p.published_at, c.cmp_id, c.component_type FROM ${table(name)} p LEFT JOIN ${table(name + '_cmps')} c ON c.entity_id = p.id AND c.field = 'writtenBy' ORDER BY p.id`)).rows;
      const seen = new Set();
      for (const page of pages) {
        assert.ok(page.document_id && page.cmp_id, `Missing identity/writtenBy: ${type} row ${page.id}`);
        assert.ok(!seen.has(page.id), `Multiple writtenBy components: ${type} row ${page.id}`);
        seen.add(page.id);
        assert.equal(page.component_type, componentType);
        assert.equal(ownership.get(page.cmp_id), 1, `Shared author component ${page.cmp_id}; stopped.`);
        const before = authors.get(page.cmp_id);
        assert.ok(before, `Author component ${page.cmp_id} is missing.`);
        const links = avatars.filter(link => link.related_id === page.cmp_id);
        assert.equal(links.length, 1, `Expected one existing avatar on component ${page.cmp_id}`);
        const key = `${type}:${page.document_id}`;
        if (!services.has(key)) services.set(key, { key, type, slug: page.slug, versions: [] });
        services.get(key).versions.push({ page, before, avatar: links[0] });
      }
    }
    assert.ok(services.size >= 20, 'Expected at least 20 services to distribute all profiles.');
    const ordered = [...services.values()].sort((a, b) => {
      const left = hash(seed + ':' + a.key), right = hash(seed + ':' + b.key);
      return left < right ? -1 : left > right ? 1 : a.key.localeCompare(b.key);
    });
    const actions = [];
    ordered.forEach((service, index) => {
      const profile = profiles[index % profiles.length];
      service.profile = profile;
      service.versions.forEach(version => actions.push({
        type: service.type, documentId: version.page.document_id, pageId: version.page.id,
        before: version.before, avatar: version.avatar,
        after: { name: profile.name, experience: profile.experience, biography: profile.biography },
        avatarId: profile.avatarId,
      }));
    });
    assert.equal(new Set(actions.map(action => action.before.id)).size, actions.length);
    const componentChanges = actions.filter(action => Object.entries(action.after).some(([key, value]) => action.before[key] !== value));
    const avatarChanges = actions.filter(action => action.avatar.file_id !== action.avatarId);
    console.table(ordered.map(service => ({ collection: service.type, slug: service.slug,
      previous: [...new Set(service.versions.map(v => v.before.name))].join(' / '),
      author: service.profile.name, image: service.profile.image, versions: service.versions.length,
    })));
    console.log(`${services.size} services, ${actions.length} versions, ${componentChanges.length} component updates and ${avatarChanges.length} avatar updates.`);
    console.log('Profile usage:', profiles.map(profile => `${profile.name}: ${ordered.filter(service => service.profile.number === profile.number).length}`).join('; '));
    if (mode === 'preview' || (!componentChanges.length && !avatarChanges.length)) {
      await db.query('ROLLBACK');
      transaction = false;
      console.log(mode === 'preview' ? 'Preview complete. No CMS writes or backup files.' : 'Already matches. No CMS writes or backup files.');
      return;
    }
    const authorIds = new Set(actions.map(action => action.before.id));
    const avatarIds = new Set(actions.map(action => action.avatar.id));
    async function protectedHashes() {
      const result = {};
      for (const name of tables) {
        const rows = (await db.query(`SELECT to_jsonb(r) AS value FROM ${table(name)} r`)).rows.map(({ value }) => {
          if (name === authorTable && authorIds.has(value.id)) {
            delete value.name; delete value.experience; delete value.biography;
          }
          if (name === mediaTable && avatarIds.has(value.id)) delete value.file_id;
          return JSON.stringify(value);
        }).sort();
        result[name] = { count: rows.length, sha256: hash(rows.join('\n')) };
      }
      return result;
    }
    const protectedBefore = await protectedHashes();
    const backupDir = path.join(os.homedir(), 'Downloads/jr-compliance-backups');
    fs.mkdirSync(backupDir, { recursive: true, mode: 0o700 });
    const backup = path.join(backupDir, `written-by-${new Date().toISOString().replaceAll(':', '-')}.json`);
    fs.writeFileSync(backup, JSON.stringify({ mode, seed, schema,
      target: `${destination.hostname}:${destination.port || '5432'}${destination.pathname}`,
      actions, protectedBefore,
    }, null, 2), { mode: 0o600, flag: 'wx' });
    console.log(`Backup: ${backup}`);
    for (const action of componentChanges) {
      const result = await db.query(`UPDATE ${table(authorTable)} SET name = $1, experience = $2, biography = $3 WHERE id = $4`, [action.after.name, action.after.experience, action.after.biography, action.before.id]);
      assert.equal(result.rowCount, 1, 'Author update did not match exactly one row.');
    }
    for (const action of avatarChanges) {
      const result = await db.query(`UPDATE ${table(mediaTable)} SET file_id = $1 WHERE id = $2 AND related_id = $3 AND related_type = $4 AND field = 'avatar'`, [action.avatarId, action.avatar.id, action.before.id, componentType]);
      assert.equal(result.rowCount, 1, 'Avatar update did not match exactly one row.');
    }
    const currentAuthors = new Map((await db.query(`SELECT * FROM ${table(authorTable)}`)).rows.map(row => [row.id, row]));
    const currentAvatars = new Map((await db.query(`SELECT * FROM ${table(mediaTable)} WHERE related_type = $1 AND field = 'avatar'`, [componentType])).rows.map(row => [row.id, row]));
    for (const action of actions) {
      const current = currentAuthors.get(action.before.id);
      assert.ok(current, 'Target author disappeared.');
      for (const [key, value] of Object.entries(action.after)) assert.equal(current[key], value, `Author verification failed: ${action.before.id}.${key}`);
      assert.equal(currentAvatars.get(action.avatar.id)?.file_id, action.avatarId, 'Avatar verification failed.');
    }
    const protectedAfter = await protectedHashes();
    for (const name of tables) assert.deepEqual(protectedAfter[name], protectedBefore[name], `Unexpected change outside permitted writtenBy fields in ${name}; rolling back.`);
    await db.query('COMMIT');
    transaction = false;
    console.log('Committed. Every assignment verified; all other table data unchanged.');
  } catch (error) {
    if (transaction) await db.query('ROLLBACK');
    throw error;
  } finally {
    await db.end();
  }
})().catch(error => {
  console.error('Written By run failed:', error.message);
  process.exitCode = 1;
});
```
<!-- WRITTEN_BY_RUNNER_END -->
