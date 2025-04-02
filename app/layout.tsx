import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "./theme-script"; // 👈 adjust path if needed
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Nes Portfolio",
  description: "Nestor Garcia Portfolio web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <ThemeScript />
        <Analytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
