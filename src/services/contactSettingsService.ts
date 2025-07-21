
import { supabase } from "@/integrations/supabase/client";

export interface ContactSettings {
  id: string;
  whatsapp_number: string;
  phone_number: string;
  phone_number_secondary?: string;
  whatsapp_icon_size?: string;
  phone_icon_size?: string;
  whatsapp_icon_style?: string;
  phone_icon_style?: string;
  whatsapp_icon_url?: string;
  phone_icon_url?: string;
  location_iframe?: string;
  facebook_url?: string;
  instagram_url?: string;
  created_at: string;
  updated_at: string;
}

export async function fetchContactSettings(): Promise<ContactSettings | null> {
  try {
    const { data, error } = await supabase
      .from('contact_settings')
      .select('*')
      .single();
    
    if (error) {
      console.error('Error fetching contact settings:', error);
      return null;
    }
    
    return data as ContactSettings;
  } catch (error) {
    console.error('Error fetching contact settings:', error);
    return null;
  }
}

export async function updateContactSettings(
  id: string, 
  updates: { 
    whatsapp_number?: string; 
    phone_number?: string;
    phone_number_secondary?: string;
    whatsapp_icon_size?: string;
    phone_icon_size?: string;
    whatsapp_icon_style?: string;
    phone_icon_style?: string;
    whatsapp_icon_url?: string;
    phone_icon_url?: string;
    location_iframe?: string;
    facebook_url?: string;
    instagram_url?: string;
  }
): Promise<ContactSettings | null> {
  try {
    const { data, error } = await supabase
      .from('contact_settings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating contact settings:', error);
      return null;
    }
    
    return data as ContactSettings;
  } catch (error) {
    console.error('Error updating contact settings:', error);
    return null;
  }
}

export async function uploadContactIcon(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `contact_icons/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('contact_icons')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = await supabase.storage
      .from('contact_icons')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    console.error('Error uploading icon:', error.message);
    return null;
  }
}
