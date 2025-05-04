"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

// 장소 타입 정의
interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export default function MapPage() {
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, name: "서울 남산타워", lat: 37.551168, lng: 126.988228, description: "서울의 랜드마크인 남산서울타워입니다. 서울 시내를 한눈에 내려다볼 수 있는 전망대가 있어요." },
    { id: 2, name: "경복궁", lat: 37.579617, lng: 126.977041, description: "조선시대의 정궁인 경복궁입니다. 야간 개장 시 은은한 조명이 로맨틱한 분위기를 만들어줍니다." },
    { id: 3, name: "명동성당", lat: 37.563545, lng: 126.987565, description: "서울대교구 주교좌 명동대성당입니다. 고딕 양식의 웅장한 건축물로 주변 데이트 코스로도 좋아요." },
  ]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // 지도 초기화
  useEffect(() => {
    // 실제 구현에서는 카카오맵이나 구글맵 등의 지도 API를 사용해야 합니다.
    // 아래는 간단한 예시 코드입니다.
    console.log("지도를 초기화합니다...");
    
    // 지도 API 로드 코드
    const loadMap = async () => {
      // 카카오맵이나 구글맵 등의 API를 로드하는 코드를 여기에 작성
      // 예: const mapInstance = new kakao.maps.Map(document.getElementById("map"), mapOptions);
      
      // 간단한 시뮬레이션으로 대체
      const mockMap = {
        setCenter: (lat: number, lng: number) => {
          console.log(`지도 중심 좌표 이동: 위도 ${lat}, 경도 ${lng}`);
        }
      };
      
      setMap(mockMap);
    };
    
    loadMap();
  }, []);

  // 장소 선택 핸들러
  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    
    // 선택한 장소로 지도 중심 이동
    if (map) {
      map.setCenter(place.lat, place.lng);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>장소조회</h1>
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
          <p className={styles.subTitle}>정원님과 함께 가볼만한</p>
          <h2 className={styles.title}>
            내 주변 데이트 장소를<br />
            확인해보세요
          </h2>
        </div>
        
        <div className={styles.mapSection}>
          <div id="map" className={styles.mapView}>
            <div className={styles.mapPlaceholder}>
              <Image src="/map-icon.svg" alt="지도 아이콘" width={40} height={40} className={styles.placeholderIcon} />
              <p>지도가 여기에 표시됩니다.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.placesList}>
          {places.map((place) => (
            <div 
              key={place.id} 
              className={`${styles.placeCard} ${selectedPlace?.id === place.id ? styles.selected : ''}`}
              onClick={() => handlePlaceSelect(place)}
            >
              <div className={styles.placeInfo}>
                <p className={styles.distance}>현재 위치에서 3.5km</p>
                <h3 className={styles.placeName}>{place.name}</h3>
                <p className={styles.coordinates}>
                  {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                </p>
              </div>
              <div className={styles.placeImage}>
                <Image 
                  src={place.id === 1 ? "/place-1.svg" : "/place-2.svg"}
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
            <p className={styles.description}>{selectedPlace.description}</p>
            <button onClick={() => window.alert('예약되었습니다!')} className={styles.reserveButton}>
              데이트 코스 예약하기
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
        <Link href="/map" className={`${styles.tabItem} ${styles.activeTab}`}>
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