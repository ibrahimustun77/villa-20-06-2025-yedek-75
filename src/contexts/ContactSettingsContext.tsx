
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { fetchContactSettings, ContactSettings } from '@/services/contactSettingsService';

interface ContactSettingsContextType {
  contactSettings: ContactSettings | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const ContactSettingsContext = createContext<ContactSettingsContextType>({
  contactSettings: null,
  isLoading: true,
  refetch: async () => {},
});

export const useContactSettings = () => useContext(ContactSettingsContext);

export const ContactSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await fetchContactSettings();
      setContactSettings(data);
    } catch (error) {
      console.error('Error fetching contact settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refetch = async () => {
    await fetchSettings();
  };

  return (
    <ContactSettingsContext.Provider value={{ contactSettings, isLoading, refetch }}>
      {children}
    </ContactSettingsContext.Provider>
  );
};
