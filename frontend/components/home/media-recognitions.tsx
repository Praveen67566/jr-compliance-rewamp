import type { CSSProperties } from "react";

import { KeychainRevealSection } from "@/components/home/keychain-reveal-section";
import { linkTargetProps } from "@/lib/link-props";
import type { HomepageContent, Recognition } from "@/lib/types";

function RecognitionCards({
  items,
  isSlider,
  isClone = false,
}: {
  items: Recognition[];
  isSlider: boolean;
  isClone?: boolean;
}) {
  return items.map((recognition, index) => (
    <a
      className="recognition-card"
      href={recognition.href}
      key={`${recognition.title}-${index}`}
      tabIndex={isClone ? -1 : undefined}
      {...linkTargetProps(recognition)}
    >
      {!isSlider ? <span className="keychain-card-anchor" aria-hidden="true" /> : null}
      {recognition.coverImage ? <img className="recognition-cover" src={recognition.coverImage} alt="" /> : null}
      <span className="recognition-index">{String(index + 1).padStart(2, "0")}</span>
      {recognition.category ? <span className="recognition-category">{recognition.category}</span> : null}
      {recognition.sourceName || recognition.sourceLogo ? (
        <span className="recognition-source">
          {recognition.sourceLogo ? <img src={recognition.sourceLogo} alt={recognition.sourceName ?? ""} /> : null}
          {recognition.sourceName ? <span>{recognition.sourceName}</span> : null}
        </span>
      ) : null}
      <h3>{recognition.title}</h3>
      <p>{recognition.summary}</p>
      <span className="recognition-link">{recognition.linkLabel ?? "Read more"} <b aria-hidden="true">↗</b></span>
    </a>
  ));
}

export function MediaRecognitions({ content }: { content: HomepageContent["recognitions"] }) {
  const isSlider = content.items.length > 3;
  const body = (
    <div className="site-container mx-auto w-full max-w-[1320px] px-8 max-[820px]:px-[22px] max-[560px]:px-[18px]">
      <div className="recognition-heading">
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="recognitions-heading">{content.title}</h2>
        </div>
        <p>{content.description}</p>
      </div>
      {isSlider ? (
        <div className="group/recognitions mt-[39px] overflow-hidden py-2 focus-within:overflow-x-auto motion-reduce:overflow-x-auto max-[560px]:mt-6 [scrollbar-color:var(--blue-cobalt-600)_var(--blue-navy-950)] [scrollbar-width:thin]">
          <div
            className="flex w-max motion-safe:animate-[recognition-slide_var(--recognition-duration)_linear_infinite] group-hover/recognitions:[animation-play-state:paused] group-focus-within/recognitions:animate-none motion-reduce:animate-none"
            style={{ "--recognition-duration": `${content.items.length * 6}s` } as CSSProperties}
          >
            <div className="grid auto-cols-[min(78vw,360px)] grid-flow-col gap-4 pr-4 min-[821px]:auto-cols-[min(30vw,400px)]">
              <RecognitionCards items={content.items} isSlider />
            </div>
            <div
              aria-hidden="true"
              className="grid auto-cols-[min(78vw,360px)] grid-flow-col gap-4 pr-4 min-[821px]:auto-cols-[min(30vw,400px)] group-focus-within/recognitions:hidden motion-reduce:hidden"
            >
              <RecognitionCards items={content.items} isSlider isClone />
            </div>
          </div>
        </div>
      ) : (
        <div className="recognition-grid">
          <RecognitionCards items={content.items} isSlider={false} />
        </div>
      )}
    </div>
  );

  return isSlider ? (
    <section className="recognitions-section section relative overflow-hidden" aria-labelledby="recognitions-heading">
      {body}
    </section>
  ) : (
    <KeychainRevealSection
      className="recognitions-section section"
      itemCount={content.items.length}
      labelledBy="recognitions-heading"
    >
      {body}
    </KeychainRevealSection>
  );
}
