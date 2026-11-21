import type { KeyboardEvent } from "react";

/** Keep a predictable Tab order inside native dialogs, including Safari's limited Tab mode. */
export function containDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex]")]
    .filter((element) => element.tabIndex >= 0 && !element.matches(":disabled") && element.getClientRects().length > 0);
  if (!controls.length) return;
  const index = controls.findIndex((element) => element === document.activeElement);
  const next = event.shiftKey ? (index <= 0 ? controls.length - 1 : index - 1) : (index + 1) % controls.length;
  event.preventDefault();
  controls[next].focus();
}
