import { TAvitoGalleryItem } from './def.js';

export function findBestImage(photos: TAvitoGalleryItem): string | undefined {
  const key = Object.values(photos.value).sort()[0];
  if (!key) {
    return undefined;
  }

  return photos.value[key];
}
