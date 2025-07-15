
import React from 'react';
import ContactButtons from '../contact/ContactButtons';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-therma/10 rounded-2xl p-8 md:p-12 animate-on-scroll" style={{ animationDelay: '400ms' }}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Therma Prime'da Yerinizi <span className="text-therma">Ayırtın</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Doğanın içinde, termal su kaynaklarıyla çevrili lüks villalarda yaşam fırsatını kaçırmayın. Detaylı bilgi ve yerinde inceleme için bizimle iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ContactButtons showLabels size="md" className="justify-center sm:justify-start" />
            <a href="/iletisim" className="button-primary inline-flex justify-center items-center">
              İletişim Formu
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="image-hover rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600"
              alt="Therma Prime Doğal Ortam"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
