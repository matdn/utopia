'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import shopData from '@/data/shop.json';
import Image from 'next/image';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header';

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
  const previewImages = [book.images.cover, book.images.spread1, book.images.spread2, book.images.detail];

  return (
    <>
      <Header/>
      <div className={styles.shop}>
        {/* Hero Section */}
        <section className={styles.shop__hero}>
          <div className={styles.shop__heroContent}>
            <div className={styles.shop__heroText}>
              <span className={styles.shop__heroLabel}>nouveau</span>
              <h1 className={styles.shop__heroTitle}>{book.title}</h1>
              <p className={styles.shop__heroSubtitle}>{book.subtitle}</p>
            </div>
            <div className={styles.shop__heroImageWrapper}>
              {/* <div className={styles.shop__heroImage}>
                <Image
                  src={book.images.cover}
                  alt={book.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div> */}
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className={styles.shop__description}>
          <div className={styles.shop__descriptionContent}>
            <div className={styles.shop__descriptionText}>
              <h2 className={styles.shop__descriptionTitle}>Un voyage photographique unique</h2>
              <p className={styles.shop__descriptionParagraph}>{book.description}</p>
            </div>
            <div className={styles.shop__descriptionSpecs}>
              <div className={styles.shop__spec}>
                <span className={styles.shop__specLabel}>Auteur</span>
                <span className={styles.shop__specValue}>{book.author}</span>
              </div>
              <div className={styles.shop__spec}>
                <span className={styles.shop__specLabel}>Pages</span>
                <span className={styles.shop__specValue}>{book.pages}</span>
              </div>
              <div className={styles.shop__spec}>
                <span className={styles.shop__specLabel}>Format</span>
                <span className={styles.shop__specValue}>{book.format}</span>
              </div>
              <div className={styles.shop__spec}>
                <span className={styles.shop__specLabel}>Année</span>
                <span className={styles.shop__specValue}>{book.year}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.shop__features}>
          <div className={styles.shop__featuresLeft}>
            <h2 className={styles.shop__featuresTitle}>Ce que vous allez découvrir</h2>
            <ul className={styles.shop__featuresList}>
              {book.features.map((feature, index) => (
                <li key={index} className={styles.shop__featuresItem}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className={styles.shop__featuresRight}>
            <div className={styles.shop__featuresImage}>
              <Image
                src={book.images.spread1}
                alt="Aperçu du livre"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        {/* <section className={styles.shop__gallery}>
          <div className={styles.shop__galleryMain}>
            <Image
              src={previewImages[currentImage]}
              alt="Aperçu"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.shop__galleryThumbs}>
            {previewImages.map((img, index) => (
              <button
                key={index}
                className={`${styles.shop__galleryThumb} ${currentImage === index ? styles['shop__galleryThumb--active'] : ''}`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={img}
                  alt={`Aperçu ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </section> */}

        {/* CTA Section */}
        <section className={styles.shop__cta}>
          <div className={styles.shop__ctaContent}>
            <div className={styles.shop__ctaLeft}>
              <h2 className={styles.shop__ctaTitle}>Prêt à découvrir la Bretagne ?</h2>
              <p className={styles.shop__ctaText}>
                Commandez votre exemplaire dès maintenant et plongez dans un voyage photographique inoubliable.
              </p>
            </div>
            <div className={styles.shop__ctaRight}>
              <div className={styles.shop__ctaPrice}>
                <span className={styles.shop__ctaPriceLabel}>Prix</span>
                <span className={styles.shop__ctaPriceValue}>{book.price}</span>
              </div>
              <button 
                className={styles.shop__ctaButton}
                disabled={!book.available}
              >
                {book.available ? 'Commander maintenant' : 'Bientôt disponible'}
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
