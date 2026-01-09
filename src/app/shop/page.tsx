'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.scss';
import shopData from '@/data/shop.json';
import Image from 'next/image';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header';
import Book3D from '@/components/Book3D/Book3D';
import CustomCursor from '@/components/CustomCursor';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  author: string;
  pages: number;
  format: string;
  year: string;
  description: string;
  features: string[];
  images: {
    cover: string;
    spread1: string;
    spread2: string;
    detail: string;
  };
  available: boolean;
}

interface ShopData {
  book: Book;
}

export default function Shop() {
  const { book } = shopData as ShopData;
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewImages = [book.images.cover, book.images.spread1, book.images.spread2, book.images.detail];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Calculer la progression du scroll (0 à 1)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(window.scrollY / documentHeight, 1);
      setScrollProgress(progress);
    };
    
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <>
      <Header/>
      <div className={styles.shop}>
        {/* Hero Section with Parallax & 3D */}
        <section className={styles.shop__hero}>
          {/* <Book3D /> */}
          <div 
            className={styles.shop__heroBackground}
            style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
          />
          <div className={styles.shop__heroOverlay} />
          
          <div 
            className={styles.shop__floating1}
            style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
          />
          <div 
            className={styles.shop__floating2}
            style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
          />

          <div className={styles.shop__heroContent}>
            <div 
              className={styles.shop__heroText}
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
              <div className={styles.shop__heroMeta}>
                <span className={styles.shop__heroLabel}>nouveau</span>
                <span className={styles.shop__heroYear}>{book.year}</span>
              </div>
              <h1 className={styles.shop__heroTitle}>
                {book.title.split(' ').map((word, i) => (
                  <span key={i} className={styles.shop__heroWord} style={{ animationDelay: `${i * 0.1}s` }}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className={styles.shop__heroSubtitle}>{book.subtitle}</p>
              <div className={styles.shop__heroStats}>
                <div className={styles.shop__heroStat}>
                  <span className={styles.shop__heroStatNum}>{book.pages}</span>
                  <span className={styles.shop__heroStatLabel}>pages</span>
                </div>
                <div className={styles.shop__heroStat}>
                  <span className={styles.shop__heroStatNum}>{book.features.length}</span>
                  <span className={styles.shop__heroStatLabel}>chapitres</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.shop__scrollIndicator}>
            <div className={styles.shop__scrollLine} />
            <span>scroll</span>
          </div>
        </section>

        {/* Split Sticky Section */}
        <section className={styles.shop__split}>
          <div className={styles.shop__splitLeft}>
            <div className={styles.shop__splitSticky}>
              <h2 className={styles.shop__splitTitle}>
                Un voyage
                <br />
                <span className={styles.shop__titleOutline}>photographique</span>
                <br />
                unique
              </h2>
            </div>
          </div>
          <div className={styles.shop__splitRight}>
            <p className={styles.shop__splitText}>{book.description}</p>
            <div className={styles.shop__splitSpecs}>
              <div className={styles.shop__splitSpec}>
                <span className={styles.shop__splitSpecLabel}>Auteur</span>
                <span className={styles.shop__splitSpecValue}>{book.author}</span>
              </div>
              <div className={styles.shop__splitSpec}>
                <span className={styles.shop__splitSpecLabel}>Format</span>
                <span className={styles.shop__splitSpecValue}>{book.format}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Cards */}
        <section className={styles.shop__features}>
          <div className={styles.shop__featuresGrid}>
            {book.features.map((feature, i) => (
              <div 
                key={i}
                className={styles.shop__featureCard}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className={styles.shop__featureNum}>0{i + 1}</span>
                <p className={styles.shop__featureText}>{feature}</p>
                <div className={styles.shop__featureLine} />
              </div>
            ))}
          </div>
          
          <div className={styles.shop__featuresVisual}>
            <Image
              src={book.images.spread1}
              alt="Preview"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.shop__featuresOverlay}>
              <span>aperçu du contenu</span>
            </div>
          </div>
        </section>

        {/* CTA with Magnetic Button */}
        <section className={styles.shop__cta}>
          <div className={styles.shop__ctaContent}>
            <div className={styles.shop__ctaHeader}>
              <h2 className={styles.shop__ctaTitle}>
                Prêt à découvrir
                <br />
                <span className={styles.shop__titleOutline}>la Bretagne ?</span>
              </h2>
              <div className={styles.shop__ctaPriceBox}>
                <span className={styles.shop__ctaPriceLabel}>À partir de</span>
                <span className={styles.shop__ctaPriceValue}>{book.price}</span>
              </div>
            </div>
            
            <div className={styles.shop__ctaActions}>
              <button 
                className={styles.shop__ctaButton}
                disabled={!book.available}
              >
                <span className={styles.shop__ctaButtonText}>
                  {book.available ? 'Commander maintenant' : 'Bientôt disponible'}
                </span>
                <span className={styles.shop__ctaButtonCircle}>→</span>
              </button>
              <p className={styles.shop__ctaInfo}>
                Livraison gratuite • Édition limitée • Stock limité
              </p>
            </div>
          </div>

          <div className={styles.shop__ctaDecor}>
            <div className={styles.shop__ctaDecorCircle} />
          </div>
        </section>
      </div>
      <CustomCursor />
      <Footer />
    </>
  );
}
