
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGalleryManagement } from './gallery/hooks/useGalleryManagement';
import GalleryFilter from './gallery/components/GalleryFilter';
import GalleryImageCard from './gallery/components/GalleryImageCard';
import GalleryImageDialogEnhanced from './gallery/components/GalleryImageDialogEnhanced';
import CategoryManagement from './CategoryManagement';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const GalleryManagementEnhanced: React.FC = () => {
  const {
    // State
    images,
    filteredImages,
    isLoading,
    isDialogOpen,
    editingImage,
    formData,
    imageFile,
    uploading,
    selectedCategory,
    
    // Actions
    setFormData,
    setImageFile,
    setSelectedCategory,
    handleSubmit,
    handleDelete,
    resetForm,
    openEditDialog,
    openAddDialog
  } = useGalleryManagement();

  // Fetch categories for the filter
  const { data: categories = [] } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Galeri yükleniyor...</div>;
  }

  return (
    <Tabs defaultValue="gallery" className="space-y-6">
      <TabsList>
        <TabsTrigger value="gallery">Galeri Resimleri</TabsTrigger>
        <TabsTrigger value="categories">Kategori Yönetimi</TabsTrigger>
      </TabsList>

      <TabsContent value="gallery" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Galeri Yönetimi</h2>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Resim Ekle
          </Button>
        </div>

        <GalleryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <GalleryImageCard
              key={image.id}
              image={image}
              onEdit={() => openEditDialog(image)}
              onDelete={() => handleDelete(image.id, image.image_url)}
            />
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {selectedCategory === 'all' 
              ? 'Henüz galeri resmi eklenmemiş.' 
              : 'Seçilen kategoride resim bulunamadı.'}
          </div>
        )}

        <GalleryImageDialogEnhanced
          isOpen={isDialogOpen}
          onClose={resetForm}
          editingImage={editingImage}
          formData={formData}
          setFormData={setFormData}
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploading={uploading}
          onSubmit={handleSubmit}
          categories={categories}
        />
      </TabsContent>

      <TabsContent value="categories">
        <CategoryManagement />
      </TabsContent>
    </Tabs>
  );
};

export default GalleryManagementEnhanced;
