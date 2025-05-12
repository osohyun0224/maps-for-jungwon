'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Place } from '../../types';
import { placesData } from '../../data/places';

// 데이트 아이디어 인터페이스
interface DateIdea {
  id: number;
  title: string;
  description: string;
  tags: string[];
  rating: number;
  mainImage: string;
  images: string[]; // 추가 이미지들 (모달에서 보여질 이미지들)
  isOutdoor: boolean;
}

const dateIdeas: DateIdea[] = [
  {
    id: 1,
    title: '한강 피크닉',
    description: '시원한 강바람과 함께하는 로맨틱한 피크닉',
    tags: ['야외', '로맨틱', '무료'],
    rating: 4.7,
    mainImage: '/date-1.jpg',
    images: [
      '/hangang-1.jpg',
      '/hangang-2.jpg',
      '/hangang-3.jpg'
    ],
    isOutdoor: true
  },
  {
    id: 2,
    title: '미술관 데이트',
    description: '예술 작품을 감상하며 대화를 나누는 지적인 데이트',
    tags: ['실내', '문화', '조용함'],
    rating: 4.5,
    mainImage: '/date-2.jpg',
    images: [
      '/museum-1.jpg',
      '/museum-2.jpg',
      '/museum-3.jpg'
    ],
    isOutdoor: false
  },
  {
    id: 3,
    title: '익스트림 스포츠',
    description: '스릴 넘치는 활동으로 특별한 추억 만들기',
    tags: ['야외', '액티비티', '스릴'],
    rating: 4.2,
    mainImage: '/date-3.jpg',
    images: [
      '/extreme-1.jpg',
      '/extreme-2.jpg',
      '/extreme-3.jpg'
    ],
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
  const [showModal, setShowModal] = useState(false);
  const [modalIdea, setModalIdea] = useState<DateIdea | null>(null);
  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  
  const topCafes = [
    placesData.find(cafe => cafe.name === "본지르르 성수"),
    placesData.find(cafe => cafe.name === "퀜치 커피 합정"),
    placesData.find(cafe => cafe.name === "오베뉴 한남"),
    placesData.find(cafe => cafe.name === "mtl 한남"),
    placesData.find(cafe => cafe.name === "씨엘트리 송리단길")
  ].filter(cafe => cafe !== undefined) as Place[];
  
  const groupCafesByRegion = (cafes: Place[]) => {
    const regions: { [key: string]: Place[] } = {
      '성수': [],
      '서울숲/뚝섬': [],
      '왕십리': [],
      '둔촌/성내': [],
      '하남/미사': [],
      '의정부/민락': [],
      '한남/이태원': [],
      '잠실/송리단길': [],
      '합정/연남': [],
      '봉은사/코엑스': [],
      '기타': []
    };
    
    cafes.forEach(cafe => {
      if (cafe.tags.includes('성수동')) {
        regions['성수'].push(cafe);
      } else if (cafe.tags.includes('서울숲') || cafe.tags.includes('뚝섬')) {
        regions['서울숲/뚝섬'].push(cafe);
      } else if (cafe.tags.includes('왕십리')) {
        regions['왕십리'].push(cafe);
      } else if (cafe.tags.includes('둔촌동')) {
        regions['둔촌/성내'].push(cafe);
      } else if (cafe.tags.includes('하남')) {
        regions['하남/미사'].push(cafe);
      } else if (cafe.tags.includes('의정부')) {
        regions['의정부/민락'].push(cafe);
      } else if (cafe.tags.includes('한남동')) {
        regions['한남/이태원'].push(cafe);
      } else if (cafe.tags.includes('송리단길')) {
        regions['잠실/송리단길'].push(cafe);
      } else if (cafe.tags.includes('합정') || cafe.tags.includes('연남동')) {
        regions['합정/연남'].push(cafe);
      } else if (cafe.tags.includes('봉은사') || cafe.tags.includes('코엑스')) {
        regions['봉은사/코엑스'].push(cafe);
      } else {
        regions['기타'].push(cafe);
      }
    });
    
    return Object.fromEntries(
      Object.entries(regions).filter(([_, cafes]) => cafes.length > 0)
    );
  };
  
  const cafesByRegion = groupCafesByRegion(placesData);
  
  // 특정 카페 모달 열기
  const openCafeModal = (cafe: Place) => {
    setModalPlace(cafe);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setModalIdea(null);
    setModalPlace(null);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>인기 카페 추천</h1>
      </div>
      
      <div className={styles.main}>
        <div className={styles.popularSection}>
          <h2 className={styles.sectionTitle}>지금 뜨고 있는 인기 카페 TOP 5</h2>
          <div className={styles.popularCafes}>
            {topCafes.map((cafe) => (
              <div key={cafe.id} className={styles.popularCafe} onClick={() => openCafeModal(cafe)}>
                <div className={styles.cafeImageWrapper}>
                  <ImageWithSkeleton
                    src={cafe.mainImage}
                    alt={cafe.name}
                    width={120}
                    height={120}
                    className={styles.cafeImage}
                  />
                </div>
                <div className={styles.cafeInfo}>
                  <h3>{cafe.name}</h3>
                  <div className={styles.cafeTags}>
                    {cafe.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.regionSection}>
          <h2 className={styles.sectionTitle}>지역별 인기 카페</h2>
          
          {Object.entries(cafesByRegion).map(([region, cafes]) => (
            cafes.length > 0 && (
              <div key={region} className={styles.regionGroup}>
                <h3 className={styles.regionTitle}>{region}의 인기 카페</h3>
                <div className={styles.regionCafes}>
                  {cafes.map((cafe) => (
                    <div key={cafe.id} className={styles.cafeCard} onClick={() => openCafeModal(cafe)}>
                      <div className={styles.cafeCardImageWrapper}>
                        <ImageWithSkeleton
                          src={cafe.mainImage}
                          alt={cafe.name}
                          width={80}
                          height={80}
                          className={styles.cafeCardImage}
                        />
                      </div>
                      <div className={styles.cafeCardInfo}>
                        <h4>{cafe.name}</h4>
                        <div className={styles.rating}>
                          <span>★</span> {cafe.rating}
                        </div>
                        <div className={styles.cafeCardTags}>
                          {cafe.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className={styles.smallTag}>#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      
      {showModal && modalPlace && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <h2>{modalPlace.name}</h2>
            
            <div className={styles.modalImageContainer}>
              {modalPlace.images.map((img, index) => (
                <div key={index} className={styles.modalImage}>
                  <ImageWithSkeleton
                    src={img}
                    alt={`${modalPlace.name} 이미지 ${index + 1}`}
                    width={320}
                    height={200}
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.rating}>
                <span>★</span> {modalPlace.rating}
              </div>
              <p className={styles.description}>{modalPlace.description}</p>
              
              <div className={styles.tags}>
                {modalPlace.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
              
              <div className={styles.modalButtons}>
                <a 
                  href={modalPlace.naver} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.naverButton}
                >
                  네이버 지도에서 보기
                </a>
               
              </div>
            </div>
          </div>
        </div>
      )}
      
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
        <Link href="/date" className={`${styles.tabItem} ${styles.activeTab}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
          </svg>
          <span>인기 카페</span>
        </Link>
        <Link href="/cafe" className={styles.tabItem}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z" fill="currentColor"/>
          </svg>
          <span>안내 사항</span>
        </Link>
      </div>
    </div>
  );
} 