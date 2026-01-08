'use client';

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.scss';

interface CustomCursorProps {
  isHovering?: boolean;
}

export default function CustomCursor({ isHovering = false }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.customCursor} ${isHovering ? styles['customCursor--hovered'] : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <span className={`${styles.customCursor__text} ${isHovering ? styles['customCursor__text--visible'] : ''}`}>
        voir l'image
      </span>
    </div>
  );
}
