'use client';

import type { ReactNode } from 'react';
import { Stagger, StaggerItem } from './PageMotion';
import styles from './LocationsGrid.module.css';

export function LocationsGrid({ children }: { children: ReactNode }) {
  return (
    <Stagger className={styles.grid} gap={0.15}>
      {children}
    </Stagger>
  );
}

export function LocationCard({
  featured,
  badge,
  title,
  children,
  actions,
}: {
  featured?: boolean;
  badge: string;
  title: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <StaggerItem className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div>
        <span className={styles.typeBadge}>{badge}</span>
        <h3 className={styles.name}>{title}</h3>
        <div className={styles.address}>{children}</div>
      </div>
      <div>{actions}</div>
    </StaggerItem>
  );
}
