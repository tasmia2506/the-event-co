import styles from './Divider.module.css';

// Section ornament: two lines flanking a diamond.
export default function Divider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`${styles.wrap} ${dark ? styles.dark : ''}`} aria-hidden="true">
      <span className={styles.line} style={{ transformOrigin: 'right' }} />
      <span className={styles.gem} style={{ transform: 'rotate(45deg)' }} />
      <span className={styles.line} style={{ transformOrigin: 'left' }} />
    </div>
  );
}
