import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onQuoteOpen: () => void;
}

const Navbar = ({ onQuoteOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  const navLinks = [
    { label: t('home'), id: 'hero' },
    { label: t('aboutTitle'), action: () => { navigate('/about'); setIsMobileOpen(false); } },
    { label: t('services'), id: 'services' },
    { label: t('portfolio'), id: 'portfolio' },
    { label: t('contact'), id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/30' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">
            C
          </div>
          <span className="font-display font-bold text-foreground hidden sm:inline tracking-tight">
            CORTYLIX <span className="text-secondary">TECHNOLOGIES</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={link.action || (() => scrollTo(link.id!))}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-full border border-border/30 hover:border-border/60"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === 'en' ? 'SW' : 'EN'}
          </button>
          <Button
            onClick={onQuoteOpen}
            className="hidden md:inline-flex bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-full text-sm px-5"
            size="sm"
          >
            {t('requestQuote')}
          </Button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={link.action || (() => scrollTo(link.id!))}
                className="text-left text-foreground hover:text-secondary transition-colors py-2 text-lg font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => { onQuoteOpen(); setIsMobileOpen(false); }}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full mt-2 rounded-full"
            >
              {t('requestQuote')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
