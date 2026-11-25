/**
 * ============================================================
 *  VerifiedGallery Component ΓÇô Saint MargaretΓÇÖs Bay Area Gallery
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
 *   - Includes a lightbox feature for enlarging images on click.
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
 *   @author Samson Mate (A00476626), Ashesh Pahari
 *   @author Lee Jonah, Ashesh Pahari
 *   @lastupdated November 2026
 * ============================================================
 */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ImageCard from "./ImageCard";
import "./VerifiedGallery.css";

export default function VerifiedGallery({ images }) {
  // stores the URL of the currently enlarged image, null = no image selected
  const [selectedImage, setSelectedImage] = useState(null);

  // TODO: Replace this placeholder with the actual uploader's
  // username once backend user authentication and image metadata
  // are implemented.
  const PLACEHOLDER_USERNAME = "WoodlandUser";

  // close the lightbox when Escape is pressed, and prevent background scrolling while the lightbox is open.
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    // restore normal scrolling and remove the event listener.
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="centered-section p-10 md:p-14 rounded-2xl shadow-xl mt-6 w-full max-w-7xl mx-auto">

      {/* Section Header */}
      <div
        id="header-bg"
        className="bg-light-background dark:bg-[var(--mainColor-dark)] backdrop-blur-md rounded-xl p-6 inline-block mb-10 ring-1 ring-white/20"
      >
        <h2 className="text-3xl font-semibold">
          Gallery Photos
        </h2>
      </div>

      {/* Responsive Image Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {images.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(src)}
            aria-label={`Enlarge gallery image ${idx + 1}`}
            className="cursor-pointer text-left"
          >
            <ImageCard
              src={src}
              alt={`Verified ${idx + 1}`}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Image Lightbox */}
      {selectedImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelectedImage(null)}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged gallery image"
              className="relative flex items-center justify-center max-w-full"
              onClick={(event) => event.stopPropagation()}
            >

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close enlarged image"
                className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300"
              >
                &times;
              </button>

              {/* Enlarged Image and Uploader Information */}
              <div className="flex flex-col items-center gap-3">

                {/* Full Image */}
                <img
                  src={selectedImage}
                  alt="Enlarged gallery photograph"
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                />

                {/* Uploader Information */}
                <div className="text-center text-white">

                  <p className="text-sm text-gray-300">
                    Uploaded by
                  </p>
          
                  <p className="text-lg font-semibold">
                    {PLACEHOLDER_USERNAME} 
                  </p>

                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}








