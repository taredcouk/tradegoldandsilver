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
  title: "Trade Gold and Silver Online",
  description:
    "Buy and sell gold and silver online with a secure, professional-grade platform.",
  openGraph: {
    title: "Trade Gold and Silver Online",
    description:
      "Buy and sell gold and silver online with a secure, professional-grade platform.",
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
