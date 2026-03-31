import { Globe, Code, Palette, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Globe, title: t('webDev'), desc: t('webDevDesc') },
    { icon: Code, title: t('softwareDev'), desc: t('softwareDevDesc') },
    { icon: Palette, title: t('graphicDesign'), desc: t('graphicDesignDesc') },
    { icon: Headphones, title: t('itSupport'), desc: t('itSupportDesc') },
  ];

  return (
    <section id="services" className="section-padding bg-accent/30">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          {t('servicesTitle')}
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-4">{t('servicesSubtitle')}</p>
        <div className="w-20 h-1 bg-secondary mx-auto mb-16 rounded-full" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 group hover:border-secondary/50 hover:-translate-y-2 transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 group-hover:glow-sm transition-all">
                <s.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
