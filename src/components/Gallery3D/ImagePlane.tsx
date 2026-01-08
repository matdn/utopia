'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface ImagePlaneProps {
  position: [number, number, number];
  imageSrc: string;
  title: string;
  date: string;
  location: string;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

export function ImagePlane({ position, imageSrc, isDimmed, onHover, onUnhover, onClick }: ImagePlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);
  const [dimensions, setDimensions] = useState<[number, number]>([3, 4]);

  useEffect(() => {
    if (texture.image) {
      const img = texture.image as HTMLImageElement;
      const aspectRatio = img.width / img.height;
      
      // Base height
      const baseHeight = 4;
      const width = baseHeight * aspectRatio;
      
      // Use queueMicrotask to avoid setState warning
      queueMicrotask(() => {
        setDimensions([width, baseHeight]);
      });
    }
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Smooth opacity transition
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = isDimmed ? 0.3 : 1;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerEnter={onHover}
      onPointerLeave={onUnhover}
      onClick={onClick}
    >
      <planeGeometry args={dimensions} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
}
