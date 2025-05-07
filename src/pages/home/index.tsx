'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
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
  images: string[];
  naver: string;
}

// 맵 컴포넌트에서 가져온 장소 데이터
const cafesData: Place[] = [
  {
    id: 4,
    name: "본지르르 성수",
    lat: 37.549347883,
    lng: 127.054658034,
    description: "성수동에서 작업하기 좋은 카페, 널찍한 자리와 조용한 분위기",
    rating: 4.6,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/sungsu_vonzurr1.png",
    images: [
      "/sungsu_vonzurr1.png",
      "/sungsu_vonzurr2.png",
      "/sungsu_vonzurr3.png",
    ],
    naver: "https://naver.me/xdpFyokt"
  },
  {
    id: 5,
    name: "포레스트 서울숲",
    lat: 37.546801119,
    lng: 127.04073112,
    description:
      "서울숲 초근접, 빙수와 커피, 널찍한 자리 카공하기도 좋고 빈백에 누워서 쉬기도 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피", "빙수"],
    mainImage: "/forest_seoul_1.png",
    images: [
      "/forest_seoul_1.png",
      "/forest_seoul_2.png",
      "/forest_seoul_3.png",
      "/forest_seoul_4.png",
    ],
    naver: "https://naver.me/FLyT1IsO"
  },
  {
    id: 6,
    name: "오베뉴 한남",
    lat: 37.53519945,
    lng: 127.010243539,
    description:
      "통창 테라스, 날씨 좋은 날 가기 좋은 카페, 널찍한 자리와 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/ovenu_hannam_1.png",
    images: [
      "/ovenu_hannam_1.png",
      "/ovenu_hannam_2.png",
      "/ovenu_hannam_3.png",
      "/ovenu_hannam_4.png",
      "/ovenu_hannam_5.png",
    ],
    naver: "https://naver.me/GALRg97X"
  },
  {
    id: 7,
    name: "로우커피스탠드 뚝섬",
    lat: 37.54713165462201,
    lng: 127.0466312899477,
    description: "테이크아웃 전문점, 바닐라 라떼가 맛있는 곳, 저렴한 커피 가격",
    rating: 4.5,
    tags: ["커피", "데이트"],
    mainImage: "/low_stand1.png",
    images: ["/low_stand1.png", "/low_stand_2.png"],
    naver: "https://naver.me/GeUR9SqN"
  },
  {
    id: 8,
    name: "쇼트브레드 의정부 민락",
    lat: 37.746799244,
    lng: 127.099873165,
    description: "빵이 맛있는 곳, 널찍한 공간, 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "베이커리", "데이트", "커피"],
    mainImage: "/shorts_bread_1.png",
    images: ["/shorts_bread_1.png", "/shorts_bread_2.png"],
    naver: "https://naver.me/5k7fJRrj"
  },
  {
    id: 9,
    name: "파블로앤던커피 의정부 민락",
    lat: 37.74654569229999,
    lng: 127.09553664518879,
    description:
      "식사와 베이커리, 카페를 모두 즐길 수 있는 곳 널찍한 자리 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "베이커리", "데이트", "커피"],
    mainImage: "/pablo_1.png",
    images: ["/pablo_1.png", "/pablo_2.png"],
    naver: "https://naver.me/xxY2zE8q"
  },
  {
    id: 10,
    name: "카페 빔프 의정부 민락",
    lat: 37.746467197,
    lng: 127.096325224,
    description:
      "댕댕이가 있는 카페, 장난스러운 소품들이 가득한 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/bimp_1.png",
    images: ["/bimp_1.png", "/bimp_2.jpg"],
    naver: "https://naver.me/GV29Wmze"
  },
  {
    id: 11,
    name: "나루터 송리단길",
    lat: 37.74651225,
    lng: 127.095550362,
    description: "송리단길 초근접, 널찍한 자리 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/narut_1.png",
    images: ["/narut_1.png", "/narut_2.png"],
    naver: "https://naver.me/F1rxlzl9"
  },
  {
    id: 12,
    name: "씨엘트리 송리단길",
    lat: 37.509559963,
    lng: 127.109418759,
    description: "뷰가 좋고, 커피가 맛있는 카공하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/cltree_3.png",
    images: ["/cltree_1.png", "/cltree_2.png", "/cltree_3.png"],
    naver: "https://naver.me/x8tpEpVWㅂ"
  },
  {
    id: 13,
    name: "바이러닉 에스프레소 바 성수점",
    lat: 37.54633912,
    lng: 127.0490827,
    description: "모던한 분위기에서 커피를 즐길 수 있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/byrunic_1.png",
    images: ["/byrunic_1.png", "/byrunic_2.png"],
    naver: "https://naver.me/Fafyi8Gq"
  },
  {
    id: 14,
    name: "어라운드 데이 서울숲",
    lat: 37.546858678,
    lng: 127.041259584,
    description:
      "가정집을 개조해 화이트톤의 개방감 있는 분위기의 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/around_day_1.png",
    images: [
      "/around_day_1.png",
      "/around_day_3.png",
    ],
    naver: "https://naver.me/57VZrubZ"
  },
  
  {
    id: 15,
    name: "카페 할아버지공장 성수",
    lat: 37.540993413,
    lng: 127.055242863,
    description:
      "맛있는 빵과 커피를 즐기며 큰 실내외공간에서 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피"],
    mainImage: "/grandpa_1.png",
    images: ["/grandpa_1.png", "/grandpa_2.png", "/grandpa_3.png"],
    naver: "https://naver.me/GDa2dyWW"
  },
  {
    id: 16,
    name: "코히루 송리단길",
    lat: 37.510480019,
    lng: 127.054825429,
    description:
      "일본 분위기의 아기자기한 분위기와 커피가 맛있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피", "디저트"],
    mainImage: "/koheru_1.png",
    images: ["/koheru_1.png", "/koheru_2.png", "/koheru_3.png"],
    naver: "https://naver.me/5chuGGiR"
  },
  {
    id: 17,
    name: "카페 사브레 송리단길",
    lat: 37.546858678,
    lng: 127.041259584,
    description: "가정집을 개조한 인테리어로 데이트 및 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "데이트", "커피", "디저트"],
    mainImage: "/sab_1.jpg",
    images: ["/sab_1.jpg", "/sab_2.jpg", "/sab_3.jpg"],
    naver: "https://naver.me/G0DXUJNn"
  },
  {
    id: 18,
    name: "더 노벰버 라운지 하남풍산점",
    lat: 37.555195733,
    lng: 127.20571837,
    description: "24시간 넓은 통창 뷰와 좌석, 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/hanam_1.png",
    images: ["/hanam_1.png", "/hanam_2.png"],
    naver: "https://naver.me/G7V4GsMu"
  },
  {
    id: 19,
    name: "오브제 커피 하남미사",
    lat: 37.561434896,
    lng: 127.191185701,
    description: "늦게까지 하는 아늑한 분위기에 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/object_1.png",
    images: ["/object_1.png", "/object_2.png", "/object_3.png"],
    naver: "https://naver.me/FEUpqHi5"
  },
  {
    id: 20,
    name: "뜨아아커피집 왕십리",
    lat: 37.560300966,
    lng: 127.035102353,
    description: "고즈넉한 한옥 인테리어에서 즐기는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/ddaaa_1.png",
    images: ["/ddaaa_1.png", "/ddaaa_2.png", "/ddaaa_3.png"],
    naver: "https://naver.me/G4WoWwaS"
  },
  {
    id: 21,
    name: "갈십리 왕십리",
    lat:37.558925815,
    lng: 127.040447249,
    description: "귀여운 고양이와 일본 빈티지 감성으로 채워진 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/gal_1.jpg",
    images: ["/gal_1.jpg", "/gal_2.jpg", "/gal_3.jpg"],
    naver: "https://naver.me/GZZuXi2n"
  },
  {
    id: 22,
    name: "어질인 왕십리",
    lat:37.56136111366082,
    lng: 127.03954505441635,
    description: "맛있는 디저트와 아기자기한 인테리어와 함께 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/in_1.png",
    images: ["/in_1.png", "/in_2.png", "/in_3.png"],
    naver: "https://naver.me/GPdoMFSO"
  },
  {
    id: 23,
    name: "퀜치 커피 합정",
    lat:37.55401268388709,
    lng: 126.91284725933576,
    description: "모던한 우드톤 분위기에 커피가 정말 맛있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/quench_1.png",
    images: ["/quench_1.png", "/quench_2.png", "/quench_3.png"],
    naver: "https://naver.me/FK5vi2LB"
  },
  {
    id: 24,
    name: "노띵크 연남",
    lat:37.56196974001513,
    lng: 126.92695792449092,
    description: "편안한 분위기과 커피가 맛있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/nothink_1.png",
    images: ["/nothink_1.png", "/nothink_2.png", "/nothink_3.png"],
    naver: "https://naver.me/5PVaUjN3"
  },
  {
    id: 25,
    name: "나이스워크투데이 연남",
    lat:37.54823636363809,
    lng: 126.9397714783147,
    description: "쾌적한 분위기와 카페 이름에 걸맞게 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/nice_1.png",
    images: ["/nice_1.png", "/nice_2.png", "/nice_3.png"],
    naver: "https://naver.me/FV7Ykqcl"
  },
  {
    id: 26,
    name: "메모러블모먼트 둔촌",
    lat:37.523490661,
    lng: 127.061846472,
    description: "세련되고 블랙톤 인테리어가 멋진, 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/dunch_1.png",
    images: ["/dunch_1.png"],
    naver: "https://naver.me/GV2t5ViM"
  },
  {
    id: 27,
    name: "VGG 송리단길",
    lat:37.51116294020035,
    lng: 127.10742285324267,
    description: "주황색 톤의 모던한 인테리어가 멋진, 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/vgg_1.png",
    images: ["/vgg_1.png", "/vgg_2.png"],
    naver: "https://naver.me/xiquO1WL"
  },
  {
    id: 28,
    name: "텟어텟 봉은사",
    lat:37.513508392,
    lng:127.061846472,
    description: "베이커리가 맛있는 코엑스 근처 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/tat_1.png",
    images: ["/tat_1.png", "/tat_2.png", "/tat_3.png"],
    naver: "https://naver.me/FQVGAyDg"
  },
  {
    id: 29,
    name: "누누커피 코엑스",
    lat:37.51259679590774,
    lng:127.05882787833228,
    description: "누누커피가 절대적으로 맛있는 코엑스 내부 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/in_1.png",
    images: ["/in_1.png", "/in_2.png", "/in_3.png"],
    naver: "https://naver.me/I55a9Y0s"
  },
  {
    id: 30,
    name: "한남 작업실",
    lat:37.536527911096,
    lng:126.99876064931556,
    description: "정원 인테리어와 커피가 정말 맛있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/hannam_work_1.png",
    images: ["/hannam_work_1.png", "/hannam_work_2.png", "/hannam_work_3.png"],
    naver: "https://naver.me/Fio7BqKq"
  },
  {
    id: 31,
    name: "mtl 한남",
    lat:37.53714098665077,
    lng:126.99904436530372,
    description: "모던한 우드톤, 넓은 통창에다가 베이커리가 맛있는 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/mtl_1.png",
    images: ["/mtl_1.png", "/mtl_2.png", "/mtl_3.png"],
    naver: "https://naver.me/xoH8AtfT"
  },
  {
    id: 32,
    name: "맥심 플랜트 한남",
    lat:37.536953564,
    lng:127.001008565,
    description: "다양한 커피 종류를 맛볼 수 있고, 4층까지의 넓은 자석으로 작업하기 좋은 카페",
    rating: 4.5,
    tags: ["카페", "카공"],
    mainImage: "/maxim_1.png",
    images: ["/maxim_1.png", "/maxim_2.png", "/maxim_3.png"],
    naver: "https://naver.me/IFgdNOZo"
  }
];

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
      const cafesWithDistance = cafesData.map(cafe => ({
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