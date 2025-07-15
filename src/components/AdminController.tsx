
import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import VillaAdminPanel from './VillaAdminPanel';
import { useAuth } from '../contexts/AuthContext';
import { X } from 'lucide-react';

const AdminController: React.FC = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!showAdminPanel) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowAdminPanel(true)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-therma transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen">
        <div className="py-12 px-4">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl mx-auto">
            <button
              onClick={() => setShowAdminPanel(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6">
              {isAuthenticated ? <VillaAdminPanel /> : <AdminLogin />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminController;
