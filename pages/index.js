import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          欢迎来到我的故事滚动应用
        </h1>

        <p className={styles.description}>
          点击下面的链接开始体验故事滚动效果。
        </p>

        <div className={styles.grid}>
          <Link href="/story-scroll" className={styles.card}>
            <h2>开始故事 &rarr;</h2>
            <p>体验 GSAP 和 ScrollTrigger 驱动的动画故事。</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            {/* 在这里可以放置 Vercel 的 Logo 或者其他图片 */}
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            Next.js & GSAP
          </span>
        </a>
      </footer>
    </div>
  );
} 