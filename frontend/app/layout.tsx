import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JR Compliance | Global Compliance Consultants",
  description:
    "Global compliance, certification, and corporate services from JR Compliance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
