
import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-4">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'villas' ? 'text-therma border-b-2 border-therma' : 'text-gray-500'}`}
          onClick={() => setActiveTab('villas')}
        >
          Villalar
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'villa-types' ? 'text-therma border-b-2 border-therma' : 'text-gray-500'}`}
          onClick={() => setActiveTab('villa-types')}
        >
          Villa Tipleri
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
