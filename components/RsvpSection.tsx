
import React from 'react';
import { Section } from './Section';
import { Button } from './Button'; // Import Button
import { WEDDING_DETAILS } from '../constants'; // Import WEDDING_DETAILS to access the Google Form URL

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
        {/* Replace RsvpForm with a Button linking to Google Form */}
        <Button
          href={WEDDING_DETAILS.googleFormRsvpUrl}
          target="_blank" // Open Google Form in a new tab
          variant="primary"
          className="w-full sm:w-auto" // Full width on small screens, auto on larger
        >
          Confirmar Asistencia Aquí
        </Button>
      </div>
    </Section>
  );
};
