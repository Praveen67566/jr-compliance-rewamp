/** Combine OS motion settings with the visitor's toolbar setting, including live changes. */
export function motionPreference(query: string) {
  const media = window.matchMedia(query);
  return {
    get matches() {
      const reduced = document.documentElement.dataset.reduceMotion === "true";
      return query.includes("no-preference") ? media.matches && !reduced : media.matches || reduced;
    },
    addEventListener(_type: "change", listener: () => void) {
      media.addEventListener("change", listener);
      window.addEventListener("jr-accessibility-change", listener);
    },
    removeEventListener(_type: "change", listener: () => void) {
      media.removeEventListener("change", listener);
      window.removeEventListener("jr-accessibility-change", listener);
    },
  };
}
