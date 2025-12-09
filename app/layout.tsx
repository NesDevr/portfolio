import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeScript } from "./theme-script";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <ThemeScript />
        <Analytics />
      </head>
      <body>{children}</body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZY9R0VSX55"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZY9R0VSX55');
        `}
      </Script>
    </html>
  );
}
