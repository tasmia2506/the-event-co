'use client';

import { useEffect, type ReactNode } from 'react';
import styles from './PageMotion.module.css';

// True once the first page has mounted. app/template.tsx re-mounts on every
// navigation, so any mount after the first one is a real route change and gets
// the burgundy wipe. The very first load stays untouched (no extra delay on LCP).
let hasMounted = false;

export default function PageMotionTransition({ children }: { children: ReactNode }) {
  const navigated = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <>
      {navigated && (
        <>
          <div className={styles.wipeBack} aria-hidden="true" />
          <div className={styles.wipe} aria-hidden="true" />
        </>
      )}
      <div className={navigated ? styles.pageEnter : undefined}>{children}</div>
    </>
  );
}
