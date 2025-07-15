
-- Villa room counts tablosundaki tüm kayıtları sil
DELETE FROM villa_room_counts;

-- Villa type displays tablosundaki oda sayılarını sıfırla
UPDATE villa_type_displays SET
  display_bedrooms = 0,
  display_bathrooms = 0,
  display_living_rooms = 0,
  display_halls = 0;

-- Villas tablosundaki oda sayılarını sıfırla
UPDATE villas SET
  bedrooms = 0,
  bathrooms = 0,
  living_rooms = 0,
  halls = 0;
