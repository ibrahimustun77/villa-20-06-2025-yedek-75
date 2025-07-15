
import { supabase } from '@/integrations/supabase/client';

export interface EmailSettings {
  id: string;
  smtp_host: string;
  smtp_port: number;
  email_address: string;
  email_password: string;
  sender_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export const fetchEmailSettings = async (): Promise<EmailSettings[]> => {
  const { data, error } = await supabase
    .from('email_settings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching email settings:', error);
    throw error;
  }

  return data || [];
};

export const createEmailSettings = async (settings: Omit<EmailSettings, 'id' | 'created_at' | 'updated_at'>): Promise<EmailSettings> => {
  const { data, error } = await supabase
    .from('email_settings')
    .insert([settings])
    .select()
    .single();

  if (error) {
    console.error('Error creating email settings:', error);
    throw error;
  }

  return data;
};

export const updateEmailSettings = async (id: string, settings: Partial<EmailSettings>): Promise<EmailSettings> => {
  const { data, error } = await supabase
    .from('email_settings')
    .update(settings)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating email settings:', error);
    throw error;
  }

  return data;
};

export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }

  return data || [];
};

export const markMessageAsRead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);

  if (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  const { data, error } = await supabase.functions.invoke('send-contact-email', {
    body: formData
  });

  if (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }

  return data;
};

export const testSMTPConnection = async (smtpSettings: {
  smtp_host: string;
  smtp_port: number;
  email_address: string;
  email_password: string;
}): Promise<{ success: boolean; message: string }> => {
  const { data, error } = await supabase.functions.invoke('test-smtp-connection', {
    body: smtpSettings
  });

  if (error) {
    console.error('Error testing SMTP connection:', error);
    throw error;
  }

  return data;
};
