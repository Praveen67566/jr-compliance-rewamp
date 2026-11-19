import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AccessibilityToolbar } from "@/components/accessibility/accessibility-toolbar";
import { PrivacyProvider } from "@/components/privacy/privacy-provider";
import "./globals.css";
import "../components/site-header.css";
import "../components/sticky-cta-bar.css";
import "../components/home/home.css";
import "../components/site-footer.css";
import "../components/editorial/editorial.css";
import "./animations.css";
import "./responsive.css";
import "../components/accessibility/accessibility.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JR Compliance | Global Compliance Consultants",
  description:
    "Global compliance, certification, and corporate services from JR Compliance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={inter.variable} lang="en">
      <body>
        <PrivacyProvider>
          <a className="skip-link" href="#main-content">Skip to main content</a>
          {children}
          <AccessibilityToolbar />
        </PrivacyProvider>
      </body>
    </html>
  );
}
