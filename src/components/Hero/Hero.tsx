'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.scss';
import homeData from '@/data/home.json';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { sections, logo } = homeData;

  useEffect(() => {
    const duration = sections[activeIndex].duration;
    const interval = 100; // Update every 100ms
    const increment = (interval / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % sections.length);
            setProgress(0);
          }, 100);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [activeIndex, sections]);

  const handleSectionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setProgress(0);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background images */}
      {sections.map((section, index) => (
        <Image
          key={section.id}
          src={section.backgroundImage}
          alt={section.title}
          fill
          className={styles.hero__background}
          style={{
            opacity: index === activeIndex ? 1 : 0,
            zIndex: index === activeIndex ? 1 : 0,
          }}
          priority={index === 0}
        />
      ))}

      {/* Logo */}
      <div className={styles.hero__logo}>{logo}</div>

      {/* Sections at the bottom */}
      <div className={styles.hero__sections}>
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`${styles.section} ${
              index === activeIndex ? styles['section--active'] : ''
            }`}
            onClick={() => handleSectionClick(index)}
          >
            {index === activeIndex && (
              <div
                className={styles.section__topTimer}
                style={{
                  transform: `scaleX(${progress / 100})`,
                }}
              />
            )}
            <h3 className={styles.section__title}>{section.title}</h3>
            <p className={styles.section__description}>{section.description}</p>
            {index === activeIndex && (
              <div
                className={styles.section__timer}
                style={{
                  transform: `scaleX(${progress / 100})`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
