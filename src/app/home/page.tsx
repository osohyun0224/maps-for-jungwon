import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>장소조회</h1>
        <div className={styles.notification}>
          <Image 
            src="/notification.svg" 
            alt="알림" 
            width={24} 
            height={24}
          />
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.subTitle}>서울 내 데이트 장소 기준</p>
          <h2 className={styles.title}>
            지금 가볼만한<br />
            2가지 데이트 장소가 있어요
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
          <Image 
            src="/white-bear.png" 
            alt="백곰 캐릭터" 
            width={220} 
            height={220}
            className={styles.bearImage}
            priority
          />
        </div>
        
        <div className={styles.welcome}>
          <h3 className={styles.welcomeTitle}>정원님!</h3>
          <p className={styles.welcomeText}>오늘 가볼만한 데이트 장소를 확인해보세요!</p>
        </div>
        
        <div className={styles.vaccineList}>
          <div className={styles.vaccineCard}>
            <div className={styles.vaccineInfo}>
              <p className={styles.ageInfo}>연인 이용자 중 N%가 추천했어요</p>
              <h4 className={styles.vaccineName}>남산 서울타워</h4>
              <Link href="/map" className={styles.searchButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
                </svg>
                주변 장소 조회
              </Link>
            </div>
            <div className={styles.virusImage}>
              <Image 
                src="/place-1.svg" 
                alt="장소 이미지" 
                width={80} 
                height={80}
              />
            </div>
          </div>
          
          <div className={styles.vaccineCard}>
            <div className={styles.vaccineInfo}>
              <p className={styles.ageInfo}>연인 이용자 중 N%가 추천했어요</p>
              <h4 className={styles.vaccineName}>한강 공원</h4>
              <Link href="/map" className={styles.searchButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
                </svg>
                주변 장소 조회
              </Link>
            </div>
            <div className={styles.virusImage}>
              <Image 
                src="/place-2.svg" 
                alt="장소 이미지" 
                width={80} 
                height={80}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className={styles.tabBar}>
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
      </footer>
    </div>
  );
} 