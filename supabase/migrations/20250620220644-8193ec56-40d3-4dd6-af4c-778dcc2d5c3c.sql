
-- Manuel oda tiplerini geçici olarak kaydetmek için room_types tablosuna bir alan ekleyelim
ALTER TABLE room_types ADD COLUMN is_manual boolean DEFAULT false;

-- Villa room counts tablosundaki geçersiz UUID'leri temizleyelim
DELETE FROM villa_room_counts WHERE room_type_id::text LIKE 'manual_%';
