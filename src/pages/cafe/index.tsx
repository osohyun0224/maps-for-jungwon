'use client';

import Link from 'next/link';
import styles from './styles.module.scss';

export default function CafePage() {
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>안내 사항</h1>
      </div>
      
      <div className={styles.main}>
        <div className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>작업하기 좋은 카페 선정 기준</h2>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>여기에 소개된 카페들은 제가 직접 두 번 이상 가본 곳들만 골랐어요. 진짜 ‘작업 잘 되는’ 찐 카페들만 모았습니다!</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>사진은 대부분 제가 직접 찍은 거라서, 다른 플랫폼처럼 예쁘진 않을 수 있습니다 ! 그래도 분위기나 느낌은 잘 담았다고 생각해요 :)</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>노트북 하기에 편하고, 좌석도 괜찮고, 커피도 맛있고, 분위기도 좋은—말 그대로 오래 앉아서 작업하기 좋은 카페들 위주로 골랐어요!</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>제가 주로 서울 동부 쪽(잠실~성수)에서 활동하다 보니, 그 근처 카페가 많습니다! 이 점은 조금 양해 부탁드려요!</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>참고로 프랜차이즈 카페는 제외했어요. 개인 카페만 담았습니다!</p>
          </div>
          
          <div className={styles.suggestionBox}>
            <h3>추천 카페가 있으신가요?</h3>
            <p>이 웹사이트에 추천할 만한 개인적인 작업하기 좋은 카페가 있다면 아래 링크로 알려주세요!</p>
            <a 
              href="https://forms.gle/hscMSUrnmuZ6sdFWA" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.suggestionButton}
            >
              카페 추천하기
            </a>
          </div>
          
          <div className={styles.developerInfo}>
            <h3>개발자 정보</h3>
            <p>작업하기 좋은 카페를 찾아 헤매는 모든 분들을 위해 만든 서비스입니다.</p>
            <p>모바일 기기에 최적화되어 있으며, 계속해서 업데이트 예정입니다.</p>
          </div>
        </div>
      </div>
      
      <div className={styles.tabBar}>
        <Link href="/" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
          </svg>
          <span>홈</span>
        </Link>
        <Link href="/map" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.59 2 4 5.59 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 5.59 16.41 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z" fill="currentColor"/>
          </svg>
          <span>카페 지도</span>
        </Link>
        <Link href="/date" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          <span>인기 카페</span>
        </Link>
        <Link href="/cafe" className={`${styles.tabItem} ${styles.activeTab}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z" fill="currentColor"/>
          </svg>
          <span>안내 사항</span>
        </Link>
      </div>
    </div>
  );
} 