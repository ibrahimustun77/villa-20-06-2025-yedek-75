
import { Villa, Road } from '../types/mapTypes';

// Initial villa data
export const initialVillas: Villa[] = [
  { id: 1, type: 'type-a', x: 20, y: 20 },
  { id: 2, type: 'type-a', x: 20, y: 45 },
  { id: 3, type: 'type-a', x: 20, y: 70 },
  { id: 4, type: 'type-b', x: 50, y: 20 },
  { id: 5, type: 'type-b', x: 50, y: 45 },
  { id: 6, type: 'type-b', x: 50, y: 70 },
  { id: 7, type: 'type-c', x: 80, y: 20 },
  { id: 8, type: 'type-c', x: 80, y: 45 },
  { id: 9, type: 'type-c', x: 80, y: 70 },
  { id: 10, type: 'type-a', x: 35, y: 30 },
  { id: 11, type: 'type-a', x: 35, y: 60 },
  { id: 12, type: 'type-b', x: 65, y: 30 },
  { id: 13, type: 'type-b', x: 65, y: 60 },
  { id: 14, type: 'type-c', x: 50, y: 90 },
  { id: 15, type: 'type-c', x: 50, y: 10 },
];

export const initialRoads: Road[] = [
  { id: 1, orientation: 'horizontal', position: 50, start: 0, end: 100, thickness: 8 },
  { id: 2, orientation: 'vertical', position: 50, start: 0, end: 100, thickness: 8 },
];
