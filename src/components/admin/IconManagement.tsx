
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { sanitizeSVG } from '@/utils/security';

const IconManagement: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIcon, setEditingIcon] = useState<any>(null);
  const [formData, setFormData] = useState({
    icon_name: '',
    display_name: '',
    icon_svg: '',
    category: 'room'
  });

  const queryClient = useQueryClient();

  // Fetch icons
  const { data: icons = [], isLoading } = useQuery({
    queryKey: ['property-icons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_icons')
        .select('*')
        .order('category', { ascending: true })
        .order('display_name', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingIcon) {
        const { error } = await supabase
          .from('property_icons')
          .update(data)
          .eq('id', editingIcon.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('property_icons')
          .insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-icons'] });
      toast({
        title: "Başarılı",
        description: editingIcon ? "İkon güncellendi" : "İkon eklendi"
      });
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('property_icons')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-icons'] });
      toast({
        title: "Başarılı",
        description: "İkon silindi"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleEdit = (icon: any) => {
    setEditingIcon(icon);
    setFormData({
      icon_name: icon.icon_name,
      display_name: icon.display_name,
      icon_svg: icon.icon_svg,
      category: icon.category
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu ikonu silmek istediğinizden emin misiniz?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingIcon(null);
    setFormData({
      icon_name: '',
      display_name: '',
      icon_svg: '',
      category: 'room'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const categories = [
    { value: 'room', label: 'Oda' },
    { value: 'facility', label: 'Tesis' },
    { value: 'amenity', label: 'Konfor' },
    { value: 'other', label: 'Diğer' }
  ];

  if (isLoading) {
    return <div className="flex justify-center py-8">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">İkon Yönetimi</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni İkon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingIcon ? 'İkon Düzenle' : 'Yeni İkon Ekle'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="icon_name">İkon Adı</Label>
                <Input
                  id="icon_name"
                  value={formData.icon_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon_name: e.target.value }))}
                  placeholder="bedroom-modern"
                  required
                />
              </div>
              <div>
                <Label htmlFor="display_name">Görünen Ad</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  placeholder="Yatak Odası - Modern"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="icon_svg">SVG Kodu</Label>
                <Textarea
                  id="icon_svg"
                  value={formData.icon_svg}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon_svg: e.target.value }))}
                  placeholder="<svg>...</svg>"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  İptal
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {icons.map((icon) => (
          <Card key={icon.id}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{ __html: sanitizeSVG(icon.icon_svg) }}
                  />
                  {icon.display_name}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(icon)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(icon.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">Kategori: {icon.category}</p>
              <p className="text-xs text-gray-500">Kod: {icon.icon_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IconManagement;
