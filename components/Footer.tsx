
import React from 'react';

interface FooterProps {
  text: string;
}

export const Footer: React.FC<FooterProps> = ({ text }) => {
  return (
    <footer className="text-center py-8 bg-gray-100 mt-16">
      <p className="text-sm text-gray-600 font-cormorant">{text}</p>
    </footer>
  );
};
