import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../components/site-header.css";
import "../components/home/home.css";
import "../components/site-footer.css";
import "../components/editorial/editorial.css";
import "./animations.css";
import "./responsive.css";

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
      <body>{children}</body>
    </html>
  );
}
