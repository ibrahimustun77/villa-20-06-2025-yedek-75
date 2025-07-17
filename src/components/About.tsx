
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.2
    });
    if (aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }
    return () => {
      if (aboutRef.current) {
        const elements = aboutRef.current.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);
  return <section className="py-24 px-6" ref={aboutRef}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="image-hover rounded-2xl overflow-hidden shadow-2xl animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800" 
                  alt="Therma Prime doğa manzarası" 
                  className="w-full h-[500px] object-cover"
                  srcSet="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=75 400w, https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=75 800w, https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=75 1200w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-2xl max-w-xs animate-on-scroll" style={{
              animationDelay: '200ms'
            }}>
                <div className="flex items-center">
                  <div className="bg-therma text-white p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M21 12a9 9 0 1 1-17.995-.218c.174-2.87.868-5.218 2.08-6.58C6.143 3.358 7.424 2.75 9 2.75c2.667 0 5.333 2.548 7 1.5 0 0 7.333 2.04 5 7.75z" />
                      <path d="M11.5 14c.413 1.165 2 2 3.5 2a4.126 4.126 0 0 0 3.322-1.678" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Ayrıcalıklı Yaşam Alanı</p>
                    <p className="text-gray-600 text-sm">Doğanın iyileştirici etkisi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll" style={{
          animationDelay: '300ms'
        }}>
            <span className="inline-block text-sm font-medium text-therma mb-3">PROJE HAKKINDA</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Doğayla İç İçe Termal Bir <span className="text-therma">Yaşam Deneyimi</span>
            </h2>
            <p className="text-gray-600 mb-6">Therma Prime, Yalova Termal bölgesine çok yakın bir konumda, doğanın kalbinde yer alan, 44 özel villadan oluşan lüks bir yaşam projesidir.</p>
            <p className="text-gray-600 mb-6">
              Projemiz, modern mimari ile doğal yaşamı bir araya getirerek, sakinlerine hem lüksü hem de doğanın huzurunu bir arada sunmayı amaçlamaktadır. Termal suyun şifa verici özellikleri, temiz hava ve muhteşem doğa manzaralarıyla çevrili bu özel yaşam alanında, yeni bir hayat sizi bekliyor.
            </p>
            <p className="text-gray-600 mb-8">
              Therma Prime'da her detay, sakinlerinin konfor ve mutluluğu düşünülerek tasarlanmıştır. Sürdürülebilir ve çevre dostu yaklaşımımız, doğayla uyum içinde bir yaşam sunmayı hedeflemektedir.
            </p>
            <Link to="/hakkinda" className="button-primary">
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
