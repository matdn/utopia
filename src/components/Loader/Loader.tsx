'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Loader.module.scss';
import loaderData from '@/data/loader.json';

export default function Loader() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHiding, setIsHiding] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { logo, images, animationDuration } = loaderData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, animationDuration);

    const hideTimer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setIsHidden(true);
      }, 800);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [images.length, animationDuration]);

  if (isHidden) return null;

  return (
    <div className={`${styles.loader} ${isHiding ? styles['loader--hiding'] : ''}`}>
      <div className={styles.loader__logo}>{logo.text}</div>
      <div className={styles.loader__container}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Loader image ${index + 1}`}
            fill
            className={`${styles.loader__image} ${
              index === currentImageIndex ? styles['loader__image--active'] : ''
            }`}
            priority
          />
        ))}
      </div>
    </div>
  );
}
