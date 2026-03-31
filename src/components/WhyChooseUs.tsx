import { Rocket, DollarSign, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Rocket, title: t('fastDelivery'), desc: t('fastDeliveryDesc') },
    { icon: DollarSign, title: t('affordable'), desc: t('affordableDesc') },
    { icon: MapPin, title: t('localSupport'), desc: t('localSupportDesc') },
    { icon: ShieldCheck, title: t('reliable'), desc: t('reliableDesc') },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          {t('whyTitle')}
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-16 rounded-full" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 group-hover:glow-sm transition-all duration-300">
                <r.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
