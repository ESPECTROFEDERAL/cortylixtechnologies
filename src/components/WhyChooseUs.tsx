import { Rocket, DollarSign, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(4);

  const reasons = [
    { icon: Rocket, title: t('fastDelivery'), desc: t('fastDeliveryDesc'), number: '01' },
    { icon: DollarSign, title: t('affordable'), desc: t('affordableDesc'), number: '02' },
    { icon: MapPin, title: t('localSupport'), desc: t('localSupportDesc'), number: '03' },
    { icon: ShieldCheck, title: t('reliable'), desc: t('reliableDesc'), number: '04' },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.05),transparent_50%)]" />
      
      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-secondary text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Our Advantages</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('whyTitle')}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((r, i) => (
            <div
              key={i}
              className={`text-center group relative transition-all duration-600 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={gridVisible ? { ...getDelay(i), transitionDuration: '600ms' } : getDelay(i)}
            >
              <div className="absolute -top-2 -right-2 font-display text-4xl sm:text-5xl font-bold text-secondary/5 group-hover:text-secondary/10 transition-colors">
                {r.number}
              </div>
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 group-hover:from-secondary/20 group-hover:to-primary/20 transition-all duration-300">
                <r.icon className="w-5 sm:w-7 h-5 sm:h-7 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-lg mb-2 group-hover:text-secondary transition-colors">{r.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
