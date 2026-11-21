import type { OptionalCategory, PrivacyRegion } from "@/lib/types";

export const privacyCopy = {
  title: "Your privacy choices",
  description: "Optional analytics, external media and marketing stay off until you allow them. You can change or withdraw permission at any time. Essential navigation and inquiry forms work without optional tracking.",
  regions: {
    unknown: "We use opt-in privacy controls because your region is unavailable.",
    "eea-uk": "Optional features require your permission. You can withdraw it at any time.",
    india: "Choose each optional purpose below. You can withdraw your permission at any time.",
    us: "You can opt out of sale or sharing for marketing. We also respect Global Privacy Control.",
    other: "Optional features require your permission. You can change your choices at any time.",
  } satisfies Record<PrivacyRegion, string>,
  categories: {
    preferences: { title: "Optional preferences", description: "Remember optional choices to personalise your visits." },
    analytics: { title: "Analytics", description: "Help us understand how visitors use the website. Optional measurement and heatmaps require this permission and a supported consent integration." },
    marketing: { title: "External media and marketing", description: "Allow YouTube videos and optional marketing features. These providers may use browser storage and process viewing activity." },
  } satisfies Record<OptionalCategory, { title: string; description: string }>,
};
