
import React, { useState } from 'react';
import { TabsContent, TabsList, TabsTrigger, Tabs } from './ui/tabs';
import VillaManagement from './admin/VillaManagement';
import MapManagement from './admin/map/MapManagement';
import ContactSettings from './admin/ContactSettings';
import GalleryManagement from './admin/GalleryManagement';
import SliderManagementEnhanced from './admin/SliderManagementEnhanced';
import CategoryManagement from './admin/CategoryManagement';
import MediaLibrary from './admin/media/MediaLibrary';
import EmailSettings from './admin/EmailSettings';
import ContactMessages from './admin/ContactMessages';
import IconManagementEnhanced from './admin/IconManagementEnhanced';
import RoomTypeManagement from './admin/room-management/RoomTypeManagement';
import { LogOut, Map, Home, Phone, Image, Mail, MessageSquare, Monitor, FolderOpen, Tags, Palette, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const VillaAdminPanel: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("villa-management");

  return (
    <div>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="villa-management" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Villa Yönetimi
              </TabsTrigger>
              <TabsTrigger value="room-management" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Oda Yönetimi
              </TabsTrigger>
              <TabsTrigger value="map-management" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Harita Yönetimi
              </TabsTrigger>
              <TabsTrigger value="icon-management" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                İkon Yönetimi
              </TabsTrigger>
              <TabsTrigger value="slider-management" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Slider Yönetimi
              </TabsTrigger>
              <TabsTrigger value="media-library" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Medya Kütüphanesi
              </TabsTrigger>
              <TabsTrigger value="gallery-management" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Galeri Yönetimi
              </TabsTrigger>
              <TabsTrigger value="category-management" className="flex items-center gap-2">
                <Tags className="h-4 w-4" />
                Kategori Yönetimi
              </TabsTrigger>
              <TabsTrigger value="contact-settings" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                İletişim Ayarları
              </TabsTrigger>
              <TabsTrigger value="email-settings" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Ayarları
              </TabsTrigger>
              <TabsTrigger value="contact-messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Mesajlar
              </TabsTrigger>
            </TabsList>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
        
        <TabsContent value="villa-management" className="space-y-4">
          <VillaManagement />
        </TabsContent>
        
        <TabsContent value="room-management" className="space-y-4">
          <RoomTypeManagement />
        </TabsContent>
        
        <TabsContent value="map-management" className="space-y-4">
          <MapManagement />
        </TabsContent>

        <TabsContent value="icon-management" className="space-y-4">
          <IconManagementEnhanced />
        </TabsContent>

        <TabsContent value="slider-management" className="space-y-4">
          <SliderManagementEnhanced />
        </TabsContent>

        <TabsContent value="media-library" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-6">Medya Kütüphanesi</h2>
            <MediaLibrary />
          </div>
        </TabsContent>

        <TabsContent value="gallery-management" className="space-y-4">
          <GalleryManagement />
        </TabsContent>

        <TabsContent value="category-management" className="space-y-4">
          <CategoryManagement />
        </TabsContent>

        <TabsContent value="contact-settings" className="space-y-4">
          <ContactSettings />
        </TabsContent>

        <TabsContent value="email-settings" className="space-y-4">
          <EmailSettings />
        </TabsContent>

        <TabsContent value="contact-messages" className="space-y-4">
          <ContactMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VillaAdminPanel;
