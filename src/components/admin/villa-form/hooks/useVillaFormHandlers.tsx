
import React from 'react';

export const useVillaFormHandlers = (formData: any, setFormData: any) => {
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, value?: string) => {
    if (typeof e === 'string') {
      // Handle direct field name and value
      setFormData((prev: any) => ({
        ...prev,
        [e]: value
      }));
    } else {
      // Handle event object
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      is_active: checked
    }));
  };

  const handleFeatureAdd = (feature: string) => {
    if (feature.trim() && !formData.features?.includes(feature)) {
      setFormData((prev: any) => ({
        ...prev,
        features: [...(prev.features || []), feature]
      }));
    }
  };

  const handleFeatureRemove = (indexToRemove: number) => {
    setFormData((prev: any) => ({
      ...prev,
      features: (prev.features || []).filter((_: any, index: number) => index !== indexToRemove)
    }));
  };

  const handleCoverImageSelect = (imageUrl: string) => {
    console.log('Setting cover image to:', imageUrl);
    // For now, we'll just log this since we removed display_image
    // The first image in image_urls array will be considered the cover image
  };

  return {
    handleFieldChange,
    handleSelectChange,
    handleCheckboxChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleCoverImageSelect
  };
};
