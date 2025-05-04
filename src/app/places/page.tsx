"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.scss";

// 장소 타입 정의
interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl?: string;
}

export default function PlacesPage() {
  // 장소 데이터
  const [places, setPlaces] = useState<Place[]>([
    { 
      id: 1, 
      name: "서울 남산타워", 
      lat: 37.551168, 
      lng: 126.988228, 
      description: "서울의 랜드마크인 남산서울타워입니다. 서울 시내의 멋진 전망을 볼 수 있으며, 각종 문화 공간과 레스토랑이 있습니다.",
      imageUrl: "https://via.placeholder.com/300x200?text=남산타워" 
    },
    { 
      id: 2, 
      name: "경복궁", 
      lat: 37.579617, 
      lng: 126.977041, 
      description: "조선시대의 정궁인 경복궁입니다. 1395년 태조 이성계에 의해 창건되었으며, 아름다운 한국 전통 건축을 감상할 수 있습니다.",
      imageUrl: "https://via.placeholder.com/300x200?text=경복궁" 
    },
    { 
      id: 3, 
      name: "명동성당", 
      lat: 37.563545, 
      lng: 126.987565, 
      description: "서울대교구 주교좌 명동대성당입니다. 1898년에 완공된 고딕 양식의 성당으로, 한국 천주교의 상징적인 장소입니다.",
      imageUrl: "https://via.placeholder.com/300x200?text=명동성당" 
    },
    { 
      id: 4, 
      name: "광화문 광장", 
      lat: 37.575268, 
      lng: 126.976896, 
      description: "대한민국의 상징적인 광장으로, 세종대왕 동상과 이순신 장군 동상이 있는 역사적인 장소입니다.",
      imageUrl: "https://via.placeholder.com/300x200?text=광화문광장" 
    },
    { 
      id: 5, 
      name: "동대문 디자인 플라자", 
      lat: 37.566678, 
      lng: 127.009464, 
      description: "자하 하디드가 설계한, 미래적인 디자인의 복합 문화 공간입니다. 다양한 전시와 패션 이벤트가 열립니다.",
      imageUrl: "https://via.placeholder.com/300x200?text=DDP" 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // 검색어 필터링
  const filteredPlaces = places.filter(place => 
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>장소 목록</h1>
        
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
            </svg>
            <input
              type="text"
              placeholder="장소 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.placesGrid}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <div 
                key={place.id} 
                className={styles.placeCard}
                onClick={() => setSelectedPlace(place)}
              >
                <div className={styles.imageContainer}>
                  {place.imageUrl && (
                    <Image 
                      src={place.imageUrl} 
                      alt={place.name} 
                      width={300} 
                      height={200}
                      className={styles.placeImage}
                    />
                  )}
                </div>
                <div className={styles.placeInfo}>
                  <h2>{place.name}</h2>
                  <p className={styles.coordinates}>
                    {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                  </p>
                  <p className={styles.description}>
                    {place.description.substring(0, 60)}
                    {place.description.length > 60 ? '...' : ''}
                  </p>
                  <div className={styles.placeActions}>
                    <Link href={`/map?lat=${place.lat}&lng=${place.lng}`} className={styles.viewOnMap}>
                      지도에서 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <Image src="/location-icon.svg" alt="위치 아이콘" width={48} height={48} />
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
        
        {selectedPlace && (
          <div className={styles.placeModal} onClick={() => setSelectedPlace(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedPlace(null)}
              >
                &times;
              </button>
              
              <h2>{selectedPlace.name}</h2>
              
              {selectedPlace.imageUrl && (
                <div className={styles.modalImageContainer}>
                  <Image 
                    src={selectedPlace.imageUrl} 
                    alt={selectedPlace.name} 
                    width={500} 
                    height={300}
                    className={styles.modalImage}
                  />
                </div>
              )}
              
              <p className={styles.coordinates}>
                위치: {selectedPlace.lat.toFixed(6)}, {selectedPlace.lng.toFixed(6)}
              </p>
              
              <p className={styles.modalDescription}>{selectedPlace.description}</p>
              
              <div className={styles.modalActions}>
                <Link 
                  href={`/map?lat=${selectedPlace.lat}&lng=${selectedPlace.lng}`} 
                  className={styles.viewOnMapButton}
                >
                  지도에서 보기
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
} 