import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import { Splash } from "@/components/Splash";
import { AosInit } from "@/components/AosInit";
import { themeInitScript } from "@/components/ThemeToggle";
import { SITE_URL } from "@/lib/site";

// Geist: a neutral, tightly-drawn grotesk. Grown-up and product-like, not playful.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const description =
  "Fitness challenges with real stakes. Start a lobby with friends, pick a daily challenge and agree on the stakes. Miss your reps and you're out. The loser pays up, and the camera counts every rep.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lobit: fitness challenges with friends. Loser pays up.",
    template: "%s · Lobit",
  },
  description,
  applicationName: "Lobit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Lobit",
    url: "/",
    title: "Miss your reps. Pay the price.",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miss your reps. Pay the price.",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#110f18" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-aos]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Splash />
        <AosInit />
        {children}
      </body>
    </html>
  );
}
