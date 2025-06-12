
import React, { useState, useEffect, useCallback } from 'react';
import { CountdownTime } from '../types';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: CountdownTime | null = null;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownTime | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) {
    return <div id="countdown-finished" className="mt-6 text-center"><h2 className="font-cormorant text-3xl font-bold text-gold">¡Llegó el gran día!</h2></div>;
  }

  return (
    <div id="countdown" className="flex justify-center items-center gap-3 sm:gap-5 mt-6 bg-black/50 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span className="block font-cormorant text-3xl sm:text-5xl font-bold text-white">{value}</span>
          <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-200">{unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Minutos' : 'Segundos'}</p>
        </div>
      ))}
    </div>
  );
};
