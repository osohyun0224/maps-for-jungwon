"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

// 데이트 장소 타입 정의
interface DatePlace {
  id: number;
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
  date: string;
  description: string;
}

export default function DatePage() {
  const [places, setPlaces] = useState<DatePlace[]>([
    { 
      id: 1, 
      name: "남산 서울타워", 
      lat: 37.551168, 
      lng: 126.988228, 
      imageUrl: "/place-1.svg", 
      date: "2023.10.15",
      description: "남산 서울타워에서 본 서울 야경이 정말 아름다웠어요. 타워 아래 카페에서 커피를 마시며 데이트를 즐겼습니다." 
    },
    { 
      id: 2, 
      name: "한강 공원", 
      lat: 37.513656, 
      lng: 126.943384, 
      imageUrl: "/place-2.svg", 
      date: "2023.11.20",
      description: "한강 공원에서 자전거 타기와 피크닉을 즐겼어요. 날씨가 좋아서 한강 뷰를 보며 오래 앉아있을 수 있었습니다." 
    },
    { 
      id: 3, 
      name: "경복궁", 
      lat: 37.579617, 
      lng: 126.977041, 
      imageUrl: "/place-1.svg", 
      date: "2023.12.05",
      description: "경복궁 야간 개장 때 방문했어요. 조명이 들어온 고궁의 모습이 로맨틱했습니다. 한복을 입고 사진도 많이 찍었어요." 
    },
    { 
      id: 4, 
      name: "북촌 한옥마을", 
      lat: 37.582109, 
      lng: 126.984777, 
      imageUrl: "/place-2.svg", 
      date: "2024.01.10",
      description: "한옥마을의 전통적인 분위기가 매력적이었어요. 작은 카페와 공방들을 구경하며 걷는 시간이 즐거웠습니다." 
    },
  ]);
  
  const [selectedPlace, setSelectedPlace] = useState<DatePlace | null>(null);

  // 장소 선택 핸들러
  const handlePlaceSelect = (place: DatePlace) => {
    setSelectedPlace(place);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>데이트 기록</h1>
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
          <p className={styles.subTitle}>정원님과 함께한</p>
          <h2 className={styles.title}>
            지난 데이트 장소를<br />
            추억해보세요
          </h2>
        </div>
        
        <div className={styles.placesList}>
          {places.map((place) => (
            <div 
              key={place.id} 
              className={`${styles.placeCard} ${selectedPlace?.id === place.id ? styles.selected : ''}`}
              onClick={() => handlePlaceSelect(place)}
            >
              <div className={styles.placeInfo}>
                <p className={styles.dateVisited}>{place.date}</p>
                <h3 className={styles.placeName}>{place.name}</h3>
                <p className={styles.coordinates}>
                  {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                </p>
              </div>
              <div className={styles.placeImage}>
                <Image 
                  src={place.imageUrl}
                  alt="장소 이미지" 
                  width={60}
                  height={60}
                />
              </div>
            </div>
          ))}
        </div>
        
        {selectedPlace && (
          <div className={styles.placeDetails}>
            <div className={styles.detailsHeader}>
              <h2>{selectedPlace.name}</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedPlace(null)}
              >
                &times;
              </button>
            </div>
            <p className={styles.dateDetail}>{selectedPlace.date} 방문</p>
            <div className={styles.imageContainer}>
              <Image 
                src={selectedPlace.imageUrl} 
                alt={selectedPlace.name} 
                width={300}
                height={180}
                className={styles.detailImage}
              />
            </div>
            <p className={styles.description}>{selectedPlace.description}</p>
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
      </footer>
    </div>
  );
} 