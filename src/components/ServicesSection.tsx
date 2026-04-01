import { useState } from 'react';
import { Globe, Code, Palette, Headphones, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ServiceBookingDialog from '@/components/ServiceBookingDialog';

const ServicesSection = () => {
  const { t } = useLanguage();
  const [bookingService, setBookingService] = useState<{ name: string; icon: React.ReactNode } | null>(null);

  const services = [
    { icon: Globe, title: t('webDev'), desc: t('webDevDesc'), color: 'from-secondary/20 to-secondary/5' },
    { icon: Code, title: t('softwareDev'), desc: t('softwareDevDesc'), color: 'from-primary/30 to-secondary/10' },
    { icon: Palette, title: t('graphicDesign'), desc: t('graphicDesignDesc'), color: 'from-secondary/15 to-primary/15' },
    { icon: Headphones, title: t('itSupport'), desc: t('itSupportDesc'), color: 'from-primary/20 to-secondary/15' },
  ];

  return (
    <>
      <section id="services" className="section-padding bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary text-sm font-semibold tracking-widest uppercase mb-3">What We Offer</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('servicesTitle')}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('servicesSubtitle')}</p>
            <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 group hover:border-secondary/50 hover:-translate-y-3 transition-all duration-500 cursor-pointer relative overflow-hidden"
                onClick={() => setBookingService({ name: s.title, icon: <s.icon className="w-5 h-5 text-secondary" /> })}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
                    <s.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-secondary transition-colors">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex items-center gap-2 text-secondary text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceBookingDialog
        open={!!bookingService}
        onOpenChange={(open) => !open && setBookingService(null)}
        serviceName={bookingService?.name || ''}
        serviceIcon={bookingService?.icon || null}
      />
    </>
  );
};

export default ServicesSection;
