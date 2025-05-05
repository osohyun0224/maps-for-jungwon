'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './styles.module.scss';

interface LeafletMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
}

export default function LeafletMap({ 
  width = '100%',
  height = '300px',
  lat = 37.5665, 
  lng = 126.9780, 
  zoom = 12
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Leaflet의 기본 아이콘 경로 문제 해결
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = defaultIcon;

    // 이미 인스턴스가 있으면 제거
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    try {
      // 지도 인스턴스 생성
      const map = L.map(mapRef.current).setView([lat, lng], zoom);
      
      // 타일레이어 추가 (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // 기본 마커 추가
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup('선택한 위치').openPopup();

      // 현재 위치 표시 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // 현재 위치에 마커 생성
            const userMarker = L.circleMarker([userLat, userLng], {
              radius: 8,
              fillColor: '#4393F7',
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 1
            }).addTo(map);
            
            userMarker.bindPopup('내 위치');
          },
          (error) => {
            console.error('위치 정보를 가져오는 데 실패했습니다:', error);
          }
        );
      }

      // 인스턴스 참조 저장
      mapInstanceRef.current = map;

      // 지도 리사이징 처리
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

    } catch (error) {
      console.error('지도 초기화 중 오류 발생:', error);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
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