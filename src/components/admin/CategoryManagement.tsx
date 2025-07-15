
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  value: string;
  created_at: string;
  updated_at: string;
}

const CategoryManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', value: '' });
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('gallery_categories')
          .update(formData)
          .eq('id', editingCategory.id);
        
        if (error) throw error;
        
        toast({
          title: 'Başarılı',
          description: 'Kategori güncellendi'
        });
      } else {
        const { error } = await supabase
          .from('gallery_categories')
          .insert(formData);
        
        if (error) throw error;
        
        toast({
          title: 'Başarılı',
          description: 'Kategori eklendi'
        });
      }

      queryClient.invalidateQueries({ queryKey: ['gallery-categories'] });
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('gallery_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['gallery-categories'] });
      toast({
        title: 'Başarılı',
        description: 'Kategori silindi'
      });
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', value: '' });
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, value: category.value });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setFormData({ name: '', value: '' });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Kategoriler yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Galeri Kategorileri</h3>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Kategori Ekle
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kategori Adı</TableHead>
            <TableHead>Değer</TableHead>
            <TableHead>Oluşturulma</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.value}</TableCell>
              <TableCell>{new Date(category.created_at).toLocaleDateString('tr-TR')}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openEditDialog(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Henüz kategori eklenmemiş.
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Kategori Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Kategori adı"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="value">Kategori Değeri</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                placeholder="kategori-degeri"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Otomatik olarak küçük harfe çevrilir ve boşluklar tire ile değiştirilir
              </p>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={resetForm}>
                İptal
              </Button>
              <Button type="submit">
                {editingCategory ? 'Güncelle' : 'Ekle'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
