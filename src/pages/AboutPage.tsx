import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/common/PageHeader';
const AboutPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();

        // If element is in viewport
        if (position.top < window.innerHeight * 0.8) {
          element.classList.add('animate');
        }
      });
    };

    // Initial check for elements in viewport
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <>
      <Navbar />
      
      <PageHeader pageType="about" defaultImage="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200" defaultTitle="Therma Prime Vizyonu" defaultDescription="Doğayla iç içe, termal suyun şifa dolu etkisiyle, konforlu bir yaşam sunan Therma Prime projesi hakkında detaylı bilgi." badge="Proje Hakkında" />
      
      {/* About Content */}
      <section className="py-20 px-6">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="animate-on-scroll">
              <div className="image-hover rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" 
                  alt="Therma Prime Doğal Ortam" 
                  className="w-full h-[500px] object-cover"
                  srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=75 400w, https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=75 800w, https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=75 1200w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{
            animationDelay: '200ms'
          }}>
              <span className="inline-block text-sm font-medium text-therma mb-3">DOĞAL TERMAL SU</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Doğanın Şifa Kaynağından <span className="text-therma">Gelen Sağlık</span>
              </h2>
              <p className="text-gray-600 mb-6">Therma Prime villaları, doğal termal su bölgesindedir.</p>
              <p className="text-gray-600 mb-6">
                Yalova'nın şifalı termal suları, romatizmal hastalıklar, cilt hastalıkları, dolaşım sistemi rahatsızlıkları ve daha birçok sağlık sorununa iyi gelmektedir. Therma Prime'da bu şifalı suya günün her saati erişebilirsiniz.
              </p>
              <div className="bg-therma/5 border border-therma/20 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-therma">Termal Suyun Faydaları</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Romatizmal rahatsızlıklarda tedavi edici
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Stres ve yorgunluğu azaltıcı
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Kan dolaşımını düzenleyici
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Cilt sağlığını destekleyici
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-1 md:order-2 animate-on-scroll">
              <div className="image-hover rounded-2xl overflow-hidden shadow-xl">
                <img alt="Therma Prime Villa" className="w-full h-[500px] object-cover" src="/lovable-uploads/df96ec17-7ee3-4297-85bb-95c686e53bf9.jpg" />
              </div>
            </div>
            
            <div className="order-2 md:order-1 animate-on-scroll" style={{
            animationDelay: '200ms'
          }}>
              <span className="inline-block text-sm font-medium text-therma mb-3">KONUM AVANTAJI</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Doğa ve <span className="text-therma">Şehir</span> Arasında Mükemmel Denge
              </h2>
              <p className="text-gray-600 mb-6">
                Therma Prime, Yalova'nın Termal bölgesine çok yakın bir konumda yer almaktadır. Bu konum, hem doğanın sakinliğini hem de şehir yaşamının kolaylıklarını bir arada sunmaktadır.
              </p>
              <p className="text-gray-600 mb-6">
                İstanbul'a yakınlığı sayesinde, şehir hayatından tamamen kopmadan, doğanın içinde huzurlu bir yaşam sürebilirsiniz. Ayrıca Yalova merkeze olan yakınlığı ile tüm ihtiyaçlarınıza kolayca erişebilirsiniz.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-therma/5 border border-therma/20 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h3 className="font-bold">Yalova Merkez</h3>
                  </div>
                  <p className="text-sm text-gray-600">10 dakika uzaklıkta</p>
                </div>
                <div className="bg-therma/5 border border-therma/20 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h3 className="font-bold">İstanbul</h3>
                  </div>
                  <p className="text-sm text-gray-600">Feribot ile 1 saat uzaklıkta</p>
                </div>
                <div className="bg-therma/5 border border-therma/20 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h3 className="font-bold">Termal Kaplıcaları</h3>
                  </div>
                  <p className="text-sm text-gray-600">5 dakika uzaklıkta</p>
                </div>
                <div className="bg-therma/5 border border-therma/20 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h3 className="font-bold">Orman</h3>
                  </div>
                  <p className="text-sm text-gray-600">Proje sınırında</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="image-hover rounded-2xl overflow-hidden shadow-xl">
                <img alt="Therma Prime Sürdürülebilir Mimari" className="w-full h-[500px] object-cover" src="/lovable-uploads/fed7a5ee-650a-477c-ab3a-2eac1b9c0c12.jpg" />
              </div>
            </div>
            
            <div className="animate-on-scroll" style={{
            animationDelay: '200ms'
          }}>
              <span className="inline-block text-sm font-medium text-therma mb-3">SÜRDÜRÜLEBILIR YAKLAŞIM</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Çevre Dostu <span className="text-therma">Akıllı</span> Yaşam Alanları
              </h2>
              <p className="text-gray-600 mb-6">
                Therma Prime villalarında, modern teknolojinin tüm nimetlerinden faydalanırken, doğaya saygılı bir yaşam sürmeniz mümkün. Projemizde sürdürülebilirlik ilkesi ön planda tutulmuştur.
              </p>
              <p className="text-gray-600 mb-6">
                Villaların yapımında kullanılan doğal malzemeler, enerji tasarruflu sistemler ve akıllı ev teknolojileri, hem konforunuzu artırmakta hem de çevreye olan olumsuz etkileri minimuma indirmektedir.
              </p>
              <div className="bg-therma/5 border border-therma/20 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-therma">Sürdürülebilir Özellikler</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Güneş enerjisi sistemleri
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Yağmur suyu toplama ve arıtma
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Enerji verimli yalıtım
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-therma mr-3">
                      <path d="M5 12l5 5L20 7"></path>
                    </svg>
                    Akıllı ev otomasyon sistemleri
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-therma-beige">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <span className="inline-block text-sm font-medium text-therma mb-3">UZMAN GÖRÜŞLERİ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proje <span className="text-therma">Mimarı</span> ve <span className="text-therma">Geliştiricisi</span>
            </h2>
            <p className="text-gray-600 md:text-lg">
              Therma Prime projesini hayata geçiren profesyonellerin görüşleri ve vizyonu.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-2xl animate-on-scroll">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200" 
                    alt="Mimar" 
                    className="w-full h-full object-cover"
                    srcSet="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&q=75 100w, https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&q=75 200w"
                    sizes="64px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  
                  <p className="text-therma">Baş Mimar</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"Therma Prime projesi, doğal güzellikleri ve termal suya yakınlığıyla mimari tasarımı buluşturan bir vizyon ürünüdür. Her villayı tasarlarken, sakinlerin hem doğayla iç içe olmasını hem de modern yaşamın tüm konforlarından faydalanmasını hedefledik."</p>
              <p className="text-gray-600">
                "Villaların mimarisinde kullandığımız geniş pencereler ve teraslar, doğayla bütünleşmeyi sağlarken, iç mekanlarda kullandığımız doğal malzemeler ise sıcak ve huzurlu bir atmosfer yaratıyor."
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl animate-on-scroll" style={{
            animationDelay: '200ms'
          }}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200" 
                    alt="Geliştirici" 
                    className="w-full h-full object-cover"
                    srcSet="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&q=75 100w, https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&q=75 200w"
                    sizes="64px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  
                  <p className="text-therma">Proje Geliştiricisi</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"Therma Prime'ı geliştirirken, sadece lüks bir konut projesi değil, bir yaşam tarzı sunmayı hedefledik. Termal suyun şifa verici özelliklerini günlük yaşamın bir parçası haline getirmeyi amaçlayan  bu proje, sakinlerine benzersiz bir deneyim sunuyor."</p>
              <p className="text-gray-600">
                "Projemizin en önemli özelliklerinden biri, sürdürülebilirlik prensiplerine olan bağlılığımızdır. Doğaya saygılı bir yaşam alanı yaratırken, teknolojinin tüm imkanlarını kullanarak konfordan ödün vermiyoruz."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>;
};
export default AboutPage;