import type { ReactNode } from "react";

type PreferenceIconName = "accessibility" | "shield" | "contrast" | "motion" | "reset" | "close" | "check" | "lock" | "pause" | "play";

export function PreferenceIcon({ name, className = "size-5" }: { name: PreferenceIconName; className?: string }) {
  const paths: Record<PreferenceIconName, ReactNode> = {
    accessibility: <><circle cx="12" cy="4.5" r="1.8" /><path d="m4.5 8 7.5 2 7.5-2M12 10v5m0 0-4 6m4-6 4 6" /></>,
    shield: <><path d="m12 3 8 3.5V12c0 5-8 9-8 9s-8-4-8-9V6.5L12 3Z" /><path d="m8.5 12 2.4 2.4 4.6-5" /></>,
    contrast: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" /></>,
    motion: <><path d="M3 7h6m-7 5h5m-4 5h6" /><circle cx="15" cy="12" r="6" /><path d="M15 8.5V12l2.5 1.5" /></>,
    reset: <><path d="M4 10a8 8 0 1 1 1.8 7.5M4 4v6h6" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></>,
    pause: <path d="M8 5v14M16 5v14" />,
    play: <path d="m8 5 11 7-11 7V5Z" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
