import type { Metadata } from "next";
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
  title: "지도 장소 앱",
  description: "지도에서 장소를 찾고 정보를 확인하세요",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
