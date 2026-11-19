"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { containDialogFocus } from "@/lib/dialog-focus";
import { PreferenceIcon } from "./preference-icons";

export function PreferenceDialog({ title, description, icon = "accessibility", onClose, children }: {
  title: string; description?: string; icon?: "accessibility" | "shield"; onClose: () => void; children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();
  useEffect(() => {
    const modal = dialog.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>("[data-privacy-trigger]")?.focus();
    };
  }, []);
  return (
    <dialog ref={dialog} aria-labelledby={heading} className="preference-dialog m-auto max-h-[calc(100dvh-1.5rem)] w-[min(34rem,calc(100%-1.5rem))] max-w-none overflow-y-auto rounded-[24px] border border-sky/35 bg-navy-950 p-0 font-sans text-cloud shadow-[0_32px_100px_rgba(0,8,34,0.65)] backdrop:bg-navy-950/75 backdrop:backdrop-blur-sm"
      onKeyDown={containDialogFocus} onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="preference-dialog-header relative isolate overflow-hidden border-b border-sky/20 p-[20px] sm:p-[24px]">
        <div className="relative flex items-start gap-[12px]">
          <span className="grid size-12 shrink-0 place-items-center max-[560px]:hidden rounded-2xl border border-sky/35 bg-sky/10 text-sky"><PreferenceIcon name={icon} className="size-7" /></span>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-sky">Browsing preferences</p>
            <h2 className="m-0 font-sans text-xl font-bold leading-tight [overflow-wrap:anywhere]" id={heading}>{title}</h2>
          </div>
          <button className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-sky/30 bg-navy-950/30 text-ice transition hover:border-sky hover:bg-sky/10" type="button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`}><PreferenceIcon name="close" /></button>
        </div>
        {description ? <p className="relative mb-0 mt-4 text-sm leading-relaxed text-ice/85">{description}</p> : null}
      </header>
      <div className="min-w-0 p-[20px] sm:p-[24px]">{children}</div>
    </dialog>
  );
}
