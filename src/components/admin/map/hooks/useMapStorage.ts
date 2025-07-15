
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Villa, Road } from '../types/mapTypes';
import { saveDataToSupabase } from '../services/mapService';
import { saveDataToLocalStorage } from '../services/localStorageService';

export const useMapStorage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveChangesToStorage = async (villas: Villa[], roads: Road[], backgroundImage: string | null) => {
    try {
      setIsLoading(true);
      
      // Always save to localStorage as backup
      saveDataToLocalStorage(villas, roads, backgroundImage);
      
      // Save to Supabase
      const supabaseSaveSuccess = await saveDataToSupabase(villas, roads, backgroundImage);
      
      if (supabaseSaveSuccess) {
        toast({
          title: "Başarılı",
          description: "Tüm değişiklikler kaydedildi",
          duration: 3000
        });
        console.log("Veriler Supabase'e kaydedildi");
      } else {
        toast({
          title: "Kısmi Başarı",
          description: "Veriler sadece yerel depolama alanına kaydedilebildi",
          variant: "destructive",
          duration: 4000
        });
        console.warn("Veriler sadece yerel depolama alanına kaydedildi. Supabase hatası!");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      
      // Still save to localStorage as backup
      saveDataToLocalStorage(villas, roads, backgroundImage);
      
      toast({
        title: "Hata",
        description: "Kaydetme sırasında hata oluştu",
        variant: "destructive",
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    saveChangesToStorage
  };
};
