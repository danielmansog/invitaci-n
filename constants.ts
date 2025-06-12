
import { GalleryImage } from './types';

export const WEDDING_DETAILS = {
  groomName: "Daniel",
  brideName: "Delys",
  weddingDate: "14 de marzo del 2026",
  weddingDateTime: "Mar 14, 2026 17:00:00", // For countdown
  ourStoryParagraph: "Nuestra aventura comenzó hace unos maravillosos años, en un encuentro casual que el destino había preparado. Desde ese primer día, supimos que habíamos encontrado algo verdaderamente especial. Hemos compartido incontables risas, sueños ambiciosos y hemos superado juntos cada desafío, fortaleciendo un amor que hoy nos lleva al altar con alegría y emoción. Esta es solo una página más en el hermoso libro que estamos escribiendo juntos, una historia de complicidad, apoyo y amor incondicional.",
  receptionTime: "19:30",
  receptionVenue: "Finca \"La Montaña\"",
  receptionAddress: "Av. Amazonas Central, 2, 4, 28300 Aranjuez, Madrid",
  receptionMapsLink: "https://maps.app.goo.gl/uXBW4oN33Z19bt4w8",
  dressCode: "Formal",
  dressCodeDescription: "Queremos que todos se vean y sientan espectaculares para celebrar este día tan especial.",
  rsvpDeadline: "1 de Febrero del 2026",
  heroImageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2070&auto=format&fit=crop",
  galleryImages: [
    { src: "https://picsum.photos/seed/wedding1/600/400", alt: "Recuerdo especial de Daniel y Delys" },
    { src: "https://picsum.photos/seed/wedding2/600/400", alt: "Momento feliz de la pareja" },
    { src: "https://picsum.photos/seed/wedding3/600/400", alt: "Daniel y Delys sonriendo juntos" },
    { src: "https://picsum.photos/seed/wedding4/600/400", alt: "Aventura de la pareja" },
  ] as GalleryImage[],
  footerText: "Hecho con amor por Daniel y Delys | 2026",
};

export const API_KEY = process.env.API_KEY;

// !! IMPORTANTE: Asegúrate de que esta URL sea tu ID de despliegue de Google Apps Script real. No uses el placeholder de abajo. !!
export const GOOGLE_APPS_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbwOmMJL1PIVT382QCIDsz83R_iUKukR0b6nSrGOBsmk0wBDNl4iU_bqoIR2TFGmPpc1/exec';
export const PLACEHOLDER_GOOGLE_APPS_SCRIPT_URL: string = 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec';


export const API_KEY_ERROR_MESSAGE = "La clave API de Google Generative AI no está configurada. Por favor, contacta a los novios o al administrador.";
export const GENERIC_ERROR_MESSAGE = "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.";
export const RSVP_SUBMIT_ERROR_SHEET = "No se pudo guardar tu confirmación en este momento. Por favor, inténtalo de nuevo o contacta a los novios.";
export const RSVP_SUCCESS_MESSAGE = "¡Gracias por confirmar tu asistencia!";
export const RSVP_THANK_YOU_NO_ATTEND = "Lamentamos que no puedas acompañarnos. ¡Te tendremos en nuestros pensamientos!";


export const GEMINI_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";