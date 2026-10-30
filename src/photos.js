import studio from './assets/photos/studio.webp';
import standing from './assets/photos/standing.webp';
import beach from './assets/photos/beach.webp';
import lying from './assets/photos/lying.webp';
import { PHOTO_ALT } from './config.js';

const PHOTOS = { studio, standing, beach, lying };

export const slidesFor = (keys) => keys.map((key) => ({ src: PHOTOS[key], alt: PHOTO_ALT[key] }));
