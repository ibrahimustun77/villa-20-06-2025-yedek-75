
import { Json } from "@/integrations/supabase/types";

export interface VillaType {
  id: string;
  name: string;
  description: string | null;
  color: string;
  created_at: string;
  updated_at: string;
  sort_order: number | null;
}

export interface FeatureGroup {
  category: string;
  features: string[];
}

export interface Villa {
  id: string;
  villa_type_id: string;
  name: string;
  description: string | null;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  living_rooms: number | null;
  halls: number | null;
  features: string[] | null;
  feature_groups: FeatureGroup[] | null;
  coordinates: { x: number; y: number } | null;
  image_urls: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  villa_details: string | null;
  detail_gallery_images: string[] | null;
  villa_types?: VillaType;
  // Icon fields for room details
  bedroom_icon_id?: string;
  bathroom_icon_id?: string;
  living_room_icon_id?: string;
  hall_icon_id?: string;
}
