import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Background } from "@/components/layout/Background";
import { Cursor } from "@/components/layout/Cursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";

export const metadata: Metadata = {
  title: "Atul Kumar Tiwari — Software Development Engineer",
  description:
    "Atul Kumar Tiwari — Software Development Engineer building real-time, distributed and cloud-native systems. Full-stack engineer (React, Next.js, Node, Redis) shipping low-latency platforms.",
  authors: [{ name: "Atul Kumar Tiwari" }],
  keywords: [
    "Atul Kumar Tiwari",
    "Software Development Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Distributed Systems",
  ],
  openGraph: {
    title: "Atul Kumar Tiwari — Software Development Engineer",
    description:
      "Full-stack engineer building real-time, distributed & cloud-native systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Applied before hydration to prevent a theme flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <Background />
          <Cursor />
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
