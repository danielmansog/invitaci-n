
import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className = '', titleClassName = '' }) => {
  return (
    <section id={id} className={`py-12 md:py-16 border-b border-gray-200 ${className}`}>
      <div className="container mx-auto">
        <h2 className={`font-cormorant text-4xl md:text-5xl font-bold text-siena text-center mb-10 md:mb-12 ${titleClassName}`}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};
