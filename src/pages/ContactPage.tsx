import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/common/PageHeader';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { sendContactEmail } from '@/services/emailService';
import { useContactSettings } from '@/contexts/ContactSettingsContext';
import { sanitizeIframe } from '@/utils/security';
const ContactPage = () => {
  const { contactSettings } = useContactSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        message: ''
      });
    } catch (error) {
      console.error('Error sending contact email:', error);
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
      <Navbar />
      
      <PageHeader pageType="contact" defaultImage="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200" defaultTitle="Therma Prime ile Bağlantı Kurun" defaultDescription="Sorularınız için bizimle iletişime geçin, size yardımcı olmaktan memnuniyet duyarız." badge="İLETİŞİM" />
      
      {/* Main Contact Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Therma Prime ile <span className="text-therma">İletişime Geçin</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Therma Prime hakkında daha fazla bilgi almak, satış ofisimizi ziyaret etmek veya sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
          
          <div className="flex justify-center">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
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
                    <a 
                      href={`tel:${contactSettings?.phone_number || '+905318423477'}`}
                      className="text-gray-600 hover:text-therma transition-colors duration-200 cursor-pointer block"
                    >
                      +90 (531) 842 34 77
                    </a>
                    {contactSettings?.phone_number_secondary && (
                      <a 
                        href={`tel:${contactSettings.phone_number_secondary}`}
                        className="text-gray-600 hover:text-therma transition-colors duration-200 cursor-pointer block mt-1"
                      >
                        +90 (546) 670 85 54
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-therma/10 text-therma rounded-full mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-posta</h4>
                    <a 
                      href="mailto:info@thermaprime.com"
                      className="text-gray-600 hover:text-therma transition-colors duration-200 cursor-pointer"
                    >
                      info@thermaprime.com
                    </a>
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
              </div>
              
              {/* WhatsApp Button */}
              <a href={`https://wa.me/${contactSettings?.whatsapp_number?.replace(/\D/g, '') || '905318423477'}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-green-500 text-white py-3 px-6 rounded-full 
                  shadow-md hover:shadow-lg transform transition-all duration-300 
                  ease-in-out hover:-translate-y-1 hover:bg-green-600 focus:outline-none w-full mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                  <path d="M9 15h6"></path>
                </svg>
                WhatsApp ile İletişime Geçin
              </a>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Konum</h3>
            <div className="rounded-xl overflow-hidden shadow-lg h-[500px]">
              {contactSettings?.location_iframe ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeIframe(contactSettings.location_iframe) }} className="w-full h-full" />
              ) : (
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48345.459861682776!2d29.123685!3d40.658476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f66644bfb9d%3A0x82690ee7586b7eb9!2sTermal%2F%C4%B0stanbul%2FT%C3%BCrkiye!5e0!3m2!1str!2str!4v1654789542712!5m2!1str!2str" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Therma Prime Konum"></iframe>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>;
};
export default ContactPage;