
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Ana Sayfa", path: "/" },
    { title: "Proje Hakkında", path: "/hakkinda" },
    { title: "Villalar", path: "/villalar" },
    { title: "Galeri", path: "/galeri" },
    { title: "İletişim", path: "/iletisim" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-md py-3' 
        : 'bg-white py-5'
    }`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo - with reduced size on mobile */}
        <Link to="/" className="relative z-10">
          <img 
            src="/lovable-uploads/864191c8-0799-486e-a6e2-78e1e206c82a.png" 
            alt="Therma Prime Logo" 
            className="h-16 md:h-24 w-auto object-contain" // Reduced from h-24 md:h-28
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`font-medium transition-all duration-300 hover:text-therma ${
                location.pathname === link.path 
                  ? 'text-therma' 
                  : 'text-gray-800'
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button - Now using Sheet from shadcn/ui */}
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="md:hidden relative z-10 p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end justify-center gap-1.5">
                <span className="block h-0.5 w-6 bg-gray-800 rounded"></span>
                <span className="block h-0.5 w-4 bg-gray-800 rounded"></span>
                <span className="block h-0.5 w-6 bg-gray-800 rounded"></span>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-full sm:max-w-[350px] bg-white">
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 flex items-center justify-between border-b">
                <img 
                  src="/lovable-uploads/864191c8-0799-486e-a6e2-78e1e206c82a.png" 
                  alt="Therma Prime Logo" 
                  className="h-16 w-auto object-contain" // Reduced from h-20
                />
              </div>
              <nav className="flex-1 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center space-y-8 py-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className={`text-xl font-medium transition-all duration-300 hover:text-therma ${
                        location.pathname === link.path ? 'text-therma' : 'text-gray-800'
                      }`}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
