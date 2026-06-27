import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مركز الجروح والقدم السكري D.F.C - معتز أبو رميلة",
  description: "مركز طبي متخصص في علاج القدم السكري والجروح المزمنة والجروح المعقدة في الخليل. نقدم خدمات متكاملة لتشخيص وعلاج قرح القدم السكري والتهابات القدم والوقاية من البتر.",
  keywords: "علاج القدم السكري, مركز قدم سكري, عيادة قدم سكري, علاج الجروح المزمنة, علاج قرح القدم, علاج قرح الفراش, عناية الجروح, ضمادات متخصصة, الوقاية من البتر, علاج التهابات القدم",
  openGraph: {
    title: "مركز الجروح والقدم السكري D.F.C",
    description: "مركز طبي متخصص في علاج القدم السكري والجروح المزمنة في الخليل",
    type: "website",
    locale: "ar_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`h-full antialiased ${cairo.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F4C81" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="D.F.C" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900" style={{ fontFamily: 'var(--font-cairo), sans-serif' }}>
        <ServiceWorker />
        {children}
      </body>
    </html>
  );
}
