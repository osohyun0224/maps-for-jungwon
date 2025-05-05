import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface NaverMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function NaverMap({ 
  width = '100%',
  height = '300px',
  lat = 37.3595704, 
  lng = 127.105399, 
  zoom = 12
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        console.error('네이버 지도 API를 찾을 수 없습니다');
        return;
      }

      try {
        const mapOptions = {
          center: new window.naver.maps.LatLng(lat, lng),
          zoom: zoom,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT
          }
        };

        const map = new window.naver.maps.Map(mapRef.current, mapOptions);
        console.log('네이버 지도 인스턴스 생성 성공', map);

        // 마커 추가
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map: map
        });

        // 현재 위치 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPosition = new window.naver.maps.LatLng(
                position.coords.latitude, 
                position.coords.longitude
              );
              
              // 현재 위치에 마커 생성
              const userMarker = new window.naver.maps.Marker({
                position: userPosition,
                map: map,
                icon: {
                  content: '<div style="width: 14px; height: 14px; background-color: #5F85DB; border-radius: 50%; border: 2px solid white;"></div>',
                  anchor: new window.naver.maps.Point(7, 7)
                }
              });
              
              // 현재 위치에 인포윈도우 표시
              const infoWindow = new window.naver.maps.InfoWindow({
                content: '<div style="padding:5px;font-size:12px;">내 위치</div>'
              });
              infoWindow.open(map, userMarker);
            },
            (error) => {
              console.error('위치 정보를 가져오는 데 실패했습니다:', error);
            }
          );
        }
      } catch (error) {
        console.error('네이버 지도 초기화 중 오류 발생:', error);
      }
    };

    // 네이버 맵 스크립트가 로드되었는지 확인하고 초기화
    if (window.naver && window.naver.maps) {
      console.log('네이버 맵 API가 이미 로드되어 있습니다.');
      initMap();
    } else {
      console.log('네이버 맵 API를 로드합니다.');
      const script = document.createElement('script');
      script.onload = () => {
        console.log('네이버 맵 API 로드 완료');
        initMap();
      };
      script.onerror = (error) => {
        console.error('네이버 맵 API 로드 실패:', error);
      };
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`;
      document.head.appendChild(script);
    }
  }, [lat, lng, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={styles.mapContainer} 
      style={{ width, height }}
    />
  );
} 