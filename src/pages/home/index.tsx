'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

// 날씨 데이터 타입 정의
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

// 장소 데이터 정의 (실내/실외 구분 추가)
const places = [
  {
    id: 1,
    name: '남산 서울타워',
    description: '서울의 상징적인 랜드마크',
    percentage: 85,
    image: '/place-1.svg',
    isOutdoor: true
  },
  {
    id: 2,
    name: '한강 공원',
    description: '여유로운 산책을 즐길 수 있는 공원',
    percentage: 78,
    image: '/place-2.svg',
    isOutdoor: true
  },
  {
    id: 3,
    name: '코엑스 아쿠아리움',
    description: '다양한 해양 생물을 만나볼 수 있는 곳',
    percentage: 72,
    image: '/place-1.svg',
    isOutdoor: false
  },
  {
    id: 4,
    name: '스타필드 코엑스몰',
    description: '쇼핑과 문화를 함께 즐길 수 있는 공간',
    percentage: 68,
    image: '/place-2.svg',
    isOutdoor: false
  }
];

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 날씨에 따른 장소 필터링
  const recommendedPlaces = weather 
    ? places.filter(place => {
        const isGoodWeather = ['Clear', 'Clouds'].includes(weather.weather[0].main);
        return isGoodWeather ? place.isOutdoor : !place.isOutdoor;
      })
    : places.slice(0, 2); // 날씨 데이터가 없으면 기본 2개만 표시

  useEffect(() => {
    async function fetchWeather() {
      try {
        // 서울 좌표 (위도, 경도)
        const lat = 37.5665;
        const lon = 126.9780;
        
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
    
    fetchWeather();
  }, []);

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

  // 날씨에 따른 추천 메시지
  const getWeatherRecommendation = (weatherMain: string) => {
    if (['Clear', 'Clouds'].includes(weatherMain)) {
      return '오늘은 날씨가 좋아요! 야외 데이트는 어떨까요?';
    } else if (['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherMain)) {
      return '비가 오고 있어요. 실내 데이트를 추천해요!';
    } else if (weatherMain === 'Snow') {
      return '눈이 내려요! 로맨틱한 실내 데이트 어떠세요?';
    } else {
      return '오늘 날씨에 맞는 데이트 장소를 확인해보세요!';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>장소조회</h1>
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
        {/* 날씨 정보 섹션 */}
        <div className={styles.weatherSection}>
          {loading ? (
            <p className={styles.weatherLoading}>날씨 정보를 불러오는 중...</p>
          ) : error ? (
            <p className={styles.weatherError}>{error}</p>
          ) : weather && (
            <div className={styles.weatherInfo}>
              <div className={styles.weatherIcon}>
                <Image 
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  width={64}
                  height={64}
                />
              </div>
              <div className={styles.weatherDetails}>
                <h3 className={styles.weatherLocation}>{weather.name}</h3>
                <p className={styles.weatherTemp}>{Math.round(weather.main.temp)}°C</p>
                <p className={styles.weatherDesc}>
                  {getWeatherKoreanDesc(weather.weather[0].main, weather.weather[0].description)}
                </p>
                <p className={styles.weatherRecommend}>
                  {getWeatherRecommendation(weather.weather[0].main)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.intro}>
          <p className={styles.subTitle}>서울 내 데이트 장소 기준</p>
          <h2 className={styles.title}>
            {weather && ['Clear', 'Clouds'].includes(weather.weather[0].main)
              ? '날씨가 좋은 오늘,\n야외 데이트 어떠세요?'
              : weather
                ? '오늘 같은 날씨엔\n실내 데이트가 좋아요'
                : '지금 가볼만한\n2가지 데이트 장소가 있어요'
            }
          </h2>
        </div>
        
        <div className={styles.bearContainer}>
          <Image 
            src="/heart.svg" 
            alt="하트" 
            width={120} 
            height={120}
            className={styles.syringeImage}
          />
        </div>
        
        <div className={styles.welcome}>
          <h3 className={styles.welcomeTitle}>정원님!</h3>
          <p className={styles.welcomeText}>
            {weather 
              ? `${Math.round(weather.main.temp)}°C, ${getWeatherKoreanDesc(weather.weather[0].main, weather.weather[0].description)} 날씨에 맞는 장소를 확인해보세요!`
              : '오늘 가볼만한 데이트 장소를 확인해보세요!'}
          </p>
        </div>
        
        <div className={styles.vaccineList}>
          {recommendedPlaces.slice(0, 2).map((place) => (
            <div key={place.id} className={styles.vaccineCard}>
              <div className={styles.vaccineInfo}>
                <p className={styles.ageInfo}>연인 이용자 중 {place.percentage}%가 추천했어요</p>
                <h4 className={styles.vaccineName}>{place.name}</h4>
                <Link href="/map" className={styles.searchButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
                  </svg>
                  주변 장소 조회
                </Link>
              </div>
              <div className={styles.virusImage}>
                <Image 
                  src={place.image} 
                  alt="장소 이미지" 
                  width={80} 
                  height={80}
                />
              </div>
            </div>
          ))}
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