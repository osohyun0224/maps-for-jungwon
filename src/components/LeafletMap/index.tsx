'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './styles.module.scss';
import ImageWithSkeleton from '../ImageWithSkeleton';

// Place 인터페이스
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

// 지도 중심 조정을 위한 컴포넌트
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// 사용자 위치를 표시하는 컴포넌트
function UserLocation() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('위치 정보를 가져오는 데 실패했습니다:', error);
        }
      );
    }
  }, [map]);

  return position ? (
    <CircleMarker
      center={position}
      radius={8}
      pathOptions={{
        fillColor: '#4393F7',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
      }}
    >
      <Popup>내 위치</Popup>
    </CircleMarker>
  ) : null;
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
  const [isLoading, setIsLoading] = useState(true);

  // 기본 마커 아이콘 설정
  useEffect(() => {
    // Leaflet의 기본 아이콘 경로 문제 해결
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={styles.mapContainer} style={{ width, height, position: 'relative' }}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        whenReady={() => setIsLoading(false)}
      >
        <ChangeView center={[lat, lng]} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((place) => (
          <Marker 
            key={place.id} 
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(place);
              },
            }}
          >
            <Popup>
              <div>
                <strong>{place.name}</strong>
                <p>{place.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <UserLocation />
      </MapContainer>
    </div>
  );
} 