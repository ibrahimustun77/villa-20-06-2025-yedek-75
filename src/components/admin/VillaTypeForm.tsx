
import React, { useState, useEffect, FormEvent } from 'react';
import { VillaType } from '@/services/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createVillaType, updateVillaType } from '@/services/villaTypeService';

interface VillaTypeFormProps {
  villaType?: VillaType | null;
  onComplete: () => void;
}

const VillaTypeForm: React.FC<VillaTypeFormProps> = ({ villaType, onComplete }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#e94560');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Renk seçenekleri
  const colorOptions = [
    { value: '#9bb5ff', name: 'Açık Mavi' },
    { value: '#e94560', name: 'Kırmızı' },
    { value: '#c73650', name: 'Koyu Kırmızı' },
    { value: '#4f46e5', name: 'Mor' },
    { value: '#10b981', name: 'Yeşil' },
    { value: '#f59e0b', name: 'Turuncu' },
    { value: '#ef4444', name: 'Kırmızı' },
    { value: '#8b5cf6', name: 'Menekşe' },
  ];

  useEffect(() => {
    if (villaType) {
      setName(villaType.name);
      setDescription(villaType.description || '');
      setColor(villaType.color || '#e94560');
    } else {
      setName('');
      setDescription('');
      setColor('#e94560');
    }
  }, [villaType]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (villaType && villaType.id) {
        // Update existing villa type
        const updatedVillaType = await updateVillaType(villaType.id, { name, description, color });
        if (!updatedVillaType) throw new Error('Villa tipi güncellenemedi.');
        toast({ title: "Başarılı", description: "Villa tipi güncellendi." });
      } else {
        // Create new villa type
        const newVillaType = await createVillaType({ name, description, color });
        if (!newVillaType) throw new Error('Villa tipi oluşturulamadı.');
        toast({ title: "Başarılı", description: "Villa tipi oluşturuldu." });
      }
      onComplete();
    } catch (error) {
      toast({
        title: "Hata",
        description: (error as Error).message || "Bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Villa Tipi Adı</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Örn: Standart Villa, Lüks Villa"
        />
      </div>
      <div>
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Villa tipi hakkında kısa açıklama"
        />
      </div>
      <div>
        <Label htmlFor="color">Renk</Label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 p-1 rounded border cursor-pointer"
            />
            <span className="text-sm text-gray-600">{color}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setColor(option.value)}
                className={`w-full h-10 rounded border-2 ${
                  color === option.value ? 'border-gray-800' : 'border-gray-300'
                } hover:border-gray-600 transition-colors`}
                style={{ backgroundColor: option.value }}
                title={option.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onComplete} disabled={isSubmitting}>
          İptal
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-therma hover:bg-therma-dark">
          {isSubmitting ? 'Kaydediliyor...' : (villaType ? 'Güncelle' : 'Oluştur')}
        </Button>
      </div>
    </form>
  );
};

export default VillaTypeForm;
