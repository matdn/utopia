'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/" onClick={closeMenu}>TL</Link>
      </div>

      <button 
        className={`${styles.header__burger} ${isMenuOpen ? styles['header__burger--open'] : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`${styles.header__nav} ${isMenuOpen ? styles['header__nav--open'] : ''}`}>
        <Link href="/" className={styles.header__link} onClick={closeMenu}>Accueil</Link>
        <Link href="/galerie" className={styles.header__link} onClick={closeMenu}>Galerie</Link>
        <Link href="/pricing" className={styles.header__link} onClick={closeMenu}>Nos offres</Link>
        <Link href="/shop" className={styles.header__link} onClick={closeMenu}>Shop</Link>
        <Link href="/a-propos" className={styles.header__link} onClick={closeMenu}>À propos</Link>
        <Link href="/contact" className={styles.header__link} onClick={closeMenu}>Contact</Link>
      </nav>

      {isMenuOpen && (
        <div 
          className={styles.header__overlay} 
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
