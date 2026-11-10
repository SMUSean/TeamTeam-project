/**
 * ============================================================
 *  Gallery Page – Saint Margaret’s Bay Area Web Application
 *  ------------------------------------------------------------
 *  Description:
 *  This React component serves as the main gallery page for the
 *  Saint Margaret’s Bay Area website. It integrates three key
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
 *   @author Aaron Jayawardana
 *   @author Samson Mate (A00476626)
 *   @author Jaden Eisenhauer
 *
 *  Last Updated: October 2025
 * ============================================================
 */

import React, { useEffect, useState, useRef } from "react";
import "./Gallery.css";
import bg from "../assets/lake.jpg";
import VerifiedGallery from "../Components/VerifiedGallery";
import UploadSection from "../Components/UploadSection";

const MAX_STORAGE = 100 * 1024 * 1024; // 100 MB

function Gallery() {
  const [verifiedImages, setVerifiedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [parallaxImages, setParallaxImages] = useState([bg]);
  const hasShuffledRef = useRef(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    // Fetch the verified image URLs from server (same-origin)
    // This powers both the foreground gallery and the background parallax layers.
    const fetchVerified = async () => {
      try {
        const res = await fetch(`/api/gallery/approved`);
        const json = await res.json();
        if (json.images) {
          setVerifiedImages(json.images);
        }
      } catch (err) {
        console.error("Failed to fetch verified images:", err);
      }
    };
    fetchVerified();
  }, []);

  // Parallax background relative to scroll
  useEffect(() => {
    // Compute a small offset from the current scroll position; different layers
    // multiply this offset to create a depth effect.
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      // Adjust factor for desired parallax strength
      setParallaxOffset(Math.round(y * 0.35));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Choose random images for parallax stack ONCE per page load after data arrives
  useEffect(() => {
    if (hasShuffledRef.current) return;
    if (verifiedImages && verifiedImages.length > 0) {
      // Fisher–Yates shuffle to randomize layer sources per page load
      const copy = [...verifiedImages];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setParallaxImages(copy.slice(0, Math.min(3, copy.length)));
      hasShuffledRef.current = true;
    }
  }, [verifiedImages]);

  // Observe dark mode changes applied by Navbar (toggles 'dark' on <html>)
  useEffect(() => {
    const root = document.documentElement;
    // Listen for class changes on <html> so we can adjust local UI if needed
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains('dark'));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    // Initial sync
    setIsDarkMode(root.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const handleFileChange = (event) => {
    // Convert FileList to array and validate against the total size cap.
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const addedSize = files.reduce((s, f) => s + f.size, 0);
    if (totalSize + addedSize > MAX_STORAGE) {
      alert("Cannot upload: storage limit exceeded (100 MB max)");
      return;
    }

    // Store both the File and a preview URL for display; we track size for the cap.
    const newItems = files.map((file) => ({
      file,
      data: URL.createObjectURL(file),
      size: file.size,
    }));

    setImages((prev) => [...prev, ...newItems]);
    setTotalSize((prev) => prev + addedSize);
    event.target.value = ""; // allow selecting the same files again
  };

  const removeImage = (index) => {
    // Remove by index and adjust aggregate size; URL is revoked on submit/reset.
    setTotalSize((prev) => prev - images[index].size);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Abort if nothing to upload or the 100MB cap would be exceeded.
    if (images.length === 0) {
      alert("No images to submit!");
      return;
    }

    if (totalSize > MAX_STORAGE) {
      alert("Total images exceed storage limit (100 MB). Remove some images.");
      return;
    }

    try {
      // Append all files under the field name expected by the server: "images"
      const formData = new FormData();
      images.forEach((img, idx) => {
        formData.append("images", img.file, img.file.name || `upload-${idx}`);
      });

      const res = await fetch(`/api/gallery/uploads`, {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      alert(result.message);

      // Reset after submission and revoke object URLs to free memory
      images.forEach((img) => URL.revokeObjectURL(img.data));
      setImages([]);
      setTotalSize(0);

    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during submission.");
    }
  };

  const onDragEnd = (result) => {
    // Ignore if dropped outside a droppable area.
    if (!result.destination) return;

    // Reorder the in-memory list so previews reflect user intent.
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
  };



  return (
    <div>
      <div className="Gallery relative min-h-screen overflow-hidden text-center pt-28 md:pt-24 text-light-text dark:text-dark-text">

        {/* Parallax Background (stacked layers from random approved images) */}
        <div className="parallax-stack">
          {(parallaxImages.length > 0 ? parallaxImages : [bg]).map((src, i) => {
            const speed = 0.15 + i * 0.1; // deeper layers move slower
            return (
              <div
                key={`bg-layer-${i}`}
                className="parallax-layer"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: `center calc(50% + ${Math.round(parallaxOffset * speed)}px)`,
                  zIndex: i + 1
                }}
              />
            );
          })}
        </div >

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
    </div>
  );
}

export default Gallery;
