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
  mainImage: string;
  images: string[]; // 추가 이미지들 (모달에서 보여질 이미지들)
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
    mainImage: '/place-1.svg',
    images: [
      '/seoul-forest-1.jpg',
      '/seoul-forest-2.jpg',
      '/seoul-forest-3.jpg'
    ]
  },
  {
    id: 2,
    name: '남산타워',
    lat: 37.551168,
    lng: 126.988402,
    description: '서울의 전망을 한눈에 볼 수 있는 랜드마크',
    rating: 4.7,
    tags: ['전망', '관광', '랜드마크'],
    mainImage: '/place-2.svg',
    images: [
      '/namsan-tower-1.jpg',
      '/namsan-tower-2.jpg',
      '/namsan-tower-3.jpg'
    ]
  },
  {
    id: 3,
    name: '경복궁',
    lat: 37.579617,
    lng: 126.977041,
    description: '조선시대 역사를 느낄 수 있는 문화재',
    rating: 4.6,
    tags: ['역사', '문화재', '관광'],
    mainImage: '/place-1.svg',
    images: [
      '/gyeongbokgung-1.jpg',
      '/gyeongbokgung-2.jpg',
      '/gyeongbokgung-3.jpg'
    ]
  },
  {
    id :4,
    name : '본지르르 성수',
    lat : 37.549347883,
    lng : 127.054658034,
    description : '성수동에서 작업하기 좋은 카페, 널찍한 자리와 조용한 분위기',
    rating : 4.6,
    tags : ['카페', '데이트', '커피'],
    mainImage : '/sungsu_vonzurr1.png',
    images : [
      '/sungsu_vonzurr1.png',
      '/sungsu_vonzurr2.png',
      '/sungsu_vonzurr3.png'
    ]
  },
  {
    id :5,
    name : '포레스트 서울숲',
    lat : 37.546801119,
    lng : 127.040731120,
    description : '서울숲 초근접, 빙수와 커피, 널찍한 자리 카공하기도 좋고 빈백에 누워서 쉬기도 좋은 카페',
    rating : 4.5,
    tags : ['카페', '데이트', '커피', '빙수'],
    mainImage : '/forest_seoul_1.png',
    images : [
      '/forest_seoul_1.png',
      '/forest_seoul_2.png',
      '/forest_seoul_3.png',
      '/forest_seoul_4.png',
    ]
  },
  {
    id :6,
    name : '오베뉴 한남',
    lat : 37.535199450,
    lng : 127.010243539,
    description : '통창 테라스, 날씨 좋은 날 가기 좋은 카페, 널찍한 자리와 카공하기 좋은 카페',
    rating : 4.5,
    tags : ['카페', '데이트', '커피'],
    mainImage : '/ovenu_hannam_1.png',
    images : [
      '/ovenu_hannam_1.png',
      '/ovenu_hannam_2.png',
      '/ovenu_hannam_3.png',
      '/ovenu_hannam_4.png',
      '/ovenu_hannam_5.png',
    ]
  },
  {
    id :7,
    name : '로우커피스탠드 뚝섬',
    lat : 37.535199450,
    lng : 127.010243539,
    description : '테이크아웃 전문점, 바닐라 라떼가 맛있는 곳, 저렴한 커피 가격',
    rating : 4.5,
    tags : ['커피', '데이트',],
    mainImage : '/low_stand1.png',
    images : [
      '/low_stand1.png'
    ]
  },
  {
    id :8,
    name : '쇼트브레드 의정부 민락',
    lat : 37.746799244,
    lng : 127.099873165,
    description : '빵이 맛있는 곳, 널찍한 공간, 카공하기 좋은 카페',
    rating : 4.5,
    tags : ['카페', '베이커리', '데이트', '커피'],
    mainImage : '/shorts_bread_1.png',
    images : [
      '/shorts_bread_1.png',
      '/shorts_bread_2.png'
    ]
  },
  {
    id :9,
    name : '파블로앤던커피 의정부 민락',
    lat : 37.74654569229999,
    lng : 127.09553664518879,
    description : '식사와 베이커리, 카페를 모두 즐길 수 있는 곳 널찍한 자리 카공하기 좋은 카페',
    rating : 4.5,
    tags : ['카페', '베이커리', '데이트', '커피'],
    mainImage : '/pablo_1.png',
    images : [
      '/pablo_1.png',  
      '/pablo_2.png'
    ]
  },
  {
    id :10,
    name : '카페 빔프 의정부 민락',
    lat : 37.746467197,
    lng : 127.096325224,
    description : '댕댕이가 있는 카페, 장난스러운 소품들이 가득한 카공하기 좋은 카페',
    rating : 4.5,
    tags : ['카페', '데이트', '커피'],
    mainImage : '/bimp_1.png',
    images : [
      '/bimp_1.png',
      '/bimp_2.jpg'
    ]
  },
  {
    id :11,
    name : '나루터 송리단길',
    lat : 37.746512250,
    lng : 127.095550362,
    description : '송리단길 초근접, 널찍한 자리 카공하기 좋은 카페',
    rating : 4.5,
    tags : ['카페', '데이트', '커피'],
    mainImage : '/narut_1.png',
    images : [
      '/narut_1.png',
      '/narut_2.png'
    ]
  }
];

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [mapZoom, setMapZoom] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  
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
  
  // 모달 열기
  const openModal = (place: Place) => {
    setModalPlace(place);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
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
            <button 
              className={styles.moreDetailsButton}
              onClick={() => openModal(selectedPlace)}
            >
              더 많은 사진 보기
            </button>
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
                    <Image src={place.mainImage} alt={place.name} width={40} height={40} />
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
      
      {/* 모달 */}
      {showModal && modalPlace && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <h2 className={styles.modalTitle}>{modalPlace.name}</h2>
            <p className={styles.modalDescription}>{modalPlace.description}</p>
            
            <div className={styles.imagesGrid}>
              {modalPlace.images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <Image 
                    src={image} 
                    alt={`${modalPlace.name} 이미지 ${index + 1}`} 
                    width={300} 
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            
            <div className={styles.modalTags}>
              {modalPlace.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>#{tag}</span>
              ))}
            </div>
            
            <div className={styles.modalRating}>
              <span className={styles.ratingStars}>
                {"★".repeat(Math.floor(modalPlace.rating))}
                {"☆".repeat(5 - Math.floor(modalPlace.rating))}
              </span>
              <span className={styles.ratingNumber}>{modalPlace.rating}</span>
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