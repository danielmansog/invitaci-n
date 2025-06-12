
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
  googleFormRsvpUrl: "https://forms.gle/TU_URL_A_TU_GOOGLE_FORM", 
  heroImageUrl: "./assets/images/foto4.jpg", // Actualizado a imagen local
  galleryImages: [
    { src: "./assets/images/foto1.jpg", alt: "Daniel y Delys - Recuerdo 1" },
    { src: "./assets/images/foto2.jpg", alt: "Daniel y Delys - Recuerdo 2" },
    { src: "./assets/images/foto3.jpg", alt: "Daniel y Delys - Recuerdo 3" },
    { src: "./assets/images/foto4.jpg", alt: "Daniel y Delys - Recuerdo 4" },
    // Puedes añadir más imágenes aquí siguiendo el mismo formato
    // { src: "./assets/images/foto4.jpg", alt: "Daniel y Delys - Recuerdo 5" },
  ] as GalleryImage[],
  footerText: "Hecho con amor por Daniel y Delys | 2026",
};

export const RSVP_SUCCESS_MESSAGE = "¡Gracias por confirmar tu asistencia!";
