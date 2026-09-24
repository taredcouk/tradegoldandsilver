import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tradegoldandsilver.online"),
  alternates: {
    canonical: "/",
  },
  title: "Online Precious Metals Exchange | Trade Gold, Silver & Platinum",
  description:
    "Buy allocated physical gold, silver, platinum, and palladium in fractional amounts. Access low spreads, insured vault storage, and global market liquidity.",
  openGraph: {
    title: "Online Precious Metals Exchange | Trade Gold, Silver & Platinum",
    description:
      "Buy allocated physical gold, silver, platinum, and palladium in fractional amounts. Access low spreads, insured vault storage, and global market liquidity.",
    type: "website",
    url: "https://tradegoldandsilver.online",
    images: ["/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VRKRLX390T"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-VRKRLX390T');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
