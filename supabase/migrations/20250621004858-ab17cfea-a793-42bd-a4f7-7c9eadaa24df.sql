
-- First, let's create default room counts for all existing villas that don't have any
INSERT INTO villa_room_counts (villa_id, room_type_id, count, icon_id)
SELECT 
    v.id as villa_id,
    rt.id as room_type_id,
    CASE 
        WHEN rt.name = 'bedroom' THEN COALESCE(v.bedrooms, 0)
        WHEN rt.name = 'bathroom' THEN COALESCE(v.bathrooms, 0)
        WHEN rt.name = 'living_room' THEN COALESCE(v.living_rooms, 0)
        WHEN rt.name = 'hall' THEN COALESCE(v.halls, 0)
        ELSE 0
    END as count,
    NULL as icon_id
FROM villas v
CROSS JOIN room_types rt
WHERE rt.name IN ('bedroom', 'bathroom', 'living_room', 'hall')
    AND rt.is_active = true
    AND NOT EXISTS (
        SELECT 1 FROM villa_room_counts vrc 
        WHERE vrc.villa_id = v.id AND vrc.room_type_id = rt.id
    )
    AND CASE 
        WHEN rt.name = 'bedroom' THEN COALESCE(v.bedrooms, 0)
        WHEN rt.name = 'bathroom' THEN COALESCE(v.bathrooms, 0)
        WHEN rt.name = 'living_room' THEN COALESCE(v.living_rooms, 0)
        WHEN rt.name = 'hall' THEN COALESCE(v.halls, 0)
        ELSE 0
    END > 0;

-- Create a function to sync villa basic room counts from villa_room_counts
CREATE OR REPLACE FUNCTION sync_villa_basic_room_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the villas table with aggregated counts from villa_room_counts
    UPDATE villas SET
        bedrooms = COALESCE((
            SELECT vrc.count 
            FROM villa_room_counts vrc 
            JOIN room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'bedroom'
        ), 0),
        bathrooms = COALESCE((
            SELECT vrc.count 
            FROM villa_room_counts vrc 
            JOIN room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'bathroom'
        ), 0),
        living_rooms = COALESCE((
            SELECT vrc.count 
            FROM villa_room_counts vrc 
            JOIN room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'living_room'
        ), 0),
        halls = COALESCE((
            SELECT vrc.count 
            FROM villa_room_counts vrc 
            JOIN room_types rt ON vrc.room_type_id = rt.id 
            WHERE vrc.villa_id = COALESCE(NEW.villa_id, OLD.villa_id) 
            AND rt.name = 'hall'
        ), 0)
    WHERE id = COALESCE(NEW.villa_id, OLD.villa_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically sync villa basic room counts
CREATE TRIGGER sync_villa_rooms_on_insert
    AFTER INSERT ON villa_room_counts
    FOR EACH ROW
    EXECUTE FUNCTION sync_villa_basic_room_counts();

CREATE TRIGGER sync_villa_rooms_on_update
    AFTER UPDATE ON villa_room_counts
    FOR EACH ROW
    EXECUTE FUNCTION sync_villa_basic_room_counts();

CREATE TRIGGER sync_villa_rooms_on_delete
    AFTER DELETE ON villa_room_counts
    FOR EACH ROW
    EXECUTE FUNCTION sync_villa_basic_room_counts();
