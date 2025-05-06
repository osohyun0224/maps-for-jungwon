'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
import Link from 'next/link';
import styles from './styles.module.scss';

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
  naver: string; // 네이버 지도 링크
}

// 예시 장소 데이터
const placesData: Place[] = [
  {
    id: 4,
    name: "본지르르 성수",
    lat: 37.549347883,
    lng: 127.054658034,
    description: "성수동에서 작업하기 좋은 카페, 널찍한 자리와 조용한 분위기",
    rating: 4.6,
    tags: ["카페", "성수동", "조용한", "넓은공간", "작업하기좋은"],
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
    tags: ["카페", "서울숲", "빙수", "빈백", "휴식공간"],
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
    tags: ["카페", "한남동", "테라스", "통창", "뷰맛집"],
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
    tags: ["커피", "테이크아웃", "바닐라라떼", "가성비", "뚝섬"],
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
    tags: ["카페", "베이커리", "의정부", "넓은공간", "작업하기좋은"],
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
    tags: ["카페", "베이커리", "식사", "의정부", "넓은공간"],
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
    tags: ["카페", "반려동물", "소품샵", "의정부", "아기자기한"],
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
    tags: ["카페", "송리단길", "넓은공간", "작업하기좋은", "핫플레이스"],
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
    tags: ["카페", "뷰맛집", "맛있는커피", "송리단길", "작업하기좋은"],
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
    tags: ["카페", "성수동", "모던한", "에스프레소", "작업하기좋은"],
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
    tags: ["카페", "서울숲", "화이트톤", "개방감", "리모델링"],
    mainImage: "/aroundday_1.png",
    images: [
      "/aroundday_1.png",
      "/aroundday_2.png",
      "/aroundday_3.png",
      "/aroundday_4.png",
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
    tags: ["카페", "베이커리", "성수동", "넓은공간", "실내외공간"],
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
    tags: ["카페", "일본감성", "아기자기한", "송리단길", "맛있는커피"],
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
    tags: ["카페", "리모델링", "데이트", "송리단길", "작업하기좋은"],
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
    tags: ["카페", "24시간", "통창", "하남", "뷰맛집"],
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
    tags: ["카페", "늦은영업", "아늑한", "하남", "작업하기좋은"],
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
    tags: ["카페", "한옥", "고즈넉한", "왕십리", "작업하기좋은"],
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
    tags: ["카페", "고양이", "일본감성", "빈티지", "왕십리"],
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
    tags: ["카페", "디저트", "아기자기한", "왕십리", "작업하기좋은"],
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
    tags: ["카페", "우드톤", "모던한", "맛있는커피", "합정"],
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
    tags: ["카페", "편안한", "맛있는커피", "연남", "작업하기좋은"],
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
    tags: ["카페", "쾌적한", "작업하기좋은", "연남", "워크스페이스"],
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
    tags: ["카페", "블랙톤", "세련된", "둔촌동", "작업하기좋은"],
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
    tags: ["카페", "오렌지톤", "모던한", "송리단길", "작업하기좋은"],
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
    tags: ["카페", "베이커리", "코엑스", "봉은사", "작업하기좋은"],
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
    tags: ["카페", "맛있는커피", "코엑스", "실내", "작업하기좋은"],
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
    tags: ["카페", "정원", "맛있는커피", "한남동", "작업하기좋은"],
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
    tags: ["카페", "우드톤", "통창", "한남동", "베이커리"],
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
    tags: ["카페", "다양한커피", "멀티층", "한남동", "작업하기좋은"],
    mainImage: "/maxim_1.png",
    images: ["/maxim_1.png", "/maxim_2.png", "/maxim_3.png"],
    naver: "https://naver.me/IFgdNOZo"
  },
];

export default function DateIdeasPage() {
  const [filter, setFilter] = useState<'all' | 'indoor' | 'outdoor'>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalIdea, setModalIdea] = useState<DateIdea | null>(null);
  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  
  // 랜덤 인기 카페 5개 선택
  const getRandomTopCafes = (cafes: Place[], count: number) => {
    const shuffled = [...cafes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const topCafes = getRandomTopCafes(placesData, 5);
  
  // 카페를 지역별로 그룹화
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
      } else if (cafe.tags.includes('하남동')) {
        regions['하남/미사'].push(cafe);
      } else if (cafe.tags.includes('의정부')) {
        regions['의정부/민락'].push(cafe);
      } else if (cafe.tags.includes('한남동')) {
        regions['한남/이태원'].push(cafe);
      } else if (cafe.tags.includes('송리단길')) {
        regions['잠실/송리단길'].push(cafe);
      } else if (cafe.tags.includes('합정') || cafe.tags.includes('연남')) {
        regions['합정/연남'].push(cafe);
      } else if (cafe.tags.includes('봉은사') || cafe.tags.includes('코엑스')) {
        regions['봉은사/코엑스'].push(cafe);
      } else {
        regions['기타'].push(cafe);
      }
    });
    
    // 빈 지역 필터링
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
        {/* Top 5 인기 카페 */}
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
        
        {/* 지역별 카페 */}
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
      
      {/* 카페 상세 정보 모달 */}
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