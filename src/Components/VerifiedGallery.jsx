/**
 * ============================================================
 *  VerifiedGallery Component – Saint Margaret’s Bay Area Gallery
 *  ------------------------------------------------------------
 *  Description:
 *  The VerifiedGallery component renders all approved images in
 *  a clean, responsive grid layout. Each image tile is displayed
 *  using the shared ImageCard component, ensuring visual
 *  consistency across the application.
 *
 *  Key Features:
 *   - Dynamically displays verified gallery images fetched from backend.
 *   - Responsive grid that adapts to viewport size.
 *   - Glassy, modern UI container with rounded corners and shadows.
 *   - Lightweight and presentation-focused (stateless).
 *
 *  Dependencies:
 *   - React
 *   - ImageCard component
 *   - CSS: ./VerifiedGallery.css
 *
 *  Parameters:
 *   @param {Object} props - Component properties.
 *   @param {string[]} props.images - Array of verified image URLs (typically served from /api/gallery/approved).
 *
 *  Authors
 *   @author Samson Mate (A00476626)
 *
 *  @lastupdated October 2025
 * ============================================================
 */

import React from "react";
import ImageCard from "./ImageCard";
import "./VerifiedGallery.css";

export default function VerifiedGallery({ images }) {
  return (
    <section className="centered-section fade-slide-up p-16 rounded-2xl shadow-xl mt-12 w-full mx-6 md:mx-10">
      {/* Section Header */}
      <div id="header-bg" className="bg-light-background dark:bg-[var(--mainColor-dark)] backdrop-blur-md rounded-xl p-6 inline-block mb-10 ring-1 ring-white/20">
        <h2 className="text-3xl mt-6 font-semibold">Gallery Photos</h2>
      </div>

      {/* Responsive Image Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {images.map((src, idx) => (
          <ImageCard key={idx} src={src} alt={`Verified ${idx}`} />
        ))}
      </div>
    </section>
  );
}


