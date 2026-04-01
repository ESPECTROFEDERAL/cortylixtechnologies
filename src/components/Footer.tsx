import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-display font-bold text-secondary-foreground text-sm">
                C
              </div>
              <span className="font-display font-bold text-foreground">CORTYLIX TECHNOLOGIES</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Innovative digital solutions for businesses in Tanzania and beyond.
            </p>
            <div className="flex gap-3">
              {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-border/30 flex items-center justify-center hover:border-secondary/50 hover:text-secondary transition-colors text-muted-foreground">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Navigation</h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => scrollTo('hero')} className="text-muted-foreground hover:text-foreground text-sm text-left transition-colors">{t('home')}</button>
              <button onClick={() => navigate('/about')} className="text-muted-foreground hover:text-foreground text-sm text-left transition-colors">{t('aboutTitle')}</button>
              <button onClick={() => scrollTo('services')} className="text-muted-foreground hover:text-foreground text-sm text-left transition-colors">{t('services')}</button>
              <button onClick={() => scrollTo('portfolio')} className="text-muted-foreground hover:text-foreground text-sm text-left transition-colors">{t('portfolio')}</button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">{t('ourServices')}</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>{t('webDev')}</span>
              <span>{t('softwareDev')}</span>
              <span>{t('graphicDesign')}</span>
              <span>{t('itSupport')}</span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Resources</h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => scrollTo('contact')} className="text-muted-foreground hover:text-foreground text-sm text-left transition-colors">{t('contact')}</button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <span>contact@cortylix.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 CORTYLIX TECHNOLOGIES. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
