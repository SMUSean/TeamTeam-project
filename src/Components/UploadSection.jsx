/**
 * ============================================================
 *  UploadSection Component – Saint Margaret’s Bay Area Gallery
 *  ------------------------------------------------------------
 *  Description:
 *  The UploadSection component encapsulates all client-side UI
 *  for image uploads within the gallery page. It provides file
 *  selection, preview visualization, drag-and-drop reordering,
 *  and submission controls, keeping the main Gallery component
 *  modular and maintainable.
 *
 *  Key Features:
 *   - Accepts multiple image uploads with preview rendering.
 *   - Displays total upload size with a visual limit indicator.
 *   - Enables drag-and-drop reordering using @hello-pangea/dnd.
 *   - Allows removal of selected images prior to submission.
 *   - Delegates upload submission and change events to parent.
 *
 *  Parameters:
 *   @param totalSize (number): Current total size of selected images in bytes.
 *   @param images (Array<{ data: string, size: number, file?: File }>): 
 *       List of selected images, each with preview URL and size.
 *   @param onChangeFiles (Function): Handles `<input type="file">` changes.
 *   @param onSubmit (Function): Triggered to send images to backend.
 *   @param onRemove (Function): Removes an image from the local list.
 *   @param onDragEnd (Function): Updates image order after drag events.
 *
 *  Dependencies:
 *   - React
 *   - @hello-pangea/dnd (for reordering)
 *   - ImageCard component
 *   - CSS: ./UploadSection.css
 *
 *  Authors:
 *   - Samson Mate (A00476626)
 *
 *  Last Updated: October 2025
 * ============================================================
 */

import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ImageCard from "./ImageCard";
import "./UploadSection.css";

export default function UploadSection({
  totalSize,
  images,
  onChangeFiles,
  onSubmit,
  onRemove,
  onDragEnd,
}) {
  return (
    <section id="image-grid" className="centered-section fade-slide-up delay p-16 rounded-2xl shadow-xl mt-12 w-full mx-6 md:mx-10">
      {/* Section Header and Input */}
      <div id="header-bg" className="bg-light-background dark:bg-[var(--mainColor-dark)] backdrop-blur-md rounded-xl p-6 inline-block mb-6 ring-1 ring-white/20">
        <h2 className="text-3xl font-semibold mb-4">Upload Images</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onChangeFiles}
          className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer transition-all hover:bg-gray-600"
        />
        <p className="mt-2 text-sm">Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB / 100 MB</p>
      </div>

      {/* Uploaded Images Grid */}
      <div className="bg-light-background dark:bg-[var(--mainColor-dark)] backdrop-blur-md rounded-xl p-6 inline-block mb-6 ring-1 ring-white/20 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold">Your Images</h2>
        {images.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="uploadedImages" direction="horizontal">
              {(provided) => (
                <div
                  className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {images.map((img, idx) => (
                    <Draggable key={idx} draggableId={`img-${idx}`} index={idx}>
                      {(providedDraggable) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                        >
                          <ImageCard
                            src={img.data}
                            alt={`Uploaded ${idx}`}
                            onRemove={() => onRemove(idx)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 mb-6">No images uploaded yet.</p>
        )}
      </div>

      {/* Submit Button */}
      {images.length > 0 && (
          <button
            onClick={onSubmit}
            id="submit-button"
            className="bg-light-background dark:bg-[var(--mainColor-dark)] backdrop-blur-sm hover:bg-white/30 text-black dark:text-[var(--textColor-dark)] font-semibold px-7 py-3 rounded-lg transition-colors border-black-2 dark:border-[var(--textColor-dark)]-2 hover:scale-110"
          >
            Submit
          </button>
      )}
    </section>
  );
}


