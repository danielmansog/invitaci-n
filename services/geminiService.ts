
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { API_KEY, GEMINI_MODEL_TEXT, API_KEY_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE } from '../constants';

if (!API_KEY) {
  console.error(API_KEY_ERROR_MESSAGE);
  // Potentially throw an error or handle this state globally in the app
  // For now, functions will check API_KEY and return a fallback or throw.
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generatePersonalizedMessage = async (name: string): Promise<string> => {
  if (!ai) {
    console.error("Gemini API client not initialized due to missing API key.");
    return `¡Gracias por confirmar, ${name}! Estamos emocionados de celebrar contigo.`; // Fallback message
  }

  const prompt = `Eres un asistente amigable para una boda. 
  ${name} acaba de confirmar su asistencia a la boda de Daniel y Delys. 
  Genera un mensaje de agradecimiento corto (1-2 frases), alegre y personalizado para ${name}. 
  Haz que se sienta especial y bienvenido. No incluyas nada sobre regalos.
  Ejemplos: 
  - ¡Qué alegría que vengas, ${name}! Daniel y Delys están muy emocionados de verte.
  - ¡Fantástico, ${name}! Tu presencia hará que el día sea aún más especial.
  - ¡${name}, maravilloso! Prepárate para una celebración inolvidable.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      // No specific thinkingConfig, default is fine for quality.
    });
    
    // Using response.text directly as per guidelines
    const messageText = response.text;
    
    if (messageText) {
      return messageText.trim();
    } else {
      console.warn("Gemini response was empty or malformed.");
      return `¡Gracias por tu confirmación, ${name}! Será un placer tenerte con nosotros.`; // Fallback
    }

  } catch (error) {
    console.error("Error al generar mensaje personalizado con Gemini:", error);
    // Provide a graceful fallback
    return `¡Gracias por confirmar, ${name}! Estamos muy contentos de que nos acompañes en este día tan especial.`;
  }
};
