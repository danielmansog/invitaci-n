
import React from 'react';
import { Section } from './Section';
import { RsvpForm } from './RsvpForm';

interface RsvpSectionProps {
  rsvpDeadline: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ rsvpDeadline }) => {
  return (
    <Section id="rsvp" title="Confirmar Asistencia">
      <div className="text-center max-w-xl mx-auto">
        <p className="text-lg text-gray-600 mb-4">
          Tu presencia es el mejor regalo, pero saber que vienes es fundamental para nosotros.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Por favor, confirma tu asistencia antes del <strong className="text-siena">{rsvpDeadline}</strong>.
        </p>
        <RsvpForm />
      </div>
    </Section>
  );
};
