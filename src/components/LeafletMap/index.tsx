'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './styles.module.scss';
import ImageWithSkeleton from '../ImageWithSkeleton';

// Place 인터페이스 추가
export interface Place {
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

interface LeafletMapProps {
  width?: string;
  height?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: Place[];
  onMarkerClick?: (place: Place) => void;
}

export default function LeafletMap({ 
  width = '100%',
  height = '300px',
  lat = 37.5665, 
  lng = 126.9780, 
  zoom = 12,
  markers = [],
  onMarkerClick
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      // 지도 인스턴스 저장
      mapInstanceRef.current = map;

      // 기존 마커 제거
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // 카페 마커들 추가
      if (markers && markers.length > 0) {
        const bounds = L.latLngBounds([]);

        markers.forEach(place => {
          const marker = L.marker([place.lat, place.lng]).addTo(map);
          marker.bindPopup(`<b>${place.name}</b><br>${place.description}`);
          
          // 마커 클릭 이벤트 처리
          if (onMarkerClick) {
            marker.on('click', () => {
              onMarkerClick(place);
            });
          }

          // 마커 참조 저장
          markersRef.current.push(marker);
          // 지도 영역 확장
          bounds.extend([place.lat, place.lng]);
        });

        // 모든 마커가 보이도록 지도 영역 조정
        if (markers.length > 1) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } else {
        // 기본 마커 추가 (카페 마커가 없을 경우)
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup('선택한 위치').openPopup();
        markersRef.current.push(marker);
      }

      // 현재 위치 표시 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // 현재 위치에 마커 생성 (map이 정의되었음을 확인)
            if (mapInstanceRef.current) {
              const userMarker = L.circleMarker([userLat, userLng], {
                radius: 8,
                fillColor: '#4393F7',
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
              }).addTo(mapInstanceRef.current);
              
              userMarker.bindPopup('내 위치');
            }
          },
          (error) => {
            console.error('위치 정보를 가져오는 데 실패했습니다:', error);
          }
        );
      }

      // 지도 리사이징 처리
      setTimeout(() => {
        map.invalidateSize();
        setIsLoading(false);
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
  }, [lat, lng, zoom, markers, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      className={styles.mapContainer} 
      style={{ width, height }}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
    </div>
  );
} 