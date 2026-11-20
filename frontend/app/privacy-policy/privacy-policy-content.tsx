import { SitePageShell } from "@/components/site-page-shell";
import type { LegalPageContent } from "@/lib/types";

import styles from "./privacy-policy.module.css";
import { renderPrivacyPolicyRichText } from "./rich-text";

export function PrivacyPolicyContent({ content }: { content: LegalPageContent }) {
  const usedAnchors = new Set<string>();
  const sections = content.sections.map((section, index) => {
    const base = section.title.normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `section-${index + 1}`;
    let anchor = base;
    let suffix = 2;
    while (usedAnchors.has(anchor)) anchor = `${base}-${suffix++}`;
    usedAnchors.add(anchor);
    return { ...section, anchor };
  });
  const updatedAt = content.updatedAt ? new Date(content.updatedAt) : null;
  const updatedDate = updatedAt && Number.isFinite(updatedAt.getTime())
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
      }).format(updatedAt)
    : null;
  const sectionLinks = (
    <ul role="list" className={styles.sectionLinks}>
      {sections.map((section) => (
        <li key={section.anchor}>
          <a href={`#${section.anchor}`}>{section.title}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <SitePageShell footer={content.footer} navigation={content.navigation} seo={content.seo} site={content.site}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.title}</span>
          </nav>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1 id="legal-page-title" className={styles.title}>{content.title}</h1>
          {updatedDate ? (
            <p className={styles.updated}>Last updated <time dateTime={content.updatedAt}>{updatedDate}</time></p>
          ) : null}
        </div>
      </header>

      <section aria-labelledby="legal-page-title" className={styles.body}>
        <div className={`${styles.container} ${styles.layout}`}>
          <aside className={styles.sidebar}>
            <nav aria-label={`${content.title} sections`}>
              <p className={styles.navigationTitle}>On this page</p>
              {sectionLinks}
            </nav>
          </aside>
          <details className={styles.mobileNavigation}>
            <summary>
              On this page
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <nav aria-label={`${content.title} sections`}>{sectionLinks}</nav>
          </details>

          <article aria-label={content.title} className={styles.article}>
            {content.introduction.length ? (
              <div className={`${styles.richText} ${styles.introduction}`} dangerouslySetInnerHTML={{
                __html: renderPrivacyPolicyRichText(content.introduction),
              }} />
            ) : null}
            {sections.map((section) => (
              <section className={styles.policySection} id={section.anchor} key={section.anchor}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div className={styles.richText} dangerouslySetInnerHTML={{
                  __html: renderPrivacyPolicyRichText(section.body),
                }} />
              </section>
            ))}
          </article>
        </div>
      </section>
    </SitePageShell>
  );
}
