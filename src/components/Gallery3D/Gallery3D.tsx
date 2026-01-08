'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { InfiniteGallery } from './InfiniteGallery';
import CustomCursor from '@/components/CustomCursor';
import ImagePanel from '@/components/ImagePanel';
import styles from './Gallery3D.module.scss';

interface SelectedImage {
  src: string;
  title: string;
  location: string;
  date: string;
  description?: string;
}

export default function Gallery3D() {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  return (
    <div className={styles.gallery3D}>
      <CustomCursor isHovering={isHoveringImage} />
      <Canvas className={styles.gallery3D__canvas}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        {/* <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> */}
        
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Gallery */}
        <InfiniteGallery 
          onImageHover={setIsHoveringImage}
          onImageClick={(image) => setSelectedImage(image)}
        />
        
        {/* Fog for depth effect */}
        <fog attach="fog" args={['#ffffff', 10, 50]} />
      </Canvas>
      
      <div className={styles.gallery3D__overlay}>
        <h1 className={styles.gallery3D__title}>TL</h1>
        <p className={styles.gallery3D__instruction}>
          Scrollez pour accélérer
        </p>
      </div>

      {selectedImage && (
        <ImagePanel
          isOpen={!!selectedImage}
          imageSrc={selectedImage.src}
          title={selectedImage.title}
          location={selectedImage.location}
          date={selectedImage.date}
          description={selectedImage.description}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
