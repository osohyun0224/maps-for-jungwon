'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
        <h1>카페 찾기</h1>
        <div className={styles.notification}>
          <Image 
            src="/notification.svg" 
            alt="알림" 
            width={24} 
            height={24}
          />
        </div>
      </div>
      
      <div className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.subTitle}>정원님을 위한</p>
          <h2 className={styles.title}>
            데이트하기 좋은<br />
            카페를 확인해보세요
          </h2>
        </div>
        
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="카페 이름, 태그 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        
        <div className={styles.cafeList}>
          {filteredCafes.length > 0 ? (
            filteredCafes.map(cafe => (
              <div key={cafe.id} className={styles.cafeCard}>
                <div className={styles.cafeImageContainer}>
                  <div className={styles.cafeImagePlaceholder}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.cafeInfo}>
                  <h3 className={styles.cafeName}>{cafe.name}</h3>
                  <p className={styles.cafeLocation}>{cafe.location}</p>
                  <div className={styles.cafeRating}>
                    <span className={styles.ratingStars}>
                      {"★".repeat(Math.floor(cafe.rating))}
                      {"☆".repeat(5 - Math.floor(cafe.rating))}
                    </span>
                    <span className={styles.ratingNumber}>{cafe.rating}</span>
                  </div>
                  <div className={styles.cafeTags}>
                    {cafe.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>검색 결과가 없습니다. 다른 키워드로 검색해 보세요.</p>
            </div>
          )}
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
          <span>장소조회</span>
        </Link>
        <Link href="/date" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          <span>데이트</span>
        </Link>
        <Link href="/cafe" className={`${styles.tabItem} ${styles.activeTab}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z" fill="currentColor"/>
          </svg>
          <span>카페</span>
        </Link>
      </div>
    </div>
  );
} 