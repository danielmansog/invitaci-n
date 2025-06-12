
import React from 'react';

interface IconProps {
  iconClass: string;
  className?: string; // Allow additional classes for sizing, color, etc.
}

export const Icon: React.FC<IconProps> = ({ iconClass, className }) => {
  return <i className={`${iconClass} ${className || ''}`}></i>;
};
