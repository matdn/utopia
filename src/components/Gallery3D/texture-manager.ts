import * as THREE from 'three';
import type { MediaItem } from './types';

type CacheEntry = {
  texture: THREE.Texture;
  loaded: boolean;
  callbacks: Array<() => void>;
};

const cache = new Map<string, CacheEntry>();
const loader = new THREE.TextureLoader();

export function getTexture(media: MediaItem, onLoad: () => void): THREE.Texture {
  const { src } = media;
  const entry = cache.get(src);

  if (entry) {
    if (entry.loaded) {
      setTimeout(onLoad, 0);
    } else {
      entry.callbacks.push(onLoad);
    }
    return entry.texture;
  }

  const newEntry: CacheEntry = {
    texture: null as unknown as THREE.Texture,
    loaded: false,
    callbacks: [onLoad],
  };
  cache.set(src, newEntry);

  const texture = loader.load(src, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    newEntry.loaded = true;
    newEntry.callbacks.forEach((cb) => cb());
    newEntry.callbacks = [];
  });

  newEntry.texture = texture;
  return texture;
}
