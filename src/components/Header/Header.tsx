'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

export default function Header({ variant = 'dark' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerClassName = variant === 'light'
    ? `${styles.header} ${styles['header--light']}`
    : styles.header;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={headerClassName}>
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
