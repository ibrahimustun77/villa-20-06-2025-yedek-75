
import React from 'react';
import { Edit, Save, Trash2, X } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../ui/table';
import { Input } from '../../ui/input';

interface Road {
  id: number;
  orientation: 'horizontal' | 'vertical';
  position: number;
  start: number;
  end: number;
  thickness: number;
}

interface RoadTableProps {
  roads: Road[];
  editingRoad: Road[] | null;
  onEdit: (road: Road) => void;
  onDelete: (id: number) => void;
  onSave: () => void;
  onCancel: () => void;
  setEditingRoad: (road: Road[]) => void;
  onAdd: () => void;
}

const RoadTable: React.FC<RoadTableProps> = ({
  roads,
  editingRoad,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  setEditingRoad,
  onAdd
}) => {
  const calculateRoadLength = (road: Road): number => {
    return road.end - road.start;
  };
  
  return (
    <div className="glass-card p-6 rounded-xl overflow-auto max-h-[800px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Yollar</h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-therma text-white rounded-lg hover:bg-therma-dark transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Yeni Yol
        </button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Yön</TableHead>
            <TableHead>Konum</TableHead>
            <TableHead>Başlangıç</TableHead>
            <TableHead>Bitiş</TableHead>
            <TableHead>Kalınlık</TableHead>
            <TableHead className="text-right">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roads.map(road => {
            const roadLength = calculateRoadLength(road);
            return (
              <TableRow key={road.id}>
                <TableCell>{road.id}</TableCell>
                <TableCell>
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <select
                      value={editingRoad[0].orientation}
                      onChange={(e) => setEditingRoad([{
                        ...editingRoad[0], 
                        orientation: e.target.value as 'horizontal' | 'vertical'
                      }])}
                      className="p-1 border rounded"
                    >
                      <option value="horizontal">Yatay</option>
                      <option value="vertical">Dikey</option>
                    </select>
                  ) : (
                    road.orientation === 'horizontal' ? 'Yatay' : 'Dikey'
                  )}
                </TableCell>
                <TableCell>
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <Input
                      type="number"
                      value={editingRoad[0].position}
                      onChange={(e) => setEditingRoad([{
                        ...editingRoad[0], 
                        position: parseInt(e.target.value)
                      }])}
                      className="w-16 p-1"
                      min="0"
                      max="100"
                    />
                  ) : (
                    road.position
                  )}
                </TableCell>
                <TableCell>
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <Input
                      type="number"
                      value={editingRoad[0].start}
                      onChange={(e) => setEditingRoad([{
                        ...editingRoad[0], 
                        start: parseInt(e.target.value)
                      }])}
                      className="w-16 p-1"
                      min="0"
                      max="100"
                    />
                  ) : (
                    road.start
                  )}
                </TableCell>
                <TableCell>
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <Input
                      type="number"
                      value={editingRoad[0].end}
                      onChange={(e) => setEditingRoad([{
                        ...editingRoad[0], 
                        end: parseInt(e.target.value)
                      }])}
                      className="w-16 p-1"
                      min="0"
                      max="100"
                    />
                  ) : (
                    road.end
                  )}
                </TableCell>
                <TableCell>
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <Input
                      type="number"
                      value={editingRoad[0].thickness}
                      onChange={(e) => setEditingRoad([{
                        ...editingRoad[0], 
                        thickness: parseInt(e.target.value)
                      }])}
                      className="w-16 p-1"
                      min="1"
                      max="20"
                    />
                  ) : (
                    `${road.thickness}px`
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  {editingRoad && editingRoad[0]?.id === road.id ? (
                    <>
                      <button 
                        onClick={onSave}
                        className="inline-flex p-1.5 bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={onCancel}
                        className="inline-flex p-1.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => onEdit(road)}
                        className="inline-flex p-1.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(road.id)}
                        className="inline-flex p-1.5 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoadTable;
