
import React from 'react';

interface VillaPropertyGridProps {
  area: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
}

const VillaPropertyGrid: React.FC<VillaPropertyGridProps> = ({
  area,
  bedrooms,
  bathrooms,
  garages
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="flex items-center p-4 bg-white/70 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-therma mr-3"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
        <div>
          <p className="text-sm text-gray-500">Alan</p>
          <p className="font-medium">{area}</p>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white/70 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-therma mr-3"
        >
          <path d="M2 22v-5h20v5" />
          <path d="M18 11V2H6v9" />
          <path d="M2 16h20" />
          <path d="M14 7h-4" />
        </svg>
        <div>
          <p className="text-sm text-gray-500">Yatak Odası</p>
          <p className="font-medium">{bedrooms}</p>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white/70 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-therma mr-3"
        >
          <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
          <line x1="10" x2="8" y1="5" y2="7" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <line x1="7" x2="7" y1="19" y2="21" />
          <line x1="17" x2="17" y1="19" y2="21" />
        </svg>
        <div>
          <p className="text-sm text-gray-500">Banyo</p>
          <p className="font-medium">{bathrooms}</p>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white/70 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-therma mr-3"
        >
          <path d="M21 12a9 9 0 1 1-17.995-.218c.174-2.87.868-5.218 2.08-6.58C6.143 3.358 7.424 2.75 9 2.75c2.667 0 5.333 2.548 7 1.5 0 0 7.333 2.04 5 7.75z" />
          <path d="M11.5 14c.413 1.165 2 2 3.5 2a4.126 4.126 0 0 0 3.322-1.678" />
        </svg>
        <div>
          <p className="text-sm text-gray-500">Garaj</p>
          <p className="font-medium">{garages} Araçlık</p>
        </div>
      </div>
    </div>
  );
};

export default VillaPropertyGrid;
