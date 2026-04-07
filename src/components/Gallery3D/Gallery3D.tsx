'use client';

import * as React from 'react';
import galleryData from '@/data/gallery.json';
import type { MediaItem } from './types';

const LazyScene = React.lazy(() =>
  import('./scene').then((mod) => ({ default: mod.InfiniteCanvasScene }))
);

export default function Gallery3D() {
  const media = galleryData.images as MediaItem[];

  return (
    <React.Suspense
      fallback={<div style={{ width: '100vw', height: '100vh', background: '#fff' }} />}
    >
      <LazyScene
        media={media}
        backgroundColor="#ffffff"
        fogColor="#ffffff"
        fogNear={100}
        fogFar={300}
        showControls
      />
    </React.Suspense>
  );
}
