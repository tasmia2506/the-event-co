'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
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
        <motion.div
          key={c.title}
          className={styles.cell}
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={c.href} className={styles.card}>
            <ParallaxImage
              src={c.img}
              alt={c.title}
              sizes="(max-width: 1024px) 50vw, 25vw"
              speed={6}
              delay={(i % 4) * 0.06}
              from="bottom"
            />
            <div className={styles.overlay}>
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.desc}>{c.desc}</p>
              <span className={styles.link}>
                Explore <span className={styles.arrow}>&rarr;</span>
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
