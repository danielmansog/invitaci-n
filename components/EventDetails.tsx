
import React from 'react';
import { Section } from './Section';
import { Icon } from './Icon';
import { Button } from './Button';

interface EventDetailsProps {
  receptionTime: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionMapsLink: string;
  dressCode: string;
  dressCodeDescription: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  receptionTime,
  receptionVenue,
  receptionAddress,
  receptionMapsLink,
  dressCode,
  dressCodeDescription,
}) => {
  return (
    <Section id="detalles" title="Detalles del Evento">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Icon iconClass="fas fa-glass-cheers text-siena text-4xl mb-4" />
          <h3 className="font-cormorant text-2xl text-siena-dark font-semibold mb-3">Recepción</h3>
          <p className="text-gray-600"><strong>Hora:</strong> {receptionTime}</p>
          <p className="text-gray-600"><strong>Lugar:</strong> {receptionVenue}</p>
          <p className="text-gray-600 mb-4">{receptionAddress}</p>
          <Button 
            href={receptionMapsLink}
            target="_blank"
            variant="secondary"
            className="mt-2"
          >
            <Icon iconClass="fas fa-map-marked-alt mr-2" /> Ver en Google Maps
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Icon iconClass="fas fa-tshirt text-siena text-4xl mb-4" />
          <h3 className="font-cormorant text-2xl text-siena-dark font-semibold mb-3">Código de Vestimenta</h3>
          <p className="text-gray-600"><strong>{dressCode}</strong></p>
          <p className="text-gray-600">{dressCodeDescription}</p>
        </div>
      </div>
    </Section>
  );
};
