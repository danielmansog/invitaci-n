
import React, { useState, useCallback } from 'react';
import { Section } from './Section';
import { GalleryImage } from '../types';
import { Lightbox } from './Lightbox'; // Import the new Lightbox component

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <Section id="galeria" title="Galería de Recuerdos">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3 group cursor-pointer"
            onClick={() => openLightbox(image)}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(image)}
            tabIndex={0}
            role="button"
            aria-label={`Ver imagen ${index + 1} de la galería: ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <Lightbox 
          src={selectedImage.src} 
          alt={selectedImage.alt} 
          onClose={closeLightbox} 
        />
      )}
    </Section>
  );
};
