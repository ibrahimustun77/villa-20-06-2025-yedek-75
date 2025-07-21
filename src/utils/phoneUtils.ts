// Utility functions for phone number formatting and handling

/**
 * Format a Turkish phone number to display format
 * @param phoneNumber - Raw phone number (e.g., "905318423477" or "+905318423477")
 * @returns Formatted phone number (e.g., "+90 (531) 842 34 77")
 */
export const formatPhoneNumber = (phoneNumber: string | undefined | null): string => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Handle Turkish phone numbers
  if (cleaned.startsWith('90') && cleaned.length === 12) {
    // Format: 905318423477 -> +90 (531) 842 34 77
    const countryCode = cleaned.slice(0, 2);
    const areaCode = cleaned.slice(2, 5);
    const firstPart = cleaned.slice(5, 8);
    const secondPart = cleaned.slice(8, 10);
    const thirdPart = cleaned.slice(10, 12);
    
    return `+${countryCode} (${areaCode}) ${firstPart} ${secondPart} ${thirdPart}`;
  }
  
  // Return as-is if not recognized format
  return phoneNumber;
};

/**
 * Get clean phone number for tel: links
 * @param phoneNumber - Raw phone number
 * @returns Clean phone number with + prefix (e.g., "+905318423477")
 */
export const getCleanPhoneNumber = (phoneNumber: string | undefined | null): string => {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Add + prefix if not present
  return cleaned.startsWith('90') ? `+${cleaned}` : phoneNumber;
};

/**
 * Get WhatsApp-compatible phone number (no + prefix, only digits)
 * @param phoneNumber - Raw phone number
 * @returns Clean digits only (e.g., "905318423477")
 */
export const getWhatsAppNumber = (phoneNumber: string | undefined | null): string => {
  if (!phoneNumber) return '';
  
  return phoneNumber.replace(/\D/g, '');
};