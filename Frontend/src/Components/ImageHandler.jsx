import React, { useState } from "react";

import { Upload, X, ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function ImageUploaderTailwindLightbox() {

  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilesChange = (e) => {
    
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const nextImage = () => {
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = images[lightboxIndex].url;4
    console.log(images[lightboxIndex].url)
    link.download = `image-${lightboxIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Photo Gallery
          </h1>
          <p className="text-gray-600 text-lg">Upload and showcase your favorite moments</p>
        </div>

        {/* Upload Section */}
        <div className="mb-10">
          <label className="relative block">
            <input type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
            <div className="border-3 border-dashed border-indigo-300 rounded-2xl p-12 bg-white hover:bg-indigo-50 transition-all duration-300 cursor-pointer group hover:border-indigo-400 hover:shadow-lg">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-2">Click to upload images</p>
                <p className="text-gray-500">or drag and drop your files here</p>
                <p className="text-sm text-gray-400 mt-3">PNG, JPG, JPEG, GIF supported</p>
              </div>
            </div>
          </label>
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={img.url}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setIsOpen(true);
                  }}
                />

                {/* Remove Button */}
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5">
              <Upload className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg font-medium mb-2">No images yet</p>
            <p className="text-gray-400">Upload your first image to get started</p>
          </div>
        )}

        {/* Lightbox */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors"
            >
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3">
                <X className="w-7 h-7" />
              </div>
            </button>

            {/* Previous */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-6 text-white hover:text-purple-400"
              >
                <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <ChevronLeft className="w-8 h-8" />
                </div>
              </button>
            )}

            {/* Image */}
            <div className="max-w-7xl max-h-[90vh] mx-auto px-4 relative">
              <img
                src={images[lightboxIndex].url}
                alt="full-preview"
                className="max-h-[90vh] max-w-full rounded-xl shadow-2xl object-contain"
              />
              {/* Download */}
              <button
                onClick={downloadImage}
                className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg border border-white/20 hover:bg-white/30 hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 text-white hover:text-purple-400"
              >
                <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <ChevronRight className="w-8 h-8" />
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
