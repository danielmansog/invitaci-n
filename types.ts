
export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface RsvpFormData {
  name: string;
  attending: 'yes' | 'no' | '';
  guests: number;
  dietaryRestrictions: string;
  message: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}
