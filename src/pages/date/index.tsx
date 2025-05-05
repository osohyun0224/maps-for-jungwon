'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

const dateIdeas = [
  {
    id: 1,
    title: '한강 피크닉',
    description: '시원한 강바람과 함께하는 로맨틱한 피크닉',
    tags: ['야외', '로맨틱', '무료'],
    rating: 4.7,
    image: '/date-1.jpg',
    isOutdoor: true
  },
  {
    id: 2,
    title: '미술관 데이트',
    description: '예술 작품을 감상하며 대화를 나누는 지적인 데이트',
    tags: ['실내', '문화', '조용함'],
    rating: 4.5,
    image: '/date-2.jpg',
    isOutdoor: false
  },
  {
    id: 3,
    title: '익스트림 스포츠',
    description: '스릴 넘치는 활동으로 특별한 추억 만들기',
    tags: ['야외', '액티비티', '스릴'],
    rating: 4.2,
    image: '/date-3.jpg',
    isOutdoor: true
  }
];

// 날씨 예시 데이터 (실제로는 API에서 가져올 예정)
const weatherExample = {
  main: {
    temp: 23,
    humidity: 65
  },
  weather: [
    {
      main: 'Clear',
      description: '맑음'
    }
  ]
};

export default function DateIdeasPage() {
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor'>('all');
  
  const filteredDateIdeas = dateIdeas.filter(idea => {
    if (filter === 'all') return true;
    if (filter === 'indoor') return !idea.isOutdoor;
    if (filter === 'outdoor') return idea.isOutdoor;
    return true;
  });
  
  // 날씨에 따른 추천 데이트
  const recommendedDate = weatherExample.weather[0].main === 'Clear' || weatherExample.weather[0].main === 'Clouds'
    ? dateIdeas.find(idea => idea.isOutdoor)
    : dateIdeas.find(idea => !idea.isOutdoor);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>데이트 아이디어</h1>
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
            어떤 데이트를<br />
            계획하고 싶으세요?
          </h2>
        </div>
        
        {recommendedDate && (
          <div className={styles.recommendation}>
            <h3>오늘의 추천 데이트</h3>
            <div className={styles.recommendationCard}>
              <div className={styles.recommendationInfo}>
                <div className={styles.weatherInfo}>
                  <span className={styles.temperature}>{Math.round(weatherExample.main.temp)}°C</span>
                  <span className={styles.weatherDescription}>{weatherExample.weather[0].description}</span>
                </div>
                <h4>{recommendedDate.title}</h4>
                <p>{recommendedDate.description}</p>
                <div className={styles.recommendationTags}>
                  {recommendedDate.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${filter === 'all' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'indoor' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('indoor')}
          >
            실내
          </button>
          <button
            className={`${styles.filterButton} ${filter === 'outdoor' ? styles.activeFilter : ''}`}
            onClick={() => setFilter('outdoor')}
          >
            야외
          </button>
        </div>
        
        <div className={styles.ideaList}>
          {filteredDateIdeas.map(idea => (
            <div key={idea.id} className={styles.ideaCard}>
              <div className={styles.ideaCardContent}>
                <h3 className={styles.ideaTitle}>{idea.title}</h3>
                <p className={styles.ideaDescription}>{idea.description}</p>
                <div className={styles.ideaRating}>
                  <span className={styles.ratingStars}>
                    {"★".repeat(Math.floor(idea.rating))}
                    {"☆".repeat(5 - Math.floor(idea.rating))}
                  </span>
                  <span className={styles.ratingNumber}>{idea.rating}</span>
                </div>
                <div className={styles.ideaTags}>
                  {idea.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
        <Link href="/date" className={`${styles.tabItem} ${styles.activeTab}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          <span>데이트</span>
        </Link>
        <Link href="/cafe" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z" fill="currentColor"/>
          </svg>
          <span>카페</span>
        </Link>
      </div>
    </div>
  );
} 