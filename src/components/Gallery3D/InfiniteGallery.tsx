'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ImagePlane } from './ImagePlane';

interface ImageData {
  id: number;
  src: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  category: string;
}

interface InfiniteGalleryProps {
  onImageHover: (isHovering: boolean) => void;
  onImageClick: (image: { src: string; title: string; location: string; date: string; description?: string }) => void;
}

export function InfiniteGallery({ onImageHover, onImageClick }: InfiniteGalleryProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const scrollSpeedRef = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Notify parent when hover state changes
  useEffect(() => {
    onImageHover(hoveredIndex !== null);
  }, [hoveredIndex, onImageHover]);

  useEffect(() => {
    // Fetch images from API
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      })
      .catch(err => console.error('Failed to load images:', err));

    // Handle scroll event
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Add scroll delta to speed
      scrollSpeedRef.current += e.deltaY * 0.02;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Generate positions for images in a helical/spiral pattern
  const imagePositions = useMemo(() => {
    if (images.length === 0) return [];
    
    const positions: Array<[number, number, number]> = [];
    const radius = 9;
    const spacing = 6;
    const imagesPerRing = 6;
    const repetitions = 15;
    
    for (let i = 0; i < images.length * repetitions; i++) {
      const angle = (i / imagesPerRing) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (i % imagesPerRing) * 5 - 10;
      const z = -Math.floor(i / imagesPerRing) * spacing;
      positions.push([x, y, z]);
    }
    
    return positions;
  }, [images.length]);

  useFrame((state, delta) => {
    if (groupRef.current && hoveredIndex === null) {
      // Base speed + scroll speed (only if not hovering)
      const totalSpeed = 3 + scrollSpeedRef.current;
      
      // Move gallery forward
      groupRef.current.position.z += delta * totalSpeed;
      
      // Decay scroll speed
      scrollSpeedRef.current *= 0.92;
      
      // Reset position for infinite loop
      const loopDistance = images.length * 6;
      if (groupRef.current.position.z > loopDistance) {
        groupRef.current.position.z -= loopDistance;
      }
    }
  });

  if (images.length === 0) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {imagePositions.map((position, index) => {
        const imageIndex = index % images.length;
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
        
        return (
          <ImagePlane
            key={`img-${index}`}
            position={position}
            imageSrc={images[imageIndex].src}
            title={images[imageIndex].title}
            date={images[imageIndex].date}
            location={images[imageIndex].location}
            isHovered={isHovered}
            isDimmed={isDimmed}
            onHover={() => setHoveredIndex(index)}
            onUnhover={() => setHoveredIndex(null)}
            onClick={() => onImageClick({
              src: images[imageIndex].src,
              title: images[imageIndex].title,
              location: images[imageIndex].location,
              date: images[imageIndex].date,
              description: images[imageIndex].description
            })}
          />
        );
      })}
    </group>
  );
}
