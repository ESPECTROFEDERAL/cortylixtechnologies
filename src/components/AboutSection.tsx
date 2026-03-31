import { Target, Eye, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Building, title: t('aboutTitle'), desc: t('aboutDesc') },
    { icon: Target, title: t('mission'), desc: t('missionDesc') },
    { icon: Eye, title: t('vision'), desc: t('visionDesc') },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          {t('aboutTitle')}
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-16 rounded-full" />

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 text-center hover:border-secondary/40 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
