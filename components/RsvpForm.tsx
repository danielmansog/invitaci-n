
import React, { useState, useCallback } from 'react';
import { RsvpFormData } from '../types';
import { Button } from './Button';
import { generatePersonalizedMessage } from '../services/geminiService';
import { 
  API_KEY_ERROR_MESSAGE, 
  GENERIC_ERROR_MESSAGE, 
  RSVP_SUCCESS_MESSAGE, 
  RSVP_THANK_YOU_NO_ATTEND, 
  API_KEY,
  GOOGLE_APPS_SCRIPT_URL,
  PLACEHOLDER_GOOGLE_APPS_SCRIPT_URL,
  RSVP_SUBMIT_ERROR_SHEET
} from '../constants';

export const RsvpForm: React.FC = () => {
  const initialFormData: RsvpFormData = {
    name: '',
    attending: '',
    guests: 0,
    dietaryRestrictions: '',
    message: '',
  };
  const [formData, setFormData] = useState<RsvpFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'radio' && name === 'attending') {
      setFormData(prev => ({
        ...prev,
        attending: value as 'yes' | 'no',
        guests: value === 'no' ? 0 : prev.guests, // Reset guests if not attending
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.attending) {
      setSubmissionStatus({ type: 'error', message: 'Por favor, completa tu nombre y si asistirás.' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus(null);

    if (GOOGLE_APPS_SCRIPT_URL === PLACEHOLDER_GOOGLE_APPS_SCRIPT_URL) {
      console.error("Error: GOOGLE_APPS_SCRIPT_URL en constants.ts sigue siendo el valor placeholder. No se pueden guardar los datos.");
      setSubmissionStatus({ type: 'error', message: "Error de configuración del servicio de RSVP. Por favor, contacta a los novios." });
      setIsSubmitting(false);
      return;
    }
    
    const submissionData = {
      timestamp: new Date().toISOString(),
      ...formData,
    };

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        // mode: 'cors', // mode: 'cors' is default. Keep it for clarity if preferred.
        // No-cors mode would hide the error but the request wouldn't work as expected for this use case.
        headers: {
          // 'Content-Type': 'application/json', // This header can sometimes trigger preflight OPTIONS requests.
                                                // Apps Script doPost with e.postData.contents often works better with
                                                // 'text/plain' for simple JSON, avoiding preflight. But let's test default first.
                                                // For robustness with JSON.parse(e.postData.contents) in Apps Script,
                                                // sending as application/json is technically more correct.
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        let errorDetails = `Error del servidor de Google Sheets: ${response.status} ${response.statusText}.`;
        try {
            const errorData = await response.json();
            errorDetails += ` Detalles: ${errorData.message || JSON.stringify(errorData.error) || 'No se pudieron obtener más detalles.'}`;
        } catch (parseError) {
            const textError = await response.text();
            errorDetails += ` Respuesta no JSON: ${textError || 'No se pudo leer la respuesta.'}`;
        }
        throw new Error(errorDetails);
      }
      
      // const result = await response.json(); 
      // console.log("Respuesta de Apps Script:", result); // Useful for debugging what Apps Script returns

      let successMessageText = formData.attending === 'yes' ? RSVP_SUCCESS_MESSAGE : RSVP_THANK_YOU_NO_ATTEND;

      if (formData.attending === 'yes' && API_KEY) {
        try {
            const personalizedMessage = await generatePersonalizedMessage(formData.name);
            successMessageText += ` ${personalizedMessage}`;
        } catch (geminiError) {
            console.error("Error al generar mensaje con Gemini:", geminiError);
            successMessageText += " ¡Estamos muy contentos de que nos acompañes!"; // Fallback Gemini message
        }
      } else if (formData.attending === 'yes' && !API_KEY) {
        console.warn(API_KEY_ERROR_MESSAGE);
        successMessageText += " (Mensaje personalizado no disponible).";
      }
      
      setSubmissionStatus({ type: formData.attending === 'yes' ? 'success' : 'info', message: successMessageText });
      setFormData(initialFormData); // Reset form

    } catch (error: any) {
      console.error("Error al enviar RSVP a Google Sheets:", error);
      let userErrorMessage = RSVP_SUBMIT_ERROR_SHEET;
      if (error.message && error.message.toLowerCase().includes('failed to fetch')) {
        userErrorMessage = "Error de red o conexión al intentar enviar tu RSVP. Por favor, verifica tu conexión y la consola del navegador (F12) para más detalles (busca errores de CORS o red). Asegúrate también que el script de Google esté correctamente desplegado y accesible.";
      } else if (error.message) {
        userErrorMessage = `${RSVP_SUBMIT_ERROR_SHEET} (${error.message})`;
      } else {
        userErrorMessage = `${RSVP_SUBMIT_ERROR_SHEET} (${GENERIC_ERROR_MESSAGE})`;
      }
      setSubmissionStatus({ type: 'error', message: userErrorMessage });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, initialFormData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-xl text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-cormorant text-lg">Nombre completo</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 font-cormorant text-lg">¿Asistirás?</legend>
        <div className="mt-2 space-y-2 sm:space-y-0 sm:flex sm:space-x-4">
          {['yes', 'no'].map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={`attending-${option}`}
                name="attending"
                type="radio"
                value={option}
                checked={formData.attending === option}
                onChange={handleChange}
                required
                className="focus:ring-gold h-4 w-4 text-gold border-gray-300"
              />
              <label htmlFor={`attending-${option}`} className="ml-2 block text-sm text-gray-900">
                {option === 'yes' ? 'Sí, ¡allí estaré!' : 'No, lamentablemente no podré'}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {formData.attending === 'yes' && (
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 font-cormorant text-lg">Número de acompañantes adultos (además de ti)</label>
          <input
            type="number"
            name="guests"
            id="guests"
            value={formData.guests}
            onChange={handleChange}
            min="0"
            max="5" // Example max
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
          />
        </div>
      )}

      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 font-cormorant text-lg">
          Alergias o restricciones alimentarias (opcional)
        </label>
        <textarea
          name="dietaryRestrictions"
          id="dietaryRestrictions"
          rows={3}
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
          placeholder="Ej: vegetariano, alergia al maní..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 font-cormorant text-lg">
          Déjanos un mensaje (opcional)
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
          placeholder="¡Felicidades! / ¡No podemos esperar!"
        />
      </div>

      {submissionStatus && (
        <div className={`p-4 rounded-md text-sm ${
          submissionStatus.type === 'success' ? 'bg-green-100 text-green-700' :
          submissionStatus.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700' // info
        }`}>
          {submissionStatus.message}
        </div>
      )}

      <div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Confirmar Asistencia'}
        </Button>
      </div>
    </form>
  );
};
