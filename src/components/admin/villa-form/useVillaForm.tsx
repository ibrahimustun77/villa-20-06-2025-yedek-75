
import { useQuery } from '@tanstack/react-query';
import { fetchVillaTypes } from '@/services/villaService';
import { Villa } from '@/services/types';
import { useVillaFormData } from './hooks/useVillaFormData';
import { useVillaFormHandlers } from './hooks/useVillaFormHandlers';
import { useVillaImageHandlersEnhanced } from './hooks/useVillaImageHandlersEnhanced';
import { useVillaFormSubmit } from './hooks/useVillaFormSubmit';

interface UseVillaFormProps {
  editingVilla?: Villa;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export const useVillaForm = ({ editingVilla, onSubmit, onClose }: UseVillaFormProps) => {
  // Fetch villa types
  const { data: villaTypes = [] } = useQuery({
    queryKey: ['villaTypes'],
    queryFn: fetchVillaTypes,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Form data management
  const { formData, setFormData } = useVillaFormData(editingVilla, villaTypes);

  // Form handlers
  const {
    handleFieldChange,
    handleSelectChange,
    handleCheckboxChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleCoverImageSelect
  } = useVillaFormHandlers(formData, setFormData);

  // Enhanced image handlers
  const {
    uploadingImage,
    handleImageAdd,
    handleImageRemove,
    handleDetailImageAdd,
    handleDetailImageRemove,
    handleDetailImagesReorder,
    handleCoverImageSelect: enhancedCoverImageSelect
  } = useVillaImageHandlersEnhanced(formData, setFormData);

  // Form submission
  const {
    isSubmitting,
    isAuthenticated,
    handleSubmit: submitVilla
  } = useVillaFormSubmit({ editingVilla, onClose });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('useVillaForm - Form submission with data:', formData);
    console.log('useVillaForm - Feature groups being submitted:', formData.feature_groups);
    
    // Call the submission handler with form data
    await submitVilla(formData);
  };

  const updateFormData = (updates: any) => {
    console.log('Updating form data with:', updates);
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      console.log('New form data after update:', newData);
      return newData;
    });
  };

  return {
    formData,
    villaTypes,
    isSubmitting,
    uploadingImage,
    isAuthenticated,
    handleFieldChange,
    handleSelectChange,
    handleCheckboxChange,
    handleFeatureAdd,
    handleFeatureRemove,
    handleImageAdd,
    handleImageRemove,
    handleCoverImageSelect: enhancedCoverImageSelect,
    handleDetailImageAdd,
    handleDetailImageRemove,
    handleDetailImagesReorder,
    handleSubmit,
    updateFormData
  };
};
