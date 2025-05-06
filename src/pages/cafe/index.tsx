'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
import styles from './styles.module.scss';

const cafes = [
  {
    id: 1,
    name: '카페 테라스',
    location: '서울시 강남구',
    rating: 4.5,
    tags: ['루프탑', '데이트', '뷰맛집'],
    image: '/cafe-1.jpg'
  },
  {
    id: 2,
    name: '로지엔 케이크',
    location: '서울시 마포구',
    rating: 4.8,
    tags: ['케이크', '커피', '디저트'],
    image: '/cafe-2.jpg'
  },
  {
    id: 3,
    name: '스튜디오 카페',
    location: '서울시 종로구',
    rating: 4.3,
    tags: ['인테리어', '작업', '도서'],
    image: '/cafe-3.jpg'
  }
];

export default function CafePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCafes = cafes.filter(cafe => 
    cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cafe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
            <p>본 웹서비스에 작업하기 좋은 카페 선정 기준은 개발자 자신이 직접 2회 이상 방문한 찐 작업하기 좋은 카페 들만 선정하였습니다.</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>본인이 직접 찍은 사진들로 대부분 만들었다 보니 사진의 퀄리티가 타 플랫폼 보다 낮을 수 있습니다.</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>작업하기 좋은 카페 선정 기준은 정말 노트북 하기 좋은 카페, 불편하지 않은 좌석, 맛있는 커피, 분위기 등등의 기준으로 선정하였습니다.</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>개발자 주 활동 지역이 서울 동부로 잠실~성수에 몰려있는 점 양해 부탁드립니다.</p>
          </div>
          
          <div className={styles.guideItem}>
            <div className={styles.guideIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <p>작업하기 좋은 카페 기준은 프랜차이즈 카페는 제외했습니다.</p>
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