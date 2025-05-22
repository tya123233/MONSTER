import Link from 'next/link';
import styles from '../styles/Home.module.css';
import GhostedTitle from '../components/GhostedTitle';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <GhostedTitle />
        </div>

        <Link href="/story-scroll" className={styles.startLink}>
          <span className={styles.startText}>Start</span>
          <span className={styles.arrowRight}>&rarr;</span>
        </Link>
      </main>
    </div>
  );
} 