
import React, { useEffect, useCallback } from 'react';
import { Icon } from './Icon';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore background scrolling
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada de ${alt}`}
    >
      <div
        className="relative bg-white p-2 sm:p-4 rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/modal itself
      >
        <img
          src={src}
          alt={alt}
          className="block max-w-full max-h-[calc(90vh-4rem)] object-contain rounded"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-2 sm:right-2 bg-siena text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl hover:bg-siena-dark transition-colors focus:outline-none focus:ring-2 focus:ring-siena-dark focus:ring-offset-2"
          aria-label="Cerrar vista ampliada"
        >
          <Icon iconClass="fas fa-times" />
        </button>
      </div>
    </div>
  );
};
