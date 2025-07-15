
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VillaAdminPanel from '../components/VillaAdminPanel';
import AdminLogin from '../components/AdminLogin';
import { useAuth } from '../contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';

const AdminPage = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    // Check authentication status when page loads
    checkAuth();
    
    // Invalidate queries to force new data fetch
    if (isAuthenticated) {
      queryClient.invalidateQueries({ queryKey: ['villaTypes'] });
      queryClient.invalidateQueries({ queryKey: ['villas'] });
      queryClient.invalidateQueries({ queryKey: ['contactSettings'] });
      console.log('Admin page loaded - refreshing data');
    }
  }, [isAuthenticated, checkAuth, queryClient]);

  return (
    <>
      <Navbar />
      
      <div className="container-custom py-20">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Therma Prime <span className="text-therma">Yönetim Paneli</span>
          </h1>
          <p className="text-lg text-gray-600">
            Villa, yol ve diğer site öğelerini yönetmek için giriş yapın.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-xl shadow-lg">
          {isAuthenticated ? <VillaAdminPanel /> : <AdminLogin />}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AdminPage;
