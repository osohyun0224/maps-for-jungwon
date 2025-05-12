'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
import Link from "next/link";
import styles from "./styles.module.scss";
import { Place } from "../../types";
import { placesData } from "../../data/places";

type WeatherData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  name: string;
};

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearCafes, setNearCafes] = useState<Place[]>([]);

  // 두 지점 간의 거리 계산 (하버사인 공식)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 사용자의 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다:", error);
          // 기본 위치로 서울 좌표 설정
          setUserLocation({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않는 브라우저입니다.");
      // 기본 위치로 서울 좌표 설정
      setUserLocation({ lat: 37.5665, lng: 126.9780 });
    }
  }, []);

  // 사용자 위치 기반 가까운 카페 찾기
  useEffect(() => {
    if (userLocation) {
      // 현재 위치에서 가장 가까운 카페 4개 찾기
      const cafesWithDistance = placesData.map(cafe => ({
        ...cafe,
        distance: calculateDistance(userLocation.lat, userLocation.lng, cafe.lat, cafe.lng)
      }));
      
      // 거리별로 정렬
      const sortedCafes = cafesWithDistance.sort((a, b) => a.distance - b.distance);
      
      // 가장 가까운 4개 카페 선택
      setNearCafes(sortedCafes.slice(0, 4));
    }
  }, [userLocation]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // 서울 좌표 (위도, 경도)
        const lat = userLocation?.lat || 37.5665;
        const lon = userLocation?.lng || 126.9780;
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('날씨 정보를 가져오는데 실패했습니다');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error('날씨 데이터 가져오기 오류:', err);
        setError('날씨 정보를 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    }
    
    if (userLocation) {
      fetchWeather();
    }
  }, [userLocation]);

  // 날씨 아이콘 URL 생성 - 더 큰 사이즈로 변경
  const getWeatherIconUrl = (iconCode: string) => 
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // 날씨 상태 한글 번역
  const getWeatherKoreanDesc = (weatherMain: string, description: string) => {
    const weatherMap: Record<string, string> = {
      'Clear': '맑음',
      'Clouds': '구름',
      'Rain': '비',
      'Drizzle': '이슬비',
      'Thunderstorm': '천둥번개',
      'Snow': '눈',
      'Mist': '안개',
      'Fog': '안개',
      'Haze': '연무',
      'Dust': '먼지',
      'Smoke': '연기',
      'Tornado': '토네이도',
    };

    return weatherMap[weatherMain] || description;
  };

  // 날씨에 따른 추천 메시지 (개발자 카페 테마로 변경)
  const getWeatherRecommendation = (weatherMain: string) => {
    if (weatherMain === 'Clear') {
      return '맑은 날씨네요! 오늘은 창가 자리가 있는 카페에서 코딩해보세요.';
    } else if (weatherMain === 'Clouds') {
      return '구름이 있지만 코딩하기 좋은 날씨예요. 아늑한 카페에서 생산성을 높여보세요.';
    } else if (['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherMain)) {
      return '비 오는 날엔 카페의 창가에서 비 내리는 풍경을 보며 코딩하기 좋아요.';
    } else if (weatherMain === 'Snow') {
      return '눈 내리는 날에는 따뜻한 카페에서 코딩하는 것도 운치가 있어요!';
    } else {
      return '오늘 같은 날씨에 맞는 작업 공간을 추천해 드려요!';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>작업하기 좋은 카페 추천</h1>
      </div>
      
      <div className={styles.main}>
        {/* 날씨 정보 섹션 */}
        <div className={styles.weatherSection}>
          {loading ? (
            <p className={styles.weatherLoading}>날씨 정보를 불러오는 중...</p>
          ) : error ? (
            <p className={styles.weatherError}>{error}</p>
          ) : weather && (
            <div className={styles.weatherInfo}>
              <div className={styles.weatherIcon}>
                <ImageWithSkeleton 
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.weatherDetails}>
                <div className={styles.weatherLocationTemp}>
                  <h6 className={styles.weatherLocation}>{weather.name}</h6>
                  <p className={styles.weatherTemp}>{Math.round(weather.main.temp)}°C</p>
                </div>
                <div className={styles.weatherTextInfo}>
                  <p className={styles.weatherDesc}>
                    {getWeatherKoreanDesc(weather.weather[0].main, weather.weather[0].description)}
                  </p>
                  <p className={styles.weatherRecommend}>
                    {getWeatherRecommendation(weather.weather[0].main)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.intro}>
          <p className={styles.subTitle}>오늘의 개발자 카페 추천</p>
          <h2 className={styles.title}>
            {weather && weather.weather[0].main === 'Clear'
              ? '날씨가 맑은 오늘,\n카페에서 코딩하기 좋은 날이에요!'
              : weather && weather.weather[0].main === 'Clouds'
                ? '구름이 있지만 햇살이 비치는 오늘,\n아늑한 카페에서 코딩해보세요'
                : weather
                  ? '오늘 같은 날씨엔\n아늑한 카페에서 코딩해보세요'
                  : '당신 주변의\n작업하기 좋은 카페를 찾아보세요'
            }
          </h2>
        </div>
          
        <div className={styles.welcome}>
          <p className={styles.welcomeText}>
            아래는 오늘의 작업하기 좋은 카페 추천 목록 입니다.
          </p>
        </div>
        
        <div className={styles.vaccineList}>
          {nearCafes.length > 0 ? (
            nearCafes.slice(0, 4).map((cafe) => (
              <div key={cafe.id} className={styles.vaccineCard}>
                <div className={styles.vaccineInfo}>
                  <h4 className={styles.vaccineName}>{cafe.name}</h4>
                  <p className={styles.cafeDescription}>{cafe.description}</p>
                  <a 
                    href={cafe.naver} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.searchButton}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C7.59 2 4 5.59 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 5.59 16.41 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z" />
                    </svg>
                    네이버 지도에서 바로 보기
                  </a>
                </div>
                <div className={styles.virusImage}>
                  <ImageWithSkeleton 
                    src={cafe.mainImage} 
                    alt="카페 이미지" 
                    width={80} 
                    height={80}
                  />
                </div>
              </div>
            ))
          ) : loading ? (
            <p className={styles.loadingText}>주변 카페를 찾는 중...</p>
          ) : (
            <p className={styles.noResultsText}>주변에 추천 카페를 찾을 수 없습니다.</p>
          )}
        </div>
      </div>
      
      <div className={styles.tabBar}>
        <Link href="/" className={`${styles.tabItem} ${styles.activeTab}`}>
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