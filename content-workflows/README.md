# Content workflows

Reusable instructions for importing approved spreadsheet content into the
existing JR Compliance Strapi pages. Refer to the relevant guide when asking
for a future content task; it records the agreed mapping and common sections.

| Task | Guide |
| --- | --- |
| Create missing Approval service pages from an Excel workbook | [Approval Excel import](approval-excel-import.md) |
| Run or verify the existing Corporate import | [Corporate importer documentation](../cms/README.md#approved-corporate-workbook-import) |
| Reuse the existing HTML formatting and fixed-section values | [Corporate importer helpers](../cms/scripts/import-corporate-services.cjs) |

For a future Approval import, use this request:

```text
Follow content-workflows/approval-excel-import.md for this workbook:
<absolute path to the Excel file>

Use the local CMS. Create and publish only missing Approval detail pages,
with the documented HTML formatting and fixed sections, and map their links
under Site Setting → Header Menu → Approval. Preserve existing pages.
Implement the Approval import command first if it does not exist, then back
up, import, and verify the result as described in the guide.
```

Adding these documents does not import a workbook or modify CMS records.
New workflow guides can be added to this folder and linked in this table.
