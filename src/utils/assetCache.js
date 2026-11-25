import deer from "../assets/deer.jpg";
import fern from "../assets/fern.png";
import lake from "../assets/lake.jpg";
import heron from "../assets/heron.jpg";
import coyote from "../assets/coyote.jpg";
import shroud from "../assets/shroud.jpg";
import pinebox from "../assets/pinebox.jpg";
import burialOption from "../assets/burialOption.jpg";
import firstpic from "../assets/firstpic.jpg";

const GALLERY_CACHE_KEY = "woodland_gallery_images_v1";
const decodedUrls = new Set();

const STATIC_ASSETS = [
  lake,
  heron,
  deer,
  coyote,
  fern,
  shroud,
  pinebox,
  burialOption,
  firstpic,
  "/deer_in_forests.jpg",
  "/colorful_flowers.jpg",
  "/cute_mushroom_in_forests.jpg",
  "/fern-leaves.jpg",
  "/ferns.jpg",
  "/red-maple.jpg",
];

export function preloadAndDecodeImage(src) {
  if (!src || decodedUrls.has(src)) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    const done = () => {
      decodedUrls.add(src);
      resolve();
    };
    if (img.decode) {
      img.decode().then(done).catch(done);
    } else {
      img.onload = done;
      img.onerror = done;
    }
  });
}

export function getCachedGalleryImages() {
  try {
    const raw = sessionStorage.getItem(GALLERY_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function fetchAndCacheGalleryImages() {
  const cached = getCachedGalleryImages();
  if (cached && cached.length > 0) {
    cached.forEach(preloadAndDecodeImage);
    return cached;
  }

  const res = await fetch("/api/gallery/approved");
  const json = await res.json();
  const images = json.images || [];
  try {
    sessionStorage.setItem(GALLERY_CACHE_KEY, JSON.stringify(images));
  } catch {
    // Ignore storage quota errors
  }
  await Promise.all(images.map(preloadAndDecodeImage));
  return images;
}

export function warmAppCache() {
  STATIC_ASSETS.forEach(preloadAndDecodeImage);
  fetchAndCacheGalleryImages().catch(() => {});
}
