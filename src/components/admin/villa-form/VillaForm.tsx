
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVillaForm } from './useVillaForm';
import VillaFormBasicInfo from './VillaFormBasicInfo';
import VillaFormVillaDetailsEnhanced from './VillaFormVillaDetailsEnhanced';
import VillaFormImagesEnhanced from './VillaFormImagesEnhanced';
import VillaFormActions from './VillaFormActions';
import VillaFormDynamicRooms from './VillaFormDynamicRooms';
import VillaFormGroupedFeatures from './VillaFormGroupedFeatures';

interface VillaFormProps {
  editingVilla?: any;
  onClose: () => void;
  isSubmitting: boolean;
  onSubmit: (data: any) => void;
}

const VillaForm: React.FC<VillaFormProps> = ({ 
  editingVilla, 
  onClose, 
  isSubmitting, 
  onSubmit 
}) => {
  console.log('VillaForm - Editing villa:', editingVilla);
  console.log('VillaForm - Editing villa feature_groups:', editingVilla?.feature_groups);

  const villaFormHook = useVillaForm({
    editingVilla,
    onSubmit,
    onClose
  });

  const {
    formData,
    villaTypes,
    handleSubmit,
    uploadingImage,
    updateFormData,
    handleImageAdd,
    handleImageRemove,
    handleDetailImageAdd,
    handleDetailImageRemove,
    handleDetailImagesReorder,
    handleCoverImageSelect,
    handleFieldChange,
    handleSelectChange,
    handleCheckboxChange,
    isAuthenticated
  } = villaFormHook;

  console.log('VillaForm - Current formData.feature_groups:', formData.feature_groups);
  console.log('VillaForm - Current formData.image_urls:', formData.image_urls);

  const handleFeatureGroupsChange = (groups: any) => {
    console.log('VillaForm - Feature groups changed:', groups);
    updateFormData({ feature_groups: groups });
  };

  const handleDynamicRoomsChange = (roomCounts: any[]) => {
    console.log('VillaForm - Dynamic rooms changed:', roomCounts);
    updateFormData({ dynamic_rooms: roomCounts });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle>Temel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent>
          <VillaFormBasicInfo 
            formData={formData}
            villaTypes={villaTypes}
            onFieldChange={handleFieldChange}
            onSelectChange={handleSelectChange}
            onCheckboxChange={handleCheckboxChange}
          />
        </CardContent>
      </Card>

      <VillaFormDynamicRooms
        villaId={editingVilla?.id}
        onChange={handleDynamicRoomsChange}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Öne Çıkan Özellikler (Gruplandırılmış)
            <span className="text-sm font-normal text-gray-500">
              ({formData.feature_groups?.length || 0} grup)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VillaFormGroupedFeatures
            featureGroups={formData.feature_groups || []}
            onFeatureGroupsChange={handleFeatureGroupsChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Villa Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <VillaFormVillaDetailsEnhanced 
            villaDetails={formData.villa_details || ''}
            detailGalleryImages={formData.detail_gallery_images || []}
            onVillaDetailsChange={(value) => updateFormData({ villa_details: value })}
            onDetailImageAdd={handleDetailImageAdd}
            onDetailImageRemove={handleDetailImageRemove}
            onDetailImagesReorder={handleDetailImagesReorder}
            uploadingImage={uploadingImage}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Villa Görselleri
            <span className="text-sm font-normal text-gray-500">
              ({formData.image_urls?.length || 0} görsel)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VillaFormImagesEnhanced
            images={formData.image_urls || []}
            uploadingImage={uploadingImage}
            onImageAdd={handleImageAdd}
            onImageRemove={handleImageRemove}
            onCoverImageSelect={handleCoverImageSelect}
          />
        </CardContent>
      </Card>

      <VillaFormActions 
        isSubmitting={isSubmitting}
        isEditing={!!editingVilla}
        isAuthenticated={isAuthenticated}
        onCancel={onClose}
      />
    </form>
  );
};

export default VillaForm;
