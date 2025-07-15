
import { Villa, VillaType } from '@/services/types';

export interface VillaFormProps {
  villa?: Villa;
  onComplete: () => void;
}

export interface VillaFormData {
  villa_type_id: string;
  name: string;
  description: string | null;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  living_rooms: number | null;
  halls: number | null;
  features: string[] | null;
  coordinates: { x: number; y: number } | null;
  image_urls: string[] | null;
  is_active: boolean;
  villa_details: string | null;
  detail_gallery_images: string[] | null;
}

export interface VillaFormImagesProps {
  images: string[] | null;
  uploadingImage: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (indexToRemove: number) => void;
  onCoverImageSelect: (imageUrl: string) => void;
  coverImage: string | null;
}

export interface VillaFormFeaturesProps {
  features: string[] | null;
  onFeatureAdd: (feature: string) => void;
  onFeatureRemove: (indexToRemove: number) => void;
}

export interface VillaFormBasicInfoProps {
  formData: VillaFormData;
  villaTypes: VillaType[];
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (checked: boolean) => void;
}

export interface VillaFormDetailsProps {
  formData: VillaFormData;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface VillaFormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  isAuthenticated: boolean;
  onCancel: () => void;
}

export interface VillaFormVillaDetailsProps {
  villaDetails: string;
  detailGalleryImages: string[];
  uploadingImage: boolean;
  onVillaDetailsChange: (value: string) => void;
  onDetailImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetailImageRemove: (index: number) => void;
}
