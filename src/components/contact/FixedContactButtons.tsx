
import React from "react";
import { useContactSettings } from "@/contexts/ContactSettingsContext";
import { useIsMobile } from "@/hooks/use-mobile";

const FixedContactButtons: React.FC = () => {
  const { contactSettings, isLoading } = useContactSettings();
  const isMobile = useIsMobile();

  if (isLoading || !contactSettings) {
    return null;
  }

  // Set default values if not specified
  const whatsappIconSize = contactSettings.whatsapp_icon_size || 'medium';
  const phoneIconSize = contactSettings.phone_icon_size || 'medium';
  const whatsappIconStyle = contactSettings.whatsapp_icon_style || 'standard';
  const phoneIconStyle = contactSettings.phone_icon_style || 'standard';

  // Size mappings for button and icon
  const buttonSizes = {
    small: "w-10 h-10",
    medium: "w-12 h-12",
    large: "w-14 h-14",
  };

  const iconSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-7 h-7",
  };

  // Get WhatsApp content (custom image or SVG)
  const getWhatsAppContent = () => {
    if (contactSettings.whatsapp_icon_url) {
      return (
        <img 
          src={contactSettings.whatsapp_icon_url} 
          alt="WhatsApp" 
          className={iconSizes[whatsappIconSize as keyof typeof iconSizes]}
        />
      );
    }
    
    // If no custom icon, use SVG based on selected style
    switch (whatsappIconStyle) {
      case 'minimal':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[whatsappIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.5 0C5.149 0 0 5.148 0 11.5 0 13.395.514 15.2 1.414 16.78L0 22.5l5.812-1.414C7.333 22.35 9.37 23 11.5 23 17.851 23 23 17.852 23 11.5S17.851 0 11.5 0zm0 21.5c-1.97 0-3.817-.614-5.346-1.675l-.385-.17-3.988.97.99-3.95-.202-.425C1.567 14.811 1 13.193 1 11.5 1 5.71 5.71 1 11.5 1S22 5.71 22 11.5 17.29 22 11.5 22z"/>
          </svg>
        );
      case 'modern':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[whatsappIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
            <path d="M9 15h6"></path>
          </svg>
        );
      default: // standard
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[whatsappIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
            <path d="M9 15h6"></path>
          </svg>
        );
    }
  };

  // Get Phone content (custom image or SVG)
  const getPhoneContent = () => {
    if (contactSettings.phone_icon_url) {
      return (
        <img 
          src={contactSettings.phone_icon_url} 
          alt="Phone" 
          className={iconSizes[phoneIconSize as keyof typeof iconSizes]}
        />
      );
    }
    
    // If no custom icon, use SVG based on selected style
    switch (phoneIconStyle) {
      case 'minimal':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[phoneIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.384 17.752a2.088 2.088 0 0 1-.635 1.462l-2.464 2.464c-.21.21-.462.378-.756.506-.294.126-.588.214-.882.256-.042 0-.126.008-.252.024-.126.016-.294.024-.504.024-.504 0-1.32-.084-2.448-.252-1.128-.168-2.394-.588-3.798-1.26-1.404-.672-2.898-1.638-4.482-2.898-1.584-1.26-3.048-2.898-4.392-4.914-.882-1.302-1.554-2.52-2.016-3.654-.462-1.134-.798-2.142-1.008-3.024-.21-.882-.336-1.632-.378-2.25a8.16 8.16 0 0 1-.063-.756c0-.252.008-.42.024-.504.042-.294.126-.588.252-.882.126-.294.294-.546.504-.756L2.55 1.26c.252-.252.546-.378.882-.378.252 0 .462.084.63.252.168.168.336.336.504.504.168.168.336.336.504.504.168.168.336.336.504.504l1.512 1.512c.252.252.378.546.378.882 0 .252-.084.462-.252.63-.168.168-.336.336-.504.504-.168.168-.336.336-.504.504-.168.168-.336.336-.504.504-.336.336-.336.672 0 1.008.084.084.168.21.252.378.084.168.21.336.378.504.168.168.42.378.756.63.336.252.798.546 1.386.882.756.504 1.428.924 2.016 1.26.588.336 1.092.504 1.512.504.42 0 .756-.042 1.008-.126.252-.084.42-.21.504-.378l3.024-3.024c.168-.168.378-.252.63-.252s.462.042.63.126c.168.084.336.168.504.252.168.084.336.168.504.252l3.024 1.512c.252.126.42.294.504.504.084.21.126.42.126.63 0 .252-.042.462-.126.63a3.03 3.03 0 0 1-.378.504z" />
          </svg>
        );
      case 'modern':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[phoneIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      default: // standard
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSizes[phoneIconSize as keyof typeof iconSizes]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      {/* WhatsApp Button - Show on all devices */}
      {contactSettings.whatsapp_number && (
        <a
          href={`https://wa.me/${contactSettings.whatsapp_number}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center ${buttonSizes[whatsappIconSize as keyof typeof buttonSizes]} bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg`}
          aria-label="WhatsApp ile iletişime geçin"
        >
          {getWhatsAppContent()}
        </a>
      )}

      {/* Phone Button - Only show on mobile devices */}
      {isMobile && contactSettings.phone_number && (
        <a
          href={`tel:${contactSettings.phone_number}`}
          className={`flex items-center justify-center ${buttonSizes[phoneIconSize as keyof typeof buttonSizes]} bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg`}
          aria-label="Telefon ile arayın"
        >
          {getPhoneContent()}
        </a>
      )}
    </div>
  );
};

export default FixedContactButtons;
