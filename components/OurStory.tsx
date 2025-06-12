
import React from 'react';
import { Section } from './Section';

interface OurStoryProps {
  story: string;
}

export const OurStory: React.FC<OurStoryProps> = ({ story }) => {
  return (
    <Section id="historia" title="Nuestra Historia">
      <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {story}
      </p>
    </Section>
  );
};
