
export interface GalleryImage {
  id: string;
  url: string;
  image_url: string;
  alt: string;
  alt_text: string;
  title: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryFormData {
  image_url: string;
  title: string;
  category: string;
  alt_text: string;
  order_index: number;
  is_active: boolean;
}

export const CATEGORIES = [
  { value: 'villa', label: 'Villa' },
  { value: 'landscape', label: 'Manzara' },
  { value: 'interior', label: 'İç Mekan' },
  { value: 'exterior', label: 'Dış Mekan' },
  { value: 'amenities', label: 'Olanaklar' }
];
