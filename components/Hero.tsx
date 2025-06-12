
import React from 'react';
import { Countdown } from './Countdown';

interface HeroProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingDateTime: string;
  heroImageUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ groomName, brideName, weddingDate, weddingDateTime, heroImageUrl }) => {
  return (
    <header 
      className="relative min-h-screen flex flex-col items-center justify-center text-white text-center overflow-hidden"
    >
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      ></div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col items-center">
        <p className="font-cormorant text-2xl md:text-3xl tracking-wider">NOS CASAMOS</p>
        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl my-4 font-bold">
          {groomName} &amp; {brideName}
        </h1>
        <p className="font-cormorant text-xl md:text-2xl mb-8 tracking-wider">{weddingDate}</p>
        <Countdown targetDate={weddingDateTime} />
      </div>
    </header>
  );
};
