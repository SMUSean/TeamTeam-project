import React, { useEffect, useState } from "react";
import "./Gallery.css";
import VerifiedGallery from "../Components/VerifiedGallery";
import UploadSection from "../Components/UploadSection";
import {
  getCachedGalleryImages,
  fetchAndCacheGalleryImages,
} from "../utils/assetCache";

const MAX_STORAGE = 100 * 1024 * 1024; // 100 MB

function Gallery() {
  const [verifiedImages, setVerifiedImages] = useState(
    () => getCachedGalleryImages() || []
  );
  const [images, setImages] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

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

  const removeImage = (index) => {
    setTotalSize((prev) => prev - images[index].size);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
