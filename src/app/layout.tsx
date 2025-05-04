import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "지도 장소 앱",
  description: "지도에서 장소를 찾고 정보를 확인하세요",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="naver-maps"
          strategy="beforeInteractive"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div style={{ 
          maxWidth: '480px', 
          margin: '0 auto', 
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
