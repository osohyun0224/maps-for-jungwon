"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className={styles.header}>
      <h1>지도 장소 앱</h1>
      <nav className={styles.nav}>
        <Link 
          href="/home" 
          className={pathname === "/home" ? styles.active : ""}
        >
          홈
        </Link>
        <Link 
          href="/map" 
          className={pathname === "/map" ? styles.active : ""}
        >
          지도
        </Link>
        <Link 
          href="/places" 
          className={pathname === "/places" ? styles.active : ""}
        >
          장소 목록
        </Link>
      </nav>
    </header>
  );
} 