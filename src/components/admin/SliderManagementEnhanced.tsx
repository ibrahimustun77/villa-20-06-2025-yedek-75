
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { useSliderManagement } from './slider/hooks/useSliderManagement';
import { sliderOperations } from './slider/services/sliderOperations';
import SliderFormDialog from './slider/components/SliderFormDialog';
import SliderImageTable from './slider/components/SliderImageTable';
import SliderImagePreview from './slider/components/SliderImagePreview';

const PAGE_TYPES = [
  { value: 'home', label: 'Anasayfa' },
  { value: 'about', label: 'Hakkında' },
  { value: 'villas', label: 'Villalar' },
  { value: 'gallery', label: 'Galeri' },
  { value: 'contact', label: 'İletişim' }
];

const SliderManagementEnhanced: React.FC = () => {
  const {
    activePageType,
    isDialogOpen,
    editingSlider,
    selectedImages,
    previewImage,
    formData,
    filteredImages,
    isLoading,
    setActivePageType,
    setSelectedImages,
    setPreviewImage,
    setFormData,
    handleMediaSelect,
    resetForm,
    openEditDialog,
    openAddDialog,
    invalidateQueries
  } = useSliderManagement();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sliderOperations.submit(formData, editingSlider, activePageType, filteredImages);
    if (success) {
      invalidateQueries();
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    const success = await sliderOperations.delete(id);
    if (success) {
      invalidateQueries();
      await sliderOperations.reorderImages(filteredImages, selectedImages);
    }
  };

  const handleBulkDelete = async () => {
    const success = await sliderOperations.bulkDelete(selectedImages);
    if (success) {
      invalidateQueries();
      setSelectedImages([]);
      await sliderOperations.reorderImages(filteredImages, selectedImages);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const success = await sliderOperations.toggleActive(id, isActive);
    if (success) {
      invalidateQueries();
    }
  };

  const handleMoveUp = async (slider: any) => {
    const success = await sliderOperations.moveUp(slider, filteredImages);
    if (success) {
      invalidateQueries();
    }
  };

  const handleMoveDown = async (slider: any) => {
    const success = await sliderOperations.moveDown(slider, filteredImages);
    if (success) {
      invalidateQueries();
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedImages(filteredImages.map(img => img.id));
    } else {
      setSelectedImages([]);
    }
  };

  const handleSelectImage = (imageId: string, checked: boolean) => {
    if (checked) {
      setSelectedImages(prev => [...prev, imageId]);
    } else {
      setSelectedImages(prev => prev.filter(id => id !== imageId));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Slider resimleri yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Slider Yönetimi</h3>
        <div className="flex gap-2">
          {selectedImages.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Seçilenleri Sil ({selectedImages.length})
            </Button>
          )}
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Slider Resmi Ekle
          </Button>
        </div>
      </div>

      <Tabs value={activePageType} onValueChange={setActivePageType}>
        <TabsList className="grid w-full grid-cols-5">
          {PAGE_TYPES.map(page => (
            <TabsTrigger key={page.value} value={page.value}>
              {page.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PAGE_TYPES.map(page => (
          <TabsContent key={page.value} value={page.value}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium">{page.label} Slider Resimleri</h4>
              </div>

              <SliderImageTable
                images={filteredImages}
                selectedImages={selectedImages}
                onSelectAll={handleSelectAll}
                onSelectImage={handleSelectImage}
                onToggleActive={handleToggleActive}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onEdit={openEditDialog}
                onDelete={handleDelete}
                onPreview={setPreviewImage}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <SliderFormDialog
        isOpen={isDialogOpen}
        onClose={resetForm}
        editingSlider={editingSlider}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onMediaSelect={handleMediaSelect}
      />

      <SliderImagePreview
        imageUrl={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
};

export default SliderManagementEnhanced;
