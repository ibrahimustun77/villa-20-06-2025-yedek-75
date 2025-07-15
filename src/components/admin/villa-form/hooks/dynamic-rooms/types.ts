
export interface RoomType {
  id: string;
  name: string;
  display_name: string;
  icon_category: string;
  default_icon_id: string | null;
  sort_order: number;
  is_manual?: boolean;
}

export interface RoomCount {
  room_type_id: string;
  count: number;
  icon_id: string;
  room_type_name?: string;
  room_type_display_name?: string;
  is_manual?: boolean;
}
