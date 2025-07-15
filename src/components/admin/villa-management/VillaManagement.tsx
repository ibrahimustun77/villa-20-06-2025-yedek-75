
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchVillas } from '@/services/villaService';
import { fetchVillaTypes } from '@/services/villaTypeService';
import { useAuth } from '@/contexts/AuthContext';
import { useVillaManagement } from './useVillaManagement';
import VillaDialogManager from './VillaDialogManager';
import ManagementHeader from './ManagementHeader';
import SearchBar from './SearchBar';
import TabNavigation from './TabNavigation';
import VillasList from './VillasList';
import VillaTypesList from './VillaTypesList';
import { toast } from 'sonner';

const VillaManagement: React.FC = () => {
  const {
    activeTab,
    searchQuery,
    isDialogOpen,
    setActiveTab,
    setSearchQuery,
    setIsDialogOpen,
    handleAddVilla,
    handleEditVilla, 
    handleDeleteVilla,
    handleCopyVilla,
    handleAddVillaType,
    handleEditVillaType,
    handleDeleteVillaType,
    handleFormComplete,
    dialogType,
    selectedItem
  } = useVillaManagement();
  
  const { checkAuth, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  
  // Use React Query hooks to fetch data with specific options to ensure fresh data
  const { data: villas = [], isLoading: isLoadingVillas } = useQuery({
    queryKey: ['villas'],
    queryFn: fetchVillas,
    refetchOnMount: true,
    staleTime: 0,
    refetchInterval: 5000, // Refetch every 5 seconds
  });
  
  const { data: villaTypes = [], isLoading: isLoadingVillaTypes } = useQuery({
    queryKey: ['villaTypes'],
    queryFn: fetchVillaTypes,
    refetchOnMount: true,
    staleTime: 0,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Force refetch on component mount
  useEffect(() => {
    // Check auth status to ensure proper access
    checkAuth();
    
    console.log('VillaManagement component mounted - forcing data refetch');
    console.log('Current authentication status:', isAuthenticated);
    
    // Force refetch data when component mounts
    queryClient.invalidateQueries({ queryKey: ['villas'] });
    queryClient.invalidateQueries({ queryKey: ['villaTypes'] });
    
    // Additional attempt to fetch villa types directly
    const fetchData = async () => {
      try {
        const types = await fetchVillaTypes();
        console.log('Directly fetched villa types:', types);
        if (types.length === 0) {
          console.log('No villa types found in direct fetch');
        }
      } catch (error) {
        console.error('Error in direct fetch:', error);
      }
    };
    
    fetchData();
  }, [queryClient, checkAuth, isAuthenticated]);

  // Log when data changes for debugging
  useEffect(() => {
    console.log('Villa types data from query:', villaTypes);
    if (villaTypes.length === 0) {
      console.log('Villa types array is empty - checking authentication status');
      console.log('Current authentication status:', isAuthenticated);
    }
  }, [villaTypes, isAuthenticated]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('Yetkili işlemler için lütfen giriş yapın');
    }
  }, [isAuthenticated]);

  return (
    <div className="space-y-6">
      <ManagementHeader 
        activeTab={activeTab}
        onAddVilla={handleAddVilla}
        onAddVillaType={handleAddVillaType}
      />
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div>
        {activeTab === 'villas' ? (
          <VillasList
            villas={villas}
            isLoading={isLoadingVillas}
            searchQuery={searchQuery}
            onEdit={handleEditVilla}
            onDelete={handleDeleteVilla}
            onCopy={handleCopyVilla}
          />
        ) : (
          <VillaTypesList
            villaTypes={villaTypes}
            isLoading={isLoadingVillaTypes}
            searchQuery={searchQuery}
            onEdit={handleEditVillaType}
            onDelete={handleDeleteVillaType}
          />
        )}
      </div>
      
      <VillaDialogManager
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogType={dialogType}
        selectedItem={selectedItem}
        onFormComplete={handleFormComplete}
      />
    </div>
  );
};

export default VillaManagement;
