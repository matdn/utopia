export const CHUNK_SIZE = 40;
export const RENDER_DISTANCE = 1;
export const CHUNK_FADE_MARGIN = 1;
export const NEAR_FADE_START = 20;
export const NEAR_FADE_END = 6;
export const INITIAL_CAMERA_Z = 80;
export const INVIS_THRESHOLD = 0.01;
export const KEYBOARD_SPEED = 0.3;
export const MAX_VELOCITY = 8;
export const VELOCITY_DECAY = 0.88;
export const VELOCITY_LERP = 0.12;

export const CHUNK_OFFSETS: Array<{ dx: number; dy: number; dz: number }> = (() => {
  const offsets: Array<{ dx: number; dy: number; dz: number }> = [];
  const rd = RENDER_DISTANCE;
  for (let dz = -rd; dz <= rd; dz++) {
    for (let dy = -rd; dy <= rd; dy++) {
      for (let dx = -rd; dx <= rd; dx++) {
        offsets.push({ dx, dy, dz });
      }
    }
  }
  return offsets;
})();
