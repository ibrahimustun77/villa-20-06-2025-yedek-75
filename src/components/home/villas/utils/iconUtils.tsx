
import React from 'react';
import { sanitizeSVG } from '@/utils/security';

export const getRoomIcon = (roomCountsToUse: any[], roomTypeName: string, defaultIcon: React.ReactNode) => {
  const roomCount = roomCountsToUse.find(rc => 
    rc.room_types?.name === roomTypeName || rc.room_type_name === roomTypeName
  );
  
  if (roomCount?.property_icons?.icon_svg || roomCount?.icon_svg) {
    console.log(`Custom icon found for ${roomTypeName}`);
    return (
      <div 
        className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
        dangerouslySetInnerHTML={{ __html: sanitizeSVG(roomCount.property_icons?.icon_svg || roomCount.icon_svg) }}
      />
    );
  }
  
  console.log(`Using default icon for ${roomTypeName}`);
  return defaultIcon;
};

export const getIconForRoomType = (roomTypeName: string, customIcon?: string) => {
  if (customIcon) {
    return (
      <div 
        className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
        dangerouslySetInnerHTML={{ __html: sanitizeSVG(customIcon) }}
      />
    );
  }

  switch (roomTypeName) {
    case 'bedroom':
      return getDefaultBedroomIcon();
    case 'bathroom':
      return getDefaultBathroomIcon();
    case 'living_room':
      return getDefaultLivingRoomIcon();
    case 'hall':
      return getDefaultHallIcon();
    default:
      return getDefaultRoomIcon();
  }
};

export const getDefaultBedroomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
  >
    <path d="M2 22v-5h20v5" />
    <path d="M18 11V2H6v9" />
    <path d="M2 16h20" />
    <path d="M14 7h-4" />
  </svg>
);

export const getDefaultBathroomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
  >
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" x2="8" y1="5" y2="7" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <line x1="7" x2="7" y1="19" y2="21" />
    <line x1="17" x2="17" y1="19" y2="21" />
  </svg>
);

export const getDefaultLivingRoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
    <path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
    <path d="M7 16h10"/>
    <path d="M7 20v-4"/>
    <path d="M17 20v-4"/>
  </svg>
);

export const getDefaultHallIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
  >
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
    <path d="M12 3v6" />
  </svg>
);

export const getDefaultRoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 md:w-5 md:h-5 text-therma mr-2 md:mr-3"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <path d="M12 8v8"/>
    <path d="M8 12h8"/>
  </svg>
);
