
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X } from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  display_name: string;
  icon_category: string;
  sort_order: number;
  is_active: boolean;
  is_manual?: boolean;
}

const RoomTypeManagement: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: roomTypes = [], isLoading } = useQuery({
    queryKey: ['room-types-management'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_types')
        .select('*')
        .order('sort_order');
      
      if (error) throw error;
      return data as RoomType[];
    }
  });

  const updateRoomTypeMutation = useMutation({
    mutationFn: async ({ id, display_name }: { id: string; display_name: string }) => {
      const { error } = await supabase
        .from('room_types')
        .update({ display_name })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-types-management'] });
      queryClient.invalidateQueries({ queryKey: ['room-types'] });
      queryClient.invalidateQueries({ queryKey: ['villa-room-counts'] });
      setEditingId(null);
      setEditValue('');
      toast({
        title: "Başarılı",
        description: "Oda tipi adı güncellendi.",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Oda tipi güncellenirken hata oluştu: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleEdit = (roomType: RoomType) => {
    setEditingId(roomType.id);
    setEditValue(roomType.display_name);
  };

  const handleSave = () => {
    if (editingId && editValue.trim()) {
      updateRoomTypeMutation.mutate({
        id: editingId,
        display_name: editValue.trim()
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (isLoading) {
    return <div className="text-center py-4">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Oda Tipi Yönetimi</h2>
      </div>

      <div className="grid gap-4">
        {roomTypes.map((roomType) => (
          <Card key={roomType.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {editingId === roomType.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Label htmlFor={`edit-${roomType.id}`} className="sr-only">
                      Oda tipi adı
                    </Label>
                    <Input
                      id={`edit-${roomType.id}`}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1"
                      placeholder="Oda tipi adı"
                    />
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={updateRoomTypeMutation.isPending}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span>{roomType.display_name}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(roomType)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p><strong>Sistem Adı:</strong> {roomType.name}</p>
                <p><strong>Kategori:</strong> {roomType.icon_category}</p>
                <p><strong>Sıralama:</strong> {roomType.sort_order}</p>
                {roomType.is_manual && (
                  <p><span className="text-blue-600 font-medium">Manuel eklenen oda tipi</span></p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomTypeManagement;
