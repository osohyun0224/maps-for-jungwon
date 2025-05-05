import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

export default function Header() {
  const router = useRouter();
  
  return (
    <header className={styles.header}>
      <h1>지도 장소 앱</h1>
      <nav className={styles.nav}>
        <Link href="/" className={router.pathname === "/" ? styles.active : ""}>
          홈
        </Link>
        <Link href="/map" className={router.pathname === "/map" ? styles.active : ""}>
          지도
        </Link>
        <Link href="/places" className={router.pathname === "/places" ? styles.active : ""}>
          장소 목록
        </Link>
      </nav>
    </header>
  );
} 