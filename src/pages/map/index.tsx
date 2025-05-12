"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageWithSkeleton from '../../components/ImageWithSkeleton';
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { Place } from "../../types";
import { placesData } from "../../data/places";

const LeafletMap = dynamic(() => import("../../components/LeafletMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>지도를 불러오는 중...</div>,
});

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [mapZoom, setMapZoom] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  const [mapMarkers, setMapMarkers] = useState<Place[]>([]);
  const [isViewingAll, setIsViewingAll] = useState(true);

  // 초기 로딩 시 모든 카페 좌표를 지도에 표시
  useEffect(() => {
    setMapMarkers(placesData);
  }, []);

  // 검색어에 따른 필터링된 장소
  const filteredPlaces = searchTerm
    ? placesData.filter(
        (place) =>
          place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : placesData;

  // 장소 선택 시 지도 중심 변경 및 해당 카페만 표시
  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.lat, lng: place.lng });
    setMapZoom(16);
    setMapMarkers([place]); // 선택된 카페만 지도에 표시
    setIsViewingAll(false);
    // 스크롤을 맨 위로 부드럽게 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 모든 카페 보기
  const handleViewAllPlaces = () => {
    setMapMarkers(placesData);
    setMapZoom(11);
    setIsViewingAll(true);
    // 현재 선택된 카페는 유지
  };

  // 모달 열기
  const openModal = (place: Place) => {
    setModalPlace(place);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>지도로 살펴보기</h1>
      </div>

      <div className={styles.main}>
        <div className={styles.mapControlBar}>
          {!isViewingAll && (
            <button 
              className={styles.viewAllButton}
              onClick={handleViewAllPlaces}
            >
              모든 카페 보기
            </button>
          )}
        </div>
        <div className={styles.mapContainer}>
          <LeafletMap
            lat={mapCenter.lat}
            lng={mapCenter.lng}
            zoom={mapZoom}
            height="300px"
            markers={mapMarkers}
            onMarkerClick={handlePlaceSelect}
          />
        </div>

        {selectedPlace && (
          <div className={styles.placeDetails}>
            <div className={styles.placeHeader}>
              <h2>{selectedPlace.name}</h2>
              <div className={styles.rating}>
                <span className={styles.ratingStars}>
                  {"★".repeat(Math.floor(selectedPlace.rating))}
                  {"☆".repeat(5 - Math.floor(selectedPlace.rating))}
                </span>
                <span className={styles.ratingNumber}>
                  {selectedPlace.rating}
                </span>
              </div>
            </div>
            <p className={styles.placeDescription}>
              {selectedPlace.description}
            </p>
            <div className={styles.placeTags}>
              {selectedPlace.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.moreDetailsButton}
                onClick={() => openModal(selectedPlace)}
              >
                더 많은 사진 보기
              </button>
              <a 
                href={selectedPlace.naver} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.naverMapButton}
              >
                네이버 지도에서 보기
              </a>
            </div>
          </div>
        )}

        <div className={styles.placesList}>
          <h3 className={styles.placesListTitle}>추천 장소</h3>
          <div className={styles.placesGrid}>
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className={`${styles.placeCard} ${
                  selectedPlace?.id === place.id ? styles.selectedCard : ""
                }`}
                onClick={() => handlePlaceSelect(place)}
              >
                <div className={styles.placeCardContent}>
                  <div className={styles.placeMainInfo}>
                    <div className={styles.placeImageContainer}>
                      <div className={styles.placeImagePlaceholder}>
                        <ImageWithSkeleton
                          src={place.mainImage}
                          alt={place.name}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                    <div className={styles.placeInfo}>
                      <h4 className={styles.placeName}>{place.name}</h4>
                      <div className={styles.placeTags}>
                        {place.tags.slice(0, 4).map((tag, index) => (
                          <span key={index} className={styles.tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.placeImagesContainer}>
                  {place.images.slice(0, 5).map((image, index) => (
                    <div key={index} className={styles.placeImageItem}>
                      <ImageWithSkeleton
                        src={image}
                        alt={`${place.name} 이미지 ${index + 1}`}
                        width={60}
                        height={60}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && modalPlace && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>{modalPlace.name}</h2>
            <p className={styles.modalDescription}>{modalPlace.description}</p>

            <div className={styles.imagesGrid}>
              {modalPlace.images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <ImageWithSkeleton
                    src={image}
                    alt={`${modalPlace.name} 이미지 ${index + 1}`}
                    width={300}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.modalTags}>
              {modalPlace.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className={styles.modalRating}>
              <span className={styles.ratingStars}>
                {"★".repeat(Math.floor(modalPlace.rating))}
                {"☆".repeat(5 - Math.floor(modalPlace.rating))}
              </span>
              <span className={styles.ratingNumber}>{modalPlace.rating}</span>
            </div>
            
            <div className={styles.modalButtonGroup}>
              <a 
                href={modalPlace.naver} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.naverMapButton}
              >
                네이버 지도에서 보기
              </a>
            </div>
          </div>
        </div>
      )}

      <div className={styles.tabBar}>
        <Link href="/" className={styles.tabItem}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
              fill="currentColor"
            />
          </svg>
          <span>홈</span>
        </Link>
        <Link href="/map" className={`${styles.tabItem} ${styles.activeTab}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C7.59 2 4 5.59 4 10C4 15.5 12 22 12 22C12 22 20 15.5 20 10C20 5.59 16.41 2 12 2ZM12 12.5C10.62 12.5 9.5 11.38 9.5 10C9.5 8.62 10.62 7.5 12 7.5C13.38 7.5 14.5 8.62 14.5 10C14.5 11.38 13.38 12.5 12 12.5Z"
              fill="currentColor"
            />
          </svg>
          <span>카페 지도</span>
        </Link>
        <Link href="/date" className={styles.tabItem}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
              fill="currentColor"
            />
          </svg>
          <span>인기 카페</span>
        </Link>
        <Link href="/cafe" className={styles.tabItem}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 3H4V10C4 15.55 7.84 20.74 20 20.74V3ZM7 7H17V9H7V7Z"
              fill="currentColor"
            />
          </svg>
          <span>안내 사항</span>
        </Link>
      </div>
    </div>
  );
}

