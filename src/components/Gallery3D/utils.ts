import * as THREE from 'three';
import { CHUNK_SIZE } from './constants';
import type { PlaneData } from './types';

const chunkCache = new Map<string, PlaneData[]>();

function seededRandom(seed: number) {
  let n = (Math.abs(seed) % 2147483647) || 1;
  return () => {
    n = (n * 16807) % 2147483647;
    return n / 2147483647;
  };
}

export function generateChunkPlanesCached(cx: number, cy: number, cz: number): PlaneData[] {
  const key = `${cx},${cy},${cz}`;

  if (!chunkCache.has(key)) {
    const rng = seededRandom(cx * 73856093 + cy * 19349663 + cz * 83492791);
    const planes: PlaneData[] = [];
    const count = 3;

    for (let i = 0; i < count; i++) {
      const x = cx * CHUNK_SIZE + (rng() - 0.5) * CHUNK_SIZE;
      const y = cy * CHUNK_SIZE + (rng() - 0.5) * CHUNK_SIZE;
      const z = cz * CHUNK_SIZE + (rng() - 0.5) * CHUNK_SIZE;
      const baseScale = 6 + rng() * 6;

      planes.push({
        id: `${cx},${cy},${cz},${i}`,
        position: new THREE.Vector3(x, y, z),
        scale: new THREE.Vector3(baseScale, baseScale, 1),
        mediaIndex: Math.floor(rng() * 10000),
      });
    }

    chunkCache.set(key, planes);
  }

  return chunkCache.get(key)!;
}

export function getChunkUpdateThrottleMs(isZooming: boolean, absVelZ: number): number {
  if (isZooming && absVelZ > 2) return 50;
  if (isZooming) return 100;
  return 200;
}

export function shouldThrottleUpdate(lastUpdate: number, throttleMs: number, now: number): boolean {
  return now - lastUpdate >= throttleMs;
}
