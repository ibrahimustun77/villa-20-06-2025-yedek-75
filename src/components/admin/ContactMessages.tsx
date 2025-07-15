
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchContactMessages, markMessageAsRead, ContactMessage } from '@/services/emailService';
import { Mail, Phone, User, Calendar, Eye, EyeOff } from 'lucide-react';

const ContactMessages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: fetchContactMessages,
    refetchInterval: 30000, // Her 30 saniyede bir yenile
  });

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      toast.success('Mesaj okundu olarak işaretlendi');
      refetch();
    } catch (error) {
      toast.error('Mesaj güncellenirken hata oluştu');
    }
  };

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-therma"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Mail className="w-5 h-5" />
            İletişim Mesajları
          </h3>
          <p className="text-sm text-gray-500">
            {messages.length} toplam mesaj, {unreadCount} okunmamış
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          Yenile
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mesaj Listesi */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Gelen Mesajlar</h4>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Henüz mesaj bulunmuyor
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id
                      ? 'border-therma bg-therma/5'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!message.is_read ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{message.name}</span>
                        {!message.is_read && (
                          <Badge variant="secondary" className="text-xs">
                            Yeni
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Mail className="w-3 h-3" />
                        <span>{message.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Phone className="w-3 h-3" />
                        <span>{message.phone}</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {message.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(message.created_at).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    {!message.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message.id);
                        }}
                        className="h-7 px-2 text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Okundu
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mesaj Detayı */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Mesaj Detayı</h4>
          {selectedMessage ? (
            <div className="border rounded-lg p-6 bg-white">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
                  <p className="text-lg font-medium">{selectedMessage.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-700">{selectedMessage.email}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Telefon</label>
                  <p className="text-gray-700">{selectedMessage.phone}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Tarih</label>
                  <p className="text-gray-700">
                    {new Date(selectedMessage.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Mesaj</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Durum:</span>
                  <Badge variant={selectedMessage.is_read ? "default" : "secondary"}>
                    {selectedMessage.is_read ? "Okunmuş" : "Okunmamış"}
                  </Badge>
                </div>

                {!selectedMessage.is_read && (
                  <Button
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Okundu Olarak İşaretle
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6 bg-gray-50 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Detaylarını görmek için bir mesaj seçin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
