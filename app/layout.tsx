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
  title: "Screwdriver Web Studio | Websites that bring Adelaide businesses more customers",
  description:
    "Clear websites, reliable online care, and helpful smart extras — plus marketing when you need a push. Plain English. Based in Adelaide.",
  keywords: [
    "Adelaide website design",
    "website for small business Australia",
    "get more customers online",
    "Screwdriver Web Studio",
  ],
  openGraph: {
    title: "Screwdriver Web Studio — Look sharp online and win more enquiries",
    description:
      "We help South Australian businesses turn their website into something customers actually use — without the tech talk.",
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
