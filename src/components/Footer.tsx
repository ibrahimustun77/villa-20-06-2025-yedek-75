import React from 'react';
import { Link } from 'react-router-dom';
import { useContactSettings } from '@/contexts/ContactSettingsContext';
// Logo uploaded by user
const nhtLogo = "/lovable-uploads/fdceb919-f820-437f-bcf9-b7b576a2f18e.png";
const Footer = () => {
  const {
    contactSettings
  } = useContactSettings();
  return <footer className="pt-20 pb-10 px-6 bg-gradient-to-b from-white to-therma-gray">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold">
                <span className="gradient-text">Therma Prime</span>
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">Yalova Termal bölgesine çok yakın bir konumda yer alan, 44 özel villadan oluşan, doğal yapıya sahip lüks bir yaşam projesi. Therma Prime Projesi Bir NHT KARAKOÇ İNŞAAT Projesidir</p>
            
            {/* NHT Logo */}
            <div className="mb-6 text-center">
              <img src={nhtLogo} alt="NHT Karakoç İnşaat" className="h-32 w-auto mx-auto" />
            </div>
            
            <div className="flex space-x-4">
              {contactSettings?.facebook_url && <a href={contactSettings.facebook_url} className="p-2 rounded-full bg-therma/10 text-therma hover:bg-therma hover:text-white transition-colors duration-300" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>}
              {contactSettings?.instagram_url && <a href={contactSettings.instagram_url} className="p-2 rounded-full bg-therma/10 text-therma hover:bg-therma hover:text-white transition-colors duration-300" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hızlı Bağlantılar</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-600 hover:text-therma transition-colors duration-300">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/hakkinda" className="text-gray-600 hover:text-therma transition-colors duration-300">
                  Proje Hakkında
                </Link>
              </li>
              <li>
                <Link to="/villalar" className="text-gray-600 hover:text-therma transition-colors duration-300">
                  Villalar
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-gray-600 hover:text-therma transition-colors duration-300">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-600 hover:text-therma transition-colors duration-300">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className="text-lg font-bold mb-6">İletişim Bilgileri</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-therma">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-600">
                  Yalova, Termal Bölgesi<br />
                  Therma Prime Satış Ofisi
                </span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-therma">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-gray-600">+90 (531) 842 34 77</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-therma">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-gray-600">+90 (531) 842 34 77</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-therma">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span className="text-gray-600">info@thermaprime.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Therma Prime. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 text-sm hover:text-therma transition-colors duration-300">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-600 text-sm hover:text-therma transition-colors duration-300">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;