
import React from 'react';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { EventDetails } from './components/EventDetails';
import { Gallery } from './components/Gallery';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { WEDDING_DETAILS } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-[#fdfdfd] text-gray-700 font-georgia leading-relaxed">
      <Hero
        brideName={WEDDING_DETAILS.brideName}
        groomName={WEDDING_DETAILS.groomName}
        weddingDate={WEDDING_DETAILS.weddingDate}
        weddingDateTime={WEDDING_DETAILS.weddingDateTime}
        heroImageUrl={WEDDING_DETAILS.heroImageUrl}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <OurStory story={WEDDING_DETAILS.ourStoryParagraph} />
        <EventDetails
          receptionTime={WEDDING_DETAILS.receptionTime}
          receptionVenue={WEDDING_DETAILS.receptionVenue}
          receptionAddress={WEDDING_DETAILS.receptionAddress}
          receptionMapsLink={WEDDING_DETAILS.receptionMapsLink}
          dressCode={WEDDING_DETAILS.dressCode}
          dressCodeDescription={WEDDING_DETAILS.dressCodeDescription}
        />
        <Gallery images={WEDDING_DETAILS.galleryImages} />
        <RsvpSection rsvpDeadline={WEDDING_DETAILS.rsvpDeadline} />
      </main>
      <Footer text={WEDDING_DETAILS.footerText} />
    </div>
  );
};

export default App;
