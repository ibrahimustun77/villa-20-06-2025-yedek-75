
import { useState } from 'react';
import { Road } from '../types/mapTypes';
import { toast } from "../../../../components/ui/use-toast";

export const useRoadManagement = (initialRoads: Road[], initialNextId: number) => {
  const [roads, setRoads] = useState<Road[]>(initialRoads);
  const [editingRoad, setEditingRoad] = useState<Road[] | null>(null);
  const [nextRoadId, setNextRoadId] = useState(initialNextId);

  // Road CRUD operations
  const addNewRoad = () => {
    const newRoad: Road = {
      id: nextRoadId,
      orientation: 'horizontal',
      position: 50,
      start: 0,
      end: 100,
      thickness: 8
    };
    setRoads([...roads, newRoad]);
    setNextRoadId(nextRoadId + 1);
    toast({
      title: "Başarılı",
      description: `Yol #${nextRoadId} eklendi`
    });
  };

  const startEditRoad = (road: Road) => {
    setEditingRoad([road]);
  };

  const cancelEditRoad = () => {
    setEditingRoad(null);
  };

  const saveRoad = () => {
    if (editingRoad) {
      setRoads(roads.map(r => r.id === editingRoad[0].id ? editingRoad[0] : r));
      setEditingRoad(null);
      toast({
        title: "Başarılı",
        description: `Yol #${editingRoad[0].id} güncellendi`
      });
    }
  };

  const deleteRoad = (id: number) => {
    setRoads(roads.filter(road => road.id !== id));
    toast({
      title: "Başarılı",
      description: `Yol #${id} silindi`
    });
  };

  return {
    roads,
    editingRoad,
    setEditingRoad,
    setRoads,
    setNextRoadId,
    addNewRoad,
    startEditRoad,
    cancelEditRoad,
    saveRoad,
    deleteRoad
  };
};
