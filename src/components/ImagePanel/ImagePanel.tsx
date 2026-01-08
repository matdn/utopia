'use client';

import Image from 'next/image';
import styles from './ImagePanel.module.scss';

interface ImagePanelProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  location: string;
  date: string;
  description?: string;
  onClose: () => void;
}

export default function ImagePanel({ isOpen, imageSrc, title, location, date, description, onClose }: ImagePanelProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`${styles.imagePanel__overlay} ${isOpen ? styles['imagePanel__overlay--open'] : ''}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`${styles.imagePanel} ${isOpen ? styles['imagePanel--open'] : ''}`}>
        <button className={styles.imagePanel__close} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.imagePanel__content}>
          <div className={styles.imagePanel__imageContainer}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={styles.imagePanel__image}
            />
          </div>
          
          <div className={styles.imagePanel__info}>
            <h2 className={styles.imagePanel__title}>{title}</h2>
            <div className={styles.imagePanel__meta}>
              <div className={styles.imagePanel__metaItem}>
                <span className={styles.imagePanel__metaLabel}>Lieu</span>
                <span className={styles.imagePanel__metaValue}>{location}</span>
              </div>
              <div className={styles.imagePanel__metaItem}>
                <span className={styles.imagePanel__metaLabel}>Date</span>
                <span className={styles.imagePanel__metaValue}>{date}</span>
              </div>
            </div>
            {description && (
              <div className={styles.imagePanel__description}>
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
