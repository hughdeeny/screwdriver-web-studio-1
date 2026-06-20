import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Screwdriver Marketing | Websites for tradies and local service businesses — Adelaide",
  description:
    "Adelaide marketing for tradies and local service businesses: we help find customers and track what works so you can focus on getting the job done — websites, SEO pages, Google Business Profile, lead tracking, AI tools, and care plans.",
  keywords: [
    "Adelaide marketing",
    "websites for tradies",
    "local service business website",
    "lead generation website",
    "SEO landing pages",
    "Google Business Profile support",
    "AI tools for small businesses",
    "Screwdriver Marketing",
  ],
  openGraph: {
    title: "Screwdriver Marketing — More customers, less headaches",
    description:
      "We help local service businesses get found and win enquiries — so you can spend less time on marketing guesswork and more time getting the job done.",
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#070605",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="noise min-h-full font-sans">{children}</body>
    </html>
  );
}
