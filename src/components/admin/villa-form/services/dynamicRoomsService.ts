
import { syncVillaRoomCounts } from './villaRoomCountsService';

export const saveDynamicRooms = async (villaId: string, dynamicRooms: any[]) => {
  return syncVillaRoomCounts(villaId, dynamicRooms);
};
