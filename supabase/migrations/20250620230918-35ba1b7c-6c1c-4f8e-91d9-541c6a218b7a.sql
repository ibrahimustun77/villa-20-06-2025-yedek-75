
-- Clean up all villa room counts data
DELETE FROM villa_room_counts;

-- Clean up manually added room types (is_manual = true ones)
DELETE FROM room_types WHERE is_manual = true;

-- Update basic room types' display_name to Turkish (UTF-8 compatible)
UPDATE room_types SET display_name = 'Yatak Odası' WHERE name = 'bedroom';
UPDATE room_types SET display_name = 'Banyo' WHERE name = 'bathroom';
UPDATE room_types SET display_name = 'Oturma Odası' WHERE name = 'living_room';
UPDATE room_types SET display_name = 'Salon' WHERE name = 'hall';
UPDATE room_types SET display_name = 'Mutfak' WHERE name = 'kitchen';
UPDATE room_types SET display_name = 'Yemek Odası' WHERE name = 'dining_room';
UPDATE room_types SET display_name = 'Çalışma Odası' WHERE name = 'office';
UPDATE room_types SET display_name = 'Balkon' WHERE name = 'balcony';
UPDATE room_types SET display_name = 'Teras' WHERE name = 'terrace';
UPDATE room_types SET display_name = 'Garaj' WHERE name = 'garage';
