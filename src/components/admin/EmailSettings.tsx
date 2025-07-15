import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchEmailSettings, createEmailSettings, updateEmailSettings } from '@/services/emailService';
import type { EmailSettings } from '@/services/emailService';
import { Mail, Settings, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EmailSettingsForm {
  smtp_host: string;
  smtp_port: number;
  email_address: string;
  email_password: string;
  sender_name: string;
}

const EmailSettings: React.FC = () => {
  const [emailSettings, setEmailSettings] = useState<EmailSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const form = useForm<EmailSettingsForm>({
    defaultValues: {
      smtp_host: '',
      smtp_port: 587,
      email_address: '',
      email_password: '',
      sender_name: 'Therma Prime',
    },
  });

  useEffect(() => {
    loadEmailSettings();
  }, []);

  const loadEmailSettings = async () => {
    try {
      const settings = await fetchEmailSettings();
      if (settings.length > 0) {
        const activeSettings = settings[0];
        setEmailSettings(activeSettings);
        form.reset({
          smtp_host: activeSettings.smtp_host,
          smtp_port: activeSettings.smtp_port,
          email_address: activeSettings.email_address,
          email_password: activeSettings.email_password,
          sender_name: activeSettings.sender_name,
        });
      }
    } catch (error) {
      console.error('Error loading email settings:', error);
      toast.error('Email ayarları yüklenirken hata oluştu');
    }
  };

  const onSubmit = async (data: EmailSettingsForm) => {
    setIsLoading(true);
    try {
      if (emailSettings) {
        await updateEmailSettings(emailSettings.id, data);
        toast.success('Email ayarları güncellendi');
      } else {
        await createEmailSettings({ ...data, is_active: true });
        toast.success('Email ayarları oluşturuldu');
      }
      await loadEmailSettings();
    } catch (error) {
      console.error('Error saving email settings:', error);
      toast.error('Email ayarları kaydedilirken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = (provider: string) => {
    switch (provider) {
      case 'gmail':
        form.setValue('smtp_host', 'smtp.gmail.com');
        form.setValue('smtp_port', 587);
        break;
      case 'yandex':
        form.setValue('smtp_host', 'smtp.yandex.com.tr');
        form.setValue('smtp_port', 587);
        break;
      case 'outlook':
        form.setValue('smtp_host', 'smtp-mail.outlook.com');
        form.setValue('smtp_port', 587);
        break;
      default:
        break;
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      const formData = form.getValues();
      
      // Form verilerinin dolu olup olmadığını kontrol et
      if (!formData.smtp_host || !formData.email_address || !formData.email_password) {
        toast.error('Lütfen tüm SMTP bilgilerini doldurun');
        return;
      }

      console.log('SMTP bağlantısı test ediliyor...');
      
      const { data, error } = await supabase.functions.invoke('test-smtp-connection', {
        body: {
          smtp_host: formData.smtp_host,
          smtp_port: formData.smtp_port,
          email_address: formData.email_address,
          email_password: formData.email_password,
        }
      });

      if (error) {
        console.error('SMTP test error:', error);
        toast.error(`SMTP test hatası: ${error.message}`);
        return;
      }

      if (data?.success) {
        toast.success(data.message || 'SMTP bağlantısı başarılı!');
      } else {
        toast.error(data?.message || 'SMTP bağlantısı başarısız');
      }
      
    } catch (error: any) {
      console.error('SMTP connection test error:', error);
      toast.error(`Bağlantı testi başarısız: ${error.message}`);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Ayarları
        </h3>
        <p className="text-sm text-gray-500">
          İletişim formu mesajlarının gönderileceği email ayarlarını yapılandırın.
        </p>
      </div>

      <Separator />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email Sağlayıcısı</Label>
            <Select onValueChange={handleProviderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sağlayıcı seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="yandex">Yandex Mail</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="custom">Özel SMTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sender_name">Gönderen İsmi</Label>
            <Input
              id="sender_name"
              {...form.register('sender_name', { required: true })}
              placeholder="Therma Prime"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtp_host">SMTP Sunucu</Label>
            <Input
              id="smtp_host"
              {...form.register('smtp_host', { required: true })}
              placeholder="smtp.gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtp_port">SMTP Port</Label>
            <Input
              id="smtp_port"
              type="number"
              {...form.register('smtp_port', { required: true, valueAsNumber: true })}
              placeholder="587"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email_address">Email Adresi</Label>
          <Input
            id="email_address"
            type="email"
            {...form.register('email_address', { required: true })}
            placeholder="info@thermaprime.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email_password">Email Şifresi / Uygulama Şifresi</Label>
          <Input
            id="email_password"
            type="password"
            {...form.register('email_password', { required: true })}
            placeholder="••••••••"
          />
          <p className="text-xs text-gray-500">
            Gmail için uygulama şifresi kullanmanız gerekebilir. 
            <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
              Nasıl oluşturacağınızı öğrenin
            </a>
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Kaydet
              </>
            )}
          </Button>

          <Button 
            type="button" 
            variant="outline"
            onClick={testConnection}
            disabled={isTestingConnection}
            className="flex items-center gap-2"
          >
            {isTestingConnection ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                Test ediliyor...
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                Bağlantıyı Test Et
              </>
            )}
          </Button>
        </div>
      </form>

      {emailSettings && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="w-5 h-5" />
            <span className="font-medium">Email ayarları yapılandırılmış</span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            İletişim formu mesajları {emailSettings.email_address} adresine gönderilecek.
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailSettings;
