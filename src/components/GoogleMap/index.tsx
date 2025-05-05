'use client';

import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface GoogleMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function GoogleMap({ 
  width = '100%',
  height = '300px',
  lat = 37.5665, 
  lng = 126.9780, 
  zoom = 12
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.google || !window.google.maps) {
        console.error('구글 지도 API를 찾을 수 없습니다');
        return;
      }

      try {
        const mapOptions = {
          center: { lat, lng },
          zoom: zoom,
          zoomControl: true,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        console.log('구글 지도 인스턴스 생성 성공');

        // 기본 마커 추가
        new window.google.maps.Marker({
          position: { lat, lng },
          map: map
        });

        // 현재 위치 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              // 현재 위치에 마커 생성
              const userMarker = new window.google.maps.Marker({
                position: userPosition,
                map: map,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: '#4393F7',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2
                }
              });
              
              // 인포윈도우 추가
              const infoWindow = new window.google.maps.InfoWindow({
                content: '<div style="padding:5px;font-size:12px;">내 위치</div>'
              });
              
              userMarker.addListener('click', () => {
                infoWindow.open(map, userMarker);
              });
            },
            (error) => {
              console.error('위치 정보를 가져오는 데 실패했습니다:', error);
            }
          );
        }
      } catch (error) {
        console.error('구글 지도 초기화 중 오류 발생:', error);
      }
    };

    // 구글 맵 스크립트가 로드되었는지 확인
    if (window.google && window.google.maps) {
      console.log('구글 맵 API가 이미 로드되어 있습니다.');
      initMap();
    } else {
      console.log('구글 맵 API 로드를 기다리는 중...');
      // 스크립트는 _app.tsx에서 로드하므로 여기서는 콜백 등록만
      window.initMap = initMap;
    }

    return () => {
      // 컴포넌트 언마운트 시 전역 콜백 제거
      if (window.initMap === initMap) {
        window.initMap = undefined;
      }
    };
  }, [lat, lng, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={styles.mapContainer} 
      style={{ width, height }}
    />
  );
} 