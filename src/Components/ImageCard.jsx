import React from "react";

export default function ImageCard({ src, alt, onRemove }) {
  return (
    <div
      className="relative bg-white/25 dark:bg-white/10 rounded-2xl shadow-xl border-4 border-white/40 dark:border-white/20 overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
    >
      <img
        src={src}
        alt={alt}
        decoding="async"
        className="w-full h-64 object-cover"
      />

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
