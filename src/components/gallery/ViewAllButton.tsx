
import React from 'react';
import { Link } from 'react-router-dom';

const ViewAllButton: React.FC = () => {
  return (
    <div className="text-center mt-12 animate-on-scroll" style={{ animationDelay: '600ms' }}>
      <Link to="/galeri" className="button-outline">
        Tüm Galeriye Göz Atın
      </Link>
    </div>
  );
};

export default ViewAllButton;
