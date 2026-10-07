import Link from 'next/link';
import ParallaxImage from './ParallaxImage';
import styles from './CategoryGrid.module.css';

export interface Category {
  title: string;
  desc: string;
  img: string;
  href: string;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className={styles.grid}>
      {categories.map((c, i) => (
        <div key={c.title} className={styles.cell}>
          <Link href={c.href} className={styles.card}>
            <ParallaxImage src={c.img} alt={c.title} sizes="(max-width: 1024px) 50vw, 25vw" />
            <div className={styles.overlay}>
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.desc}>{c.desc}</p>
              <span className={styles.link}>
                Explore <span className={styles.arrow}>&rarr;</span>
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
