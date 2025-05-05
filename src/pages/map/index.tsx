'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';

// 클라이언트 사이드에서만 렌더링되도록 동적 임포트
const LeafletMap = dynamic(() => import('../../components/LeafletMap'), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>지도를 불러오는 중...</div>
});

// 장소 데이터 인터페이스
interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  rating: number;
  tags: string[];
  image?: string;
}

// 예시 장소 데이터
const placesData: Place[] = [
  {
    id: 1,
    name: '서울숲',
    lat: 37.544579,
    lng: 127.037701,
    description: '도심 속 자연을 만끽할 수 있는 공원',
    rating: 4.5,
    tags: ['공원', '산책', '데이트'],
    image: '/place-1.svg'
  },
  {
    id: 2,
    name: '남산타워',
    lat: 37.551168,
    lng: 126.988402,
    description: '서울의 전망을 한눈에 볼 수 있는 랜드마크',
    rating: 4.7,
    tags: ['전망', '관광', '랜드마크'],
    image: '/place-2.svg'
  },
  {
    id: 3,
    name: '경복궁',
    lat: 37.579617,
    lng: 126.977041,
    description: '조선시대 역사를 느낄 수 있는 문화재',
    rating: 4.6,
    tags: ['역사', '문화재', '관광'],
    image: '/place-1.svg'
  }
];

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [mapZoom, setMapZoom] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 검색어에 따른 필터링된 장소
  const filteredPlaces = searchTerm 
    ? placesData.filter(place => 
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : placesData;
  
  // 장소 선택 시 지도 중심 변경
  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.lat, lng: place.lng });
    setMapZoom(15);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>장소 지도</h1>
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
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="장소 또는 태그 검색..."
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
        
        <div className={styles.mapContainer}>
          <LeafletMap
            lat={mapCenter.lat}
            lng={mapCenter.lng}
            zoom={mapZoom}
            height="300px"
          />
        </div>
        
        {selectedPlace && (
          <div className={styles.placeDetails}>
            <div className={styles.placeHeader}>
              <h2>{selectedPlace.name}</h2>
              <div className={styles.rating}>
                <span className={styles.ratingStars}>
                  {"★".repeat(Math.floor(selectedPlace.rating))}
                  {"☆".repeat(5 - Math.floor(selectedPlace.rating))}
                </span>
                <span className={styles.ratingNumber}>{selectedPlace.rating}</span>
              </div>
            </div>
            <p className={styles.placeDescription}>{selectedPlace.description}</p>
            <div className={styles.placeTags}>
              {selectedPlace.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </div>
        )}
        
        <div className={styles.placesList}>
          <h3 className={styles.placesListTitle}>추천 장소</h3>
          <div className={styles.placesGrid}>
            {filteredPlaces.map(place => (
              <div 
                key={place.id} 
                className={`${styles.placeCard} ${selectedPlace?.id === place.id ? styles.selectedCard : ''}`}
                onClick={() => handlePlaceSelect(place)}
              >
                <div className={styles.placeImageContainer}>
                  <div className={styles.placeImagePlaceholder}>
                    {place.image ? (
                      <Image src={place.image} alt={place.name} width={40} height={40} />
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C7.59 2 4 5.59 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 5.59 16.41 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z" fill="currentColor"/>
                      </svg>
                    )}
                  </div>
                </div>
                <div className={styles.placeInfo}>
                  <h4 className={styles.placeName}>{place.name}</h4>
                  <div className={styles.placeTags}>
                    {place.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
} 