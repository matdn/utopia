'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

export default function Header({ variant = 'dark' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const useLightHeader = pathname === '/shop' || pathname === '/a-propos' || pathname === '/contact';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${useLightHeader ? styles['header--light'] : ''}`}>
      <div className={styles.header__logo}>
        <Link href="/" onClick={closeMenu}>UTOPIA</Link>
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
