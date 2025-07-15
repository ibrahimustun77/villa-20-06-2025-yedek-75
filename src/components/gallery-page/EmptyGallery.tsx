
import React from 'react';

const EmptyGallery: React.FC = () => {
  return (
    <div className="text-center py-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-16 h-16 text-gray-300 mx-auto mb-4"
      >
        <path d="M22 7.7c-.1-.9-.7-1.7-1.6-1.9-2-.6-5.2-1.8-7.8-3.3-.3-.2-.7-.2-1 0C9 4 5.8 5.2 3.8 5.8c-.9.2-1.5 1-1.6 1.9-.1 2.3-.2 7.7 0 9.2.1.9.7 1.7 1.6 1.9 2 .6 5.2 1.8 7.8 3.3.3.2.7.2 1 0 2.6-1.5 5.8-2.7 7.8-3.3.9-.2 1.5-1 1.6-1.9.2-1.5.1-6.9 0-9.2z"></path>
        <path d="M12 22V10"></path>
        <path d="M12 6.5 14.5 5l-2.5-1v2.5z"></path>
      </svg>
      <h3 className="text-xl font-medium text-gray-600 mb-2">Görüntülenecek fotoğraf bulunamadı</h3>
      <p className="text-gray-500">Lütfen başka bir kategori seçin</p>
    </div>
  );
};

export default EmptyGallery;
