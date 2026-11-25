/**
 * ============================================================
 *  Gallery Page ΓÇô Saint MargaretΓÇÖs Bay Area Web Application
 *  ------------------------------------------------------------
 *  Description:
 *  This React component serves as the main gallery page for the
 *  Saint MargaretΓÇÖs Bay Area website. It integrates three key
 *  functionalities:
 *
 *   1. Fetch and render verified (approved) public images.
 *   2. Manage client-side image uploads, previews, and submissions.
 *   3. Render an animated parallax background composed of verified images.
 *
 *  Key Features:
 *   - Dynamically fetches verified gallery images from the backend.
 *   - Implements a parallax scrolling effect with random approved images.
 *   - Provides drag-and-drop reordering and live previews for uploads.
 *   - Enforces a 100MB total upload limit with client-side validation.
 *   - Supports dark mode detection via <html> class mutation observation.
 *   - Interacts with backend upload endpoints (`/api/gallery/uploads`).
 *
 *  Component Structure:
 *   - VerifiedGallery: Displays approved public images.
 *   - UploadSection: Handles local uploads, previews, and submission.
 *   - Parallax background: Uses random verified images for layered depth.
 *
 *  State Overview:
 *   - verifiedImages: Array of URLs fetched from the backend.
 *   - images: Array of File + preview objects awaiting upload.
 *   - totalSize: Total size of all selected images (max 100MB).
 *   - parallaxOffset: Scroll-driven Y offset for background animation.
 *   - parallaxImages: Subset of verified images used for layered background.
 *   - isDarkMode: Tracks current dark/light mode for dynamic UI updates.
 *
 *  Dependencies:
 *   - React, useEffect, useState, useRef
 *   - VerifiedGallery and UploadSection components
 *   - Background asset (lake.jpg)
 *   - CSS: ./Gallery.css
 * 
 *  Deprecated Features:
 *   - Parralax effect. Removed due to time constraints but could be done by a future group.
 *
 *  Authors:
 *   @author Aaron Jayawardana, Ashesh Pahari
 *   @author Samson Mate (A00476626), Ashesh Pahari
 *   @author Jaden Eisenhauer, Ashesh Pahari
 *
 *  Last Updated: October 2025
 * ============================================================
 */
import React, { useEffect, useState } from "react";
import "./Gallery.css";
import VerifiedGallery from "../Components/VerifiedGallery";
import UploadSection from "../Components/UploadSection";
import {
  getCachedGalleryImages,
  fetchAndCacheGalleryImages,
} from "../utils/assetCache";

const MAX_STORAGE = 100 * 1024 * 1024; // 100 MB upload cap

function Gallery() {
  // Initialize immediately from cached gallery list if already pre-fetched
  const [verifiedImages, setVerifiedImages] = useState(
    () => getCachedGalleryImages() || []
  );
  const [images, setImages] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  // Refresh verified images from backend and update cache
  useEffect(() => {
    let active = true;
    fetchAndCacheGalleryImages()
      .then((imgs) => {
        if (active && imgs.length > 0) {
          setVerifiedImages(imgs);
        }
      })
      .catch((err) => console.error("Failed to fetch verified images:", err));
    return () => {
      active = false;
    };
  }, []);

  // Stage newly selected image files while enforcing the 100 MB limit
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const addedSize = files.reduce((s, f) => s + f.size, 0);
    if (totalSize + addedSize > MAX_STORAGE) {
      alert("Cannot upload: storage limit exceeded (100 MB max)");
      return;
    }

    const newItems = files.map((file) => ({
      file,
      data: URL.createObjectURL(file),
      size: file.size,
    }));

    setImages((prev) => [...prev, ...newItems]);
    setTotalSize((prev) => prev + addedSize);
    event.target.value = "";
  };

  // Remove a staged upload preview and reclaim its size quota
  const removeImage = (index) => {
    setTotalSize((prev) => prev - images[index].size);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload staged images as multipart FormData to /api/gallery/uploads
  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("No images to submit!");
      return;
    }

    if (totalSize > MAX_STORAGE) {
      alert("Total images exceed storage limit (100 MB). Remove some images.");
      return;
    }

    try {
      const formData = new FormData();
      images.forEach((img, idx) => {
        formData.append("images", img.file, img.file.name || `upload-${idx}`);
      });

      const res = await fetch(`/api/gallery/uploads`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      alert(result.message);

      images.forEach((img) => URL.revokeObjectURL(img.data));
      setImages([]);
      setTotalSize(0);
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during submission.");
    }
  };

  // Reorder staged preview cards after drag-and-drop
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };

  return (
    <div className="Gallery relative min-h-screen text-center pt-10 pb-16 text-light-text dark:text-dark-text">
      <VerifiedGallery images={verifiedImages} />

      <UploadSection
        totalSize={totalSize}
        images={images}
        onChangeFiles={handleFileChange}
        onSubmit={handleSubmit}
        onRemove={removeImage}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

export default Gallery;


