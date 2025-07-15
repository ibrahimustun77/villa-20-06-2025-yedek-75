import React, { useEffect, useRef } from 'react';
const features = [{
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-therma">
        <path d="M21 12a9 9 0 1 1-17.995-.218c.174-2.87.868-5.218 2.08-6.58C6.143 3.358 7.424 2.75 9 2.75c2.667 0 5.333 2.548 7 1.5 0 0 7.333 2.04 5 7.75z" />
        <path d="M11.5 14c.413 1.165 2 2 3.5 2a4.126 4.126 0 0 0 3.322-1.678" />
      </svg>,
  title: 'Ayrıcalıklı Yaşam',
  description: 'Şehrin merkezine sadece dakikalar uzaklıkta, sakinlik ve doğal güzelliklerle çevrili ayrıcalıklı bir yaşam sizi bekliyor.'
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-therma">
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>,
  title: 'Lüks Mimari',
  description: 'Modern ve çağdaş çizgileri doğal malzemelerle buluşturan özel tasarım villalar.'
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-therma">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>,
  title: 'Eşsiz Konum',
  description: 'Yalova Termal bölgesine çok yakın, doğanın kalbinde özel konumlanmış bir yaşam alanı.'
}];
const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
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
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach(el => observer.observe(el));
    return () => {
      featureElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  return <section className="py-24 px-6 bg-gradient-to-b from-white to-therma-gray" ref={featuresRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-therma mb-3">ÖZELLIKLER</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Therma Prime'ın Ayrıcalıkları
          </h2>
          <p className="text-gray-600 md:text-lg">Therma Prime, sadece bir konut projesi değil, ayrıcalıklı bir yaşam tarzıdır. Doğa ile iç içe, konforlu bir yaşam sunuyoruz.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="feature-card animate-on-scroll glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl" style={{
          animationDelay: `${index * 150}ms`
        }}>
              <div className="p-4 mb-4 rounded-full bg-therma/10 text-therma">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Features;
