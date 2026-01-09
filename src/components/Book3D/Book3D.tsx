'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Book3DProps {
  // Pas besoin de scrollProgress
}

function BookModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/bookB.glb');
  
  useFrame(() => {
    if (groupRef.current) {
      // Rotation continue uniquement
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={scene.clone()} castShadow receiveShadow />
    </group>
  );
}

// Préchargement du modèle
useGLTF.preload('/models/book.glb');

export default function Book3D() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '50%',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 5,
    }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        {/* Lumières */}
        <ambientLight intensity={1.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        
        <BookModel />
      </Canvas>
    </div>
  );
}
