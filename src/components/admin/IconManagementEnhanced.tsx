
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import IconGallery from './villa-form/IconGallery';

interface PropertyIcon {
  id: string;
  icon_name: string;
  icon_svg: string;
  category: string;
  display_name: string;
  created_at: string;
}

const IconManagementEnhanced: React.FC = () => {
  const [newIcon, setNewIcon] = useState({
    icon_name: '',
    display_name: '',
    category: 'room',
    icon_svg: ''
  });
  const [editingIcon, setEditingIcon] = useState<PropertyIcon | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const queryClient = useQueryClient();

  const { data: icons = [], isLoading } = useQuery({
    queryKey: ['property-icons-management'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_icons')
        .select('*')
        .order('category', { ascending: true })
        .order('display_name', { ascending: true });
      
      if (error) throw error;
      return data as PropertyIcon[];
    }
  });

  const createIconMutation = useMutation({
    mutationFn: async (iconData: typeof newIcon) => {
      const { data, error } = await supabase
        .from('property_icons')
        .insert([iconData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İkon başarıyla oluşturuldu" });
      setNewIcon({ icon_name: '', display_name: '', category: 'room', icon_svg: '' });
      setShowCreateDialog(false);
      queryClient.invalidateQueries({ queryKey: ['property-icons-management'] });
    },
    onError: (error: any) => {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  });

  const updateIconMutation = useMutation({
    mutationFn: async (iconData: PropertyIcon) => {
      const { data, error } = await supabase
        .from('property_icons')
        .update({
          icon_name: iconData.icon_name,
          display_name: iconData.display_name,
          category: iconData.category,
          icon_svg: iconData.icon_svg
        })
        .eq('id', iconData.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İkon başarıyla güncellendi" });
      setEditingIcon(null);
      setShowEditDialog(false);
      queryClient.invalidateQueries({ queryKey: ['property-icons-management'] });
    },
    onError: (error: any) => {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  });

  const deleteIconMutation = useMutation({
    mutationFn: async (iconId: string) => {
      const { error } = await supabase
        .from('property_icons')
        .delete()
        .eq('id', iconId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "İkon başarıyla silindi" });
      queryClient.invalidateQueries({ queryKey: ['property-icons-management'] });
    },
    onError: (error: any) => {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  });

  const filteredIcons = selectedCategory === 'all' 
    ? icons 
    : icons.filter(icon => icon.category === selectedCategory);

  const categories = ['room', 'facility', 'amenity'];
  const categoryNames = {
    room: 'Oda',
    facility: 'Tesis',
    amenity: 'Konfor'
  };

  const handleCreateIcon = () => {
    createIconMutation.mutate(newIcon);
  };

  const handleUpdateIcon = () => {
    if (editingIcon) {
      updateIconMutation.mutate(editingIcon);
    }
  };

  const handleDeleteIcon = (iconId: string) => {
    if (confirm('Bu ikonu silmek istediğinizden emin misiniz?')) {
      deleteIconMutation.mutate(iconId);
    }
  };

  if (isLoading) {
    return <div className="p-6">İkonlar yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>İkon Yönetimi</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredIcons.length} ikon
              </Badge>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni İkon
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Yeni İkon Oluştur</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>İkon Adı</Label>
                        <Input
                          value={newIcon.icon_name}
                          onChange={(e) => setNewIcon(prev => ({ ...prev, icon_name: e.target.value }))}
                          placeholder="ikon-adi"
                        />
                      </div>
                      <div>
                        <Label>Görünen Ad</Label>
                        <Input
                          value={newIcon.display_name}
                          onChange={(e) => setNewIcon(prev => ({ ...prev, display_name: e.target.value }))}
                          placeholder="İkon Görünen Adı"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Kategori</Label>
                      <Select value={newIcon.category} onValueChange={(value) => setNewIcon(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>
                              {categoryNames[cat as keyof typeof categoryNames]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>SVG Kodu</Label>
                      <Textarea
                        value={newIcon.icon_svg}
                        onChange={(e) => setNewIcon(prev => ({ ...prev, icon_svg: e.target.value }))}
                        placeholder="<svg>...</svg>"
                        rows={6}
                      />
                    </div>
                    {newIcon.icon_svg && (
                      <div className="p-4 border rounded-lg">
                        <Label>Önizleme:</Label>
                        <div className="mt-2 w-8 h-8" dangerouslySetInnerHTML={{ __html: newIcon.icon_svg }} />
                      </div>
                    )}
                    <Button onClick={handleCreateIcon} disabled={createIconMutation.isPending}>
                      {createIconMutation.isPending ? 'Oluşturuluyor...' : 'İkon Oluştur'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Tümü</TabsTrigger>
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>
                  {categoryNames[cat as keyof typeof categoryNames]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={selectedCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIcons.map((icon) => (
                  <Card key={icon.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6"
                          dangerouslySetInnerHTML={{ __html: icon.icon_svg }}
                        />
                        <div>
                          <h4 className="font-medium text-sm">{icon.display_name}</h4>
                          <p className="text-xs text-gray-500">{icon.icon_name}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categoryNames[icon.category as keyof typeof categoryNames]}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingIcon(icon);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteIcon(icon.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* İkon Galerisi Önizleme */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Galeri Önizleme</h3>
            <div className="border rounded-lg p-4">
              <IconGallery
                selectedIconId=""
                onIconSelect={() => {}}
                category={selectedCategory === 'all' ? 'room' : selectedCategory}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>İkon Düzenle</DialogTitle>
          </DialogHeader>
          {editingIcon && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>İkon Adı</Label>
                  <Input
                    value={editingIcon.icon_name}
                    onChange={(e) => setEditingIcon(prev => prev ? ({ ...prev, icon_name: e.target.value }) : null)}
                  />
                </div>
                <div>
                  <Label>Görünen Ad</Label>
                  <Input
                    value={editingIcon.display_name}
                    onChange={(e) => setEditingIcon(prev => prev ? ({ ...prev, display_name: e.target.value }) : null)}
                  />
                </div>
              </div>
              <div>
                <Label>Kategori</Label>
                <Select 
                  value={editingIcon.category} 
                  onValueChange={(value) => setEditingIcon(prev => prev ? ({ ...prev, category: value }) : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {categoryNames[cat as keyof typeof categoryNames]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>SVG Kodu</Label>
                <Textarea
                  value={editingIcon.icon_svg}
                  onChange={(e) => setEditingIcon(prev => prev ? ({ ...prev, icon_svg: e.target.value }) : null)}
                  rows={6}
                />
              </div>
              {editingIcon.icon_svg && (
                <div className="p-4 border rounded-lg">
                  <Label>Önizleme:</Label>
                  <div className="mt-2 w-8 h-8" dangerouslySetInnerHTML={{ __html: editingIcon.icon_svg }} />
                </div>
              )}
              <Button onClick={handleUpdateIcon} disabled={updateIconMutation.isPending}>
                {updateIconMutation.isPending ? 'Güncelleniyor...' : 'Güncelle'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconManagementEnhanced;
