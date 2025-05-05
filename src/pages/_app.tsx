'use client';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 에러 방지를 위한 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>지도 장소 앱</title>
        <meta name="description" content="지도에서 장소를 찾고 정보를 확인하세요" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{ 
        maxWidth: '480px', 
        margin: '0 auto', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Inter, sans-serif'
      }}>
        {mounted && <Component {...pageProps} />}
      </div>
    </>
  );
}

export default MyApp; 