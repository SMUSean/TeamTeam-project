/**
 * ============================================================
 *  ImageCard Component – Saint Margaret’s Bay Area Gallery
 *  ------------------------------------------------------------
 *  Description:
 *  The ImageCard component is a reusable visual tile used across
 *  the gallery system to render individual images. It supports
 *  optional removal functionality for uploaded or editable images
 *  and ensures consistent styling across verified and unverified
 *  galleries.
 *
 *  Key Features:
 *   - Displays an image within a styled card container.
 *   - Supports optional "remove" button (when provided via props).
 *   - Responsive, theme-aware (light/dark mode) design.
 *   - Used in both VerifiedGallery (read-only) and UploadSection (interactive).
 *
 *  Dependencies:
 *   - React
 *   - CSS: ./ImageCard.css (if applicable)
 *
 *  @component
 *   @param {Object} props - Component properties.
 *   @param {string} props.src - The image source URL or object URL to display.
 *   @param {string} props.alt - Accessible alt text describing the image.
 *   @param {() => void} [props.onRemove] - Optional callback to remove this image (used in uploads).
 *   @returns {JSX.Element} Rendered image card component.
 *
 *  @example
 *  // Example usage inside UploadSection:
 *  <ImageCard
 *    src={img.data}
 *    alt="Preview Image"
 *    onRemove={() => handleRemove(index)}
 *  />
 *
 *  @example
 *  // Example usage inside VerifiedGallery:
 *  <ImageCard
 *    src="/api/gallery/approved/sample.jpg"
 *    alt="Verified Image"
 *  />
 *
 *  @author
 *   - Samson Mate (A00476626)
 *
 *  @lastupdated October 2025
 * ============================================================
 */

import React from "react";

export default function ImageCard({ src, alt, onRemove }) {
  return (
    <div
      className="relative bg-white/25 dark:bg-white/10 rounded-2xl shadow-xl border-4 border-white/40 dark:border-white/20 overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
    >
      {/* Fixed-height visual tile; object-cover preserves image aspect */}
      <img src={src} alt={alt} className="w-full h-64 object-cover" />

      {/* Removal control (only shown when a handler is provided) */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-600/90 text-white px-2 py-1 rounded-full text-sm hover:bg-red-500 transition"
          aria-label="Remove image"
        >
          X
        </button>
      )}
    </div>
  );
}


