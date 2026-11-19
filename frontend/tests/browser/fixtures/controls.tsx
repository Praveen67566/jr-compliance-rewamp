import { useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import { PrivacyProvider, PrivacyPreferencesButton, useOptionalIntegration } from "../../../components/privacy/privacy-provider";
import { ConsentVideo } from "../../../components/privacy/consent-video";
import { AccessibilityToolbar } from "../../../components/accessibility/accessibility-toolbar";

function TestAnalytics() {
  const [starts, setStarts] = useState(0);
  const [stops, setStops] = useState(0);
  const start = useCallback(() => {
    setStarts((count) => count + 1);
    const script = document.createElement("script");
    script.src = "/__test-analytics.js";
    document.head.append(script);
    const timer = window.setInterval(() => window.dispatchEvent(new Event("test-analytics-tick")), 25);
    return () => { window.clearInterval(timer); script.remove(); setStops((count) => count + 1); };
  }, []);
  useOptionalIntegration("test-analytics", "analytics", start);
  return <p>Analytics starts: <span data-testid="starts">{starts}</span>; stops: <span data-testid="stops">{stops}</span></p>;
}
function Fixture() {
  return <PrivacyProvider>
    <main id="main-content"><h1>Preference controls test</h1>
      <TestAnalytics />
      <div className="relative aspect-video max-w-xl"><ConsentVideo src="https://www.youtube-nocookie.com/embed/abcdefghijk" title="Test service video" /></div>
    </main>
    <footer><PrivacyPreferencesButton /></footer>
    <AccessibilityToolbar />
  </PrivacyProvider>;
}
createRoot(document.getElementById("root")!).render(<Fixture />);
