import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './TileGrid.module.css';

export interface Tile {
  title: string;
  desc: string;
  linkLabel?: string;
  linkHref?: string;
  icon?: ReactNode;
}

export default function TileGrid({ tiles, dark = false }: { tiles: Tile[]; dark?: boolean }) {
  return (
    <div className={`${styles.grid} ${dark ? styles.dark : ''}`}>
      {tiles.map((t) => (
        <div className={styles.tile} key={t.title}>
          {t.icon && <div className={styles.icon}>{t.icon}</div>}
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.desc}>{t.desc}</p>
          {t.linkLabel && t.linkHref && (
            <Link href={t.linkHref} className={styles.link}>
              {t.linkLabel} &rarr;
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
