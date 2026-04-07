import type * as THREE from 'three';

export interface MediaItem {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  date: string;
  description?: string;
  width?: number;
  height?: number;
}

export interface PlaneData {
  id: string;
  position: THREE.Vector3;
  scale: THREE.Vector3;
  mediaIndex: number;
}

export interface ChunkData {
  key: string;
  cx: number;
  cy: number;
  cz: number;
}

export interface InfiniteCanvasProps {
  media: MediaItem[];
  onTextureProgress?: (progress: number) => void;
  showFps?: boolean;
  showControls?: boolean;
  cameraFov?: number;
  cameraNear?: number;
  cameraFar?: number;
  fogNear?: number;
  fogFar?: number;
  backgroundColor?: string;
  fogColor?: string;
}
