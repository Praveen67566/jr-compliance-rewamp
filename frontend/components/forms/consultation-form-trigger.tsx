import type { LinkTarget } from "@/lib/types";

type ConsultationFormTriggerProps = {
  label: string;
  className?: string;
  formId?: string;
  target?: LinkTarget;
};

/** Reusable no-JavaScript trigger for pages that only need to link to the shared form. */
export function ConsultationFormTrigger({
  label,
  className,
  formId = "expert-consultation",
  target = "_self",
}: ConsultationFormTriggerProps) {
  return (
    <a className={className} href={`#${formId}`} target={target}>
      {label}
    </a>
  );
}
