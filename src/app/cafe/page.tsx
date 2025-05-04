"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

// 카페 타입 정의
interface Cafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
  rating: number;
  features: string[];
  description: string;
}

export default function CafePage() {
  const [cafes, setCafes] = useState<Cafe[]>([
    { 
      id: 1, 
      name: "카페 뎀셀브스", 
      lat: 37.561652, 
      lng: 126.921817, 
      imageUrl: "/place-1.svg", 
      rating: 4.8,
      features: ["콘센트 많음", "와이파이 빠름", "조용함"],
      description: "넓은 테이블과 편안한 의자가 있어 장시간 작업하기 좋은 카페입니다. 콘센트도 충분히 있어서 노트북 사용에 불편함이 없어요. 조용한 분위기로 집중력을 높여줍니다." 
    },
    { 
      id: 2, 
      name: "언더스탠드 에비뉴", 
      lat: 37.533921, 
      lng: 127.004528, 
      imageUrl: "/place-2.svg", 
      rating: 4.5,
      features: ["넓은 공간", "음료 맛있음", "인테리어"],
      description: "넓은 공간에 다양한 좌석이 있어 작업하기 편리합니다. 특히 창가 자리는 채광이 좋아 기분 좋게 작업할 수 있어요. 커피 맛도 훌륭합니다." 
    },
    { 
      id: 3, 
      name: "블루보틀 삼청점", 
      lat: 37.582775, 
      lng: 126.983667, 
      imageUrl: "/place-1.svg", 
      rating: 4.6,
      features: ["힙한 분위기", "맛있는 커피", "깨끗함"],
      description: "모던한 인테리어와 쾌적한 환경이 작업 효율을 높여줍니다. 블루보틀 특유의 커피 맛이 일품이며, 화장실도 청결하게 관리됩니다." 
    },
    { 
      id: 4, 
      name: "스터디 카페 노트", 
      lat: 37.498108, 
      lng: 127.027626, 
      imageUrl: "/place-2.svg", 
      rating: 4.9,
      features: ["24시간 운영", "스터디룸", "조용함"],
      description: "24시간 운영되어 밤늦게까지 작업할 수 있습니다. 개인 부스가 있어 집중력을 높일 수 있고, 카페 내 소음도 적어 작업 환경이 쾌적해요." 
    },
  ]);
  
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  // 카페 선택 핸들러
  const handleCafeSelect = (cafe: Cafe) => {
    setSelectedCafe(cafe);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>작업 카페</h1>
        <div className={styles.notification}>
          <Image 
            src="/notification.svg" 
            alt="알림" 
            width={24} 
            height={24}
          />
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.subTitle}>집중력을 높여주는</p>
          <h2 className={styles.title}>
            작업하기 좋은 카페를<br />
            확인해보세요
          </h2>
        </div>
        
        <div className={styles.cafesList}>
          {cafes.map((cafe) => (
            <div 
              key={cafe.id} 
              className={`${styles.cafeCard} ${selectedCafe?.id === cafe.id ? styles.selected : ''}`}
              onClick={() => handleCafeSelect(cafe)}
            >
              <div className={styles.cafeInfo}>
                <div className={styles.ratingBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                  </svg>
                  <span>{cafe.rating}</span>
                </div>
                <h3 className={styles.cafeName}>{cafe.name}</h3>
                <div className={styles.featureTags}>
                  {cafe.features.map((feature, index) => (
                    <span key={index} className={styles.featureTag}>{feature}</span>
                  ))}
                </div>
              </div>
              <div className={styles.cafeImage}>
                <Image 
                  src={cafe.imageUrl}
                  alt="카페 이미지" 
                  width={60}
                  height={60}
                />
              </div>
            </div>
          ))}
        </div>
        
        {selectedCafe && (
          <div className={styles.cafeDetails}>
            <div className={styles.detailsHeader}>
              <h2>{selectedCafe.name}</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedCafe(null)}
              >
                &times;
              </button>
            </div>
            <div className={styles.ratingInfo}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
              </svg>
              <span className={styles.ratingValue}>{selectedCafe.rating}</span>
            </div>
            <div className={styles.imageContainer}>
              <Image 
                src={selectedCafe.imageUrl} 
                alt={selectedCafe.name} 
                width={300}
                height={180}
                className={styles.detailImage}
              />
            </div>
            <div className={styles.featureList}>
              {selectedCafe.features.map((feature, index) => (
                <span key={index} className={styles.featureDetailTag}>{feature}</span>
              ))}
            </div>
            <p className={styles.description}>{selectedCafe.description}</p>
            <div className={styles.coordinates}>
              {selectedCafe.lat.toFixed(6)}, {selectedCafe.lng.toFixed(6)}
            </div>
            <button onClick={() => window.alert('지도에서 위치를 확인합니다!')} className={styles.mapButton}>
              지도에서 위치 확인하기
            </button>
          </div>
        )}
      </main>
      
      <footer className={styles.tabBar}>
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
      </footer>
    </div>
  );
} 