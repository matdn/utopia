import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link href="/" className={styles.header__link}>Accueil</Link>
        <Link href="/galerie" className={styles.header__link}>Galerie</Link>
        <Link href="/pricing" className={styles.header__link}>Pricing</Link>
        <Link href="/a-propos" className={styles.header__link}>À propos</Link>
        <Link href="/contact" className={styles.header__link}>Contact</Link>
      </nav>
    </header>
  );
}
