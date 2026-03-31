import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/50 bg-accent/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground">
                C
              </div>
              <span className="font-display font-bold text-foreground">CORTYLIX</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Innovative digital solutions for businesses in Tanzania and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t('quickLinks')}</h4>
            <div className="flex flex-col gap-2">
              {['home', 'services', 'portfolio', 'contact'].map((id) => (
                <button key={id} onClick={() => scrollTo(id === 'home' ? 'hero' : id)} className="text-muted-foreground hover:text-secondary text-sm text-left transition-colors">
                  {t(id === 'home' ? 'home' : id)}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t('ourServices')}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{t('webDev')}</span>
              <span>{t('softwareDev')}</span>
              <span>{t('graphicDesign')}</span>
              <span>{t('itSupport')}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">{t('contactInfo')}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contact@cortylix.com</span>
              <span>+255 700 000 000</span>
              <span>Dar es Salaam, Tanzania</span>
            </div>
            <div className="flex gap-3 mt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition-colors text-muted-foreground">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-6 text-center text-sm text-muted-foreground">
          © 2026 CORTYLIX TECHNOLOGIES. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
