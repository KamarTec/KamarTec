import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnnouncementPopup from "./components/AnnouncementPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'KamarTec Solutions — Ghana\'s Premier Tech Agency',
  description: 'KamarTec Solutions is a legally registered Ghanaian tech company delivering world-class software development, mobile apps, web design, data science, and cybersecurity services.',
  keywords: 'KamarTec, Ghana tech company, software development, mobile apps, web design, data science, cybersecurity, Cape Coast, UCC',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/logo/favicon.png', type: 'image/png' },
    ],
    apple: '/images/logo/favicon.png',
  },
  openGraph: {
    title: 'KamarTec Solutions — Ghana\'s Premier Tech Agency',
    description: 'Legally registered Ghanaian tech company delivering world-class digital solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Synchronously apply dark class before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('darkMode');if(s==='true'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AnnouncementPopup />
      </body>
    </html>
  );
}
