import React, { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactButtons from './contact/ContactButtons';
import { useContactSettings } from '@/contexts/ContactSettingsContext';
import { sendContactEmail } from '@/services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { contactSettings } = useContactSettings();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await sendContactEmail(formData);
      toast.success(response.message || 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending contact email:', error);
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-medium text-therma mb-3">İLETİŞİM</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Therma Prime ile <span className="text-therma">İletişime Geçin</span>
          </h2>
          <p className="text-gray-600 md:text-lg">
            Therma Prime hakkında daha fazla bilgi almak, satış ofisimizi ziyaret etmek veya sorularınız için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-therma/10 text-therma rounded-full mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Adres</h4>
                    <p className="text-gray-600">Yalova, Termal Bölgesi</p>
                    <p className="text-gray-600">Therma Prime Satış Ofisi</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-therma/10 text-therma rounded-full mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefon</h4>
                    <p className="text-gray-600">
                      {contactSettings?.phone_number || "+90 (226) 123 45 67"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-therma/10 text-therma rounded-full mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-posta</h4>
                    <p className="text-gray-600">info@thermaprime.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-therma/10 text-therma rounded-full mr-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Çalışma Saatleri</h4>
                    <p className="text-gray-600">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                    <p className="text-gray-600">Pazar: 10:00 - 16:00</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex justify-center mt-4">
                  <ContactButtons showLabels size="md" />
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                to="/iletisim" 
                className="inline-flex items-center text-therma hover:text-therma/80 font-medium"
              >
                <span>Detaylı iletişim bilgileri için tıklayın</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-on-scroll" style={{ animationDelay: '300ms' }}>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">Ad Soyad</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-therma focus:border-transparent"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">E-posta</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-therma focus:border-transparent"
                      placeholder="E-posta adresiniz"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-medium mb-2">Telefon</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-therma focus:border-transparent"
                      placeholder="Telefon numaranız"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-medium mb-2">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-therma focus:border-transparent"
                    placeholder="Mesajınızı yazın..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-therma hover:bg-therma/90 text-white font-medium py-3 px-6 rounded-full transition-colors shadow-md"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </div>
                  ) : (
                    'Mesaj Gönder'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
