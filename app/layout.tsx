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
  title: "Screwdriver Web Studio | Websites for tradies & local service businesses — Adelaide",
  description:
    "Conversion-focused websites, SEO landing pages, Google Business Profile support, lead tracking, AI tools, and care plans for Adelaide tradies, cleaners, landscapers, and local service businesses.",
  keywords: [
    "Adelaide web studio",
    "websites for tradies",
    "local service business website",
    "lead generation website",
    "SEO landing pages",
    "Google Business Profile support",
    "AI tools for small businesses",
    "Screwdriver Web Studio",
  ],
  openGraph: {
    title: "Screwdriver Web Studio — More customers, less headaches",
    description:
      "We build the digital system that helps local service businesses get found, look trustworthy, and turn visitors into tracked calls, quotes, and bookings.",
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
