import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__section}>
          <h3 className={styles.footer__logo}>UTOPIA</h3>
          <p className={styles.footer__tagline}>
            Photographe & Vidéaste
          </p>
        </div>

        <div className={styles.footer__section}>
          <h4 className={styles.footer__title}>Navigation</h4>
          <nav className={styles.footer__nav}>
            <Link href="/" className={styles.footer__link}>Accueil</Link>
            <Link href="/galerie" className={styles.footer__link}>Galerie</Link>
            <Link href="/pricing" className={styles.footer__link}>Pricing</Link>
            <Link href="/shop" className={styles.footer__link}>Shop</Link>
            <Link href="/a-propos" className={styles.footer__link}>À propos</Link>
            <Link href="/contact" className={styles.footer__link}>Contact</Link>
          </nav>
        </div>

        <div className={styles.footer__section}>
          <h4 className={styles.footer__title}>Réseaux</h4>
          <nav className={styles.footer__nav}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footer__link}>
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.footer__link}>
              Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.footer__link}>
              YouTube
            </a>
          </nav>
        </div>

        <div className={styles.footer__section}>
          <h4 className={styles.footer__title}>Contact</h4>
          <div className={styles.footer__contact}>
            <a href="mailto:utopiaphotographies@gmail.com" className={styles.footer__link}>
              utopiaphotographies@gmail.com
            </a>
            <a href="tel:+33675146508" className={styles.footer__link}>
              06.75.14.65.08
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <p className={styles.footer__copyright}>
          © {currentYear} UTOPIA Photography. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
