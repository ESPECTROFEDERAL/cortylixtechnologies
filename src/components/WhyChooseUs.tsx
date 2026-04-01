import { Rocket, DollarSign, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Rocket, title: t('fastDelivery'), desc: t('fastDeliveryDesc'), number: '01' },
    { icon: DollarSign, title: t('affordable'), desc: t('affordableDesc'), number: '02' },
    { icon: MapPin, title: t('localSupport'), desc: t('localSupportDesc'), number: '03' },
    { icon: ShieldCheck, title: t('reliable'), desc: t('reliableDesc'), number: '04' },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Our Advantages</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('whyTitle')}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <div key={i} className="text-center group relative">
              <div className="absolute -top-2 -right-2 font-display text-5xl font-bold text-secondary/5 group-hover:text-secondary/10 transition-colors">
                {r.number}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-secondary/20 group-hover:to-primary/20 transition-all duration-300">
                <r.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
