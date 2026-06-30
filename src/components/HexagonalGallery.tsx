"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

interface HexagonalGalleryProps {
  images: GalleryImage[];
  title?: string;
  description?: string;
}

export default function HexagonalGallery({ images, title, description }: HexagonalGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="relative py-12 overflow-hidden">
        {/* Title */}
        {title && (
          <div className="text-center mb-8 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Exo 2', sans-serif", color: "#1a1a1a" }}>
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg italic" style={{ color: "#6b7280" }}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Hexagonal Grid */}
        <div className="hexagon-gallery-container">
          <div className="hexagon-gallery">
            {images.map((image, index) => (
              <div
                key={index}
                className="hexagon-item"
                onClick={() => setSelectedImage(image)}
              >
                <div className="hexagon">
                  <div className="hexagon-inner">
                    <div className="hexagon-content">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="hexagon-image"
                        loading="lazy"
                      />
                      <div className="hexagon-overlay">
                        <span className="hexagon-text">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImage.alt && (
              <div className="mt-4 text-center text-white">
                <p className="text-lg font-semibold">{selectedImage.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hexagon Grid Styles */}
      <style jsx>{`
        .hexagon-gallery-container {
          display: flex;
          justify-content: center;
          padding: 0 1rem;
        }

        .hexagon-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, 140px);
          gap: 8px;
          justify-content: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .hexagon-gallery {
            grid-template-columns: repeat(auto-fit, 160px);
            gap: 10px;
          }
        }

        @media (min-width: 1024px) {
          .hexagon-gallery {
            grid-template-columns: repeat(auto-fit, 180px);
            gap: 12px;
          }
        }

        .hexagon-item {
          width: 140px;
          height: 140px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        @media (min-width: 640px) {
          .hexagon-item {
            width: 160px;
            height: 160px;
          }
        }

        @media (min-width: 1024px) {
          .hexagon-item {
            width: 180px;
            height: 180px;
          }
        }

        .hexagon-item:hover {
          transform: scale(1.1);
          z-index: 10;
        }

        .hexagon {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hexagon-inner {
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: #f3f4f6;
          overflow: hidden;
        }

        .hexagon-content {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hexagon-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .hexagon-item:hover .hexagon-image {
          transform: scale(1.2);
        }

        .hexagon-overlay {
          position: absolute;
          inset: 0;
          background: rgba(232, 69, 35, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hexagon-item:hover .hexagon-overlay {
          opacity: 1;
        }

        .hexagon-text {
          color: white;
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Offset every other row for honeycomb effect */
        .hexagon-item:nth-child(odd) {
          margin-top: 0;
        }

        .hexagon-item:nth-child(even) {
          margin-top: 70px;
        }

        @media (min-width: 640px) {
          .hexagon-item:nth-child(even) {
            margin-top: 80px;
          }
        }

        @media (min-width: 1024px) {
          .hexagon-item:nth-child(even) {
            margin-top: 90px;
          }
        }
      `}</style>
    </>
  );
}
