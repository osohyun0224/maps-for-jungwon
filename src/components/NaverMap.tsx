"use client";

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  places?: {
    id: number;
    name: string;
    lat: number;
    lng: number;
  }[];
  onMarkerClick?: (placeId: number) => void;
}

export default function NaverMap({ 
  lat = 37.551168, 
  lng = 126.988228, 
  zoom = 15,
  places = [],
  onMarkerClick
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("NaverMap useEffect 실행");
    console.log("window.naver 존재 여부:", !!window.naver);
    
    if (!mapRef.current) {
      console.error("mapRef.current가 없습니다.");
      return;
    }
    
    if (!window.naver) {
      console.error("window.naver가 없습니다. 네이버 맵 API가 로드되지 않았을 수 있습니다.");
      return;
    }

    try {
      console.log("네이버 맵 인스턴스 생성 시도");
      const location = new window.naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: location,
        zoom: zoom,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        }
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);
      console.log("네이버 맵 인스턴스 생성 성공");
      
      // 중심 위치 마커 생성
      const mainMarker = new window.naver.maps.Marker({
        position: location,
        map: map,
        icon: {
          content: `
            <div style="
              background-color: #1E88E5;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            "></div>
          `,
          anchor: new window.naver.maps.Point(10, 10)
        }
      });
      
      // 장소 마커들 생성
      if (places && places.length > 0) {
        places.forEach(place => {
          const placePosition = new window.naver.maps.LatLng(place.lat, place.lng);
          const marker = new window.naver.maps.Marker({
            position: placePosition,
            map: map,
            title: place.name,
            icon: {
              content: `
                <div style="
                  background-color: #FF5252;
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  border: 2px solid white;
                  box-shadow: 0 2px 3px rgba(0,0,0,0.3);
                "></div>
              `,
              anchor: new window.naver.maps.Point(8, 8)
            }
          });
          
          // 마커 클릭 이벤트
          if (onMarkerClick) {
            window.naver.maps.Event.addListener(marker, 'click', () => {
              onMarkerClick(place.id);
            });
          }
        });
      }
      
      return () => {
        // 지도 인스턴스 정리 (선택적)
        if (map) {
          map.destroy();
        }
      };
    } catch (error) {
      console.error("네이버 맵 생성 중 오류 발생:", error);
    }
  }, [lat, lng, zoom, places, onMarkerClick]);

  return <div ref={mapRef} style={{ width: '100%', height: '200px', minHeight: '200px', border: '1px solid #ddd' }} />;
} 