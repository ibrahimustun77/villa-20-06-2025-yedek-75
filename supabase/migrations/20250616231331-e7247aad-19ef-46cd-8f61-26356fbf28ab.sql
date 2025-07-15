
-- Villa tiplerine sıralama kolonu ekle
ALTER TABLE villa_types ADD COLUMN sort_order INTEGER;

-- Mevcut villa tiplerine varsayılan sıralama değerleri ata
UPDATE villa_types SET sort_order = 1 WHERE name = 'ThermaNOVA';
UPDATE villa_types SET sort_order = 2 WHERE name = 'ThermaQUADRA';
UPDATE villa_types SET sort_order = 3 WHERE name = 'ThermaTRIO';
UPDATE villa_types SET sort_order = 4 WHERE name = 'ThermaTWIN';

-- Eğer başka villa tipleri varsa onlara da sıralama değeri ata
UPDATE villa_types SET sort_order = 5 WHERE sort_order IS NULL;
