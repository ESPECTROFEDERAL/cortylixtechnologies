import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ServiceBookingDialog from '@/components/ServiceBookingDialog';
import serviceWebdev from '@/assets/service-webdev.jpg';
import serviceSoftware from '@/assets/service-software.jpg';
import serviceDesign from '@/assets/service-design.jpg';
import serviceIt from '@/assets/service-it.jpg';

const ServicesSection = () => {
  const { t } = useLanguage();
  const [bookingService, setBookingService] = useState<{ name: string; icon: React.ReactNode } | null>(null);

  const services = [
    {
      title: t('webDev'),
      desc: t('webDevDesc'),
      image: serviceWebdev,
      features: [
        'Responsive business websites',
        'E-commerce platforms',
        'Progressive web applications',
        'SEO optimization',
        'CMS integration',
        'Performance tuning',
      ],
    },
    {
      title: t('softwareDev'),
      desc: t('softwareDevDesc'),
      image: serviceSoftware,
      features: [
        'Custom management systems',
        'Database design & development',
        'API development & integration',
        'Workflow automation',
        'School & clinic portals',
        'Inventory management',
      ],
    },
    {
      title: t('graphicDesign'),
      desc: t('graphicDesignDesc'),
      image: serviceDesign,
      features: [
        'Logo & brand identity design',
        'Social media graphics',
        'Business card & stationery',
        'Marketing materials',
        'UI/UX design',
        'Brand guidelines',
      ],
    },
    {
      title: t('itSupport'),
      desc: t('itSupportDesc'),
      image: serviceIt,
      features: [
        'Hardware diagnostics & repair',
        'Software installation & config',
        'Network setup & troubleshooting',
        'System performance optimization',
        'Security audits & fixes',
        'Remote & on-site support',
      ],
    },
  ];

  return (
    <>
      <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-secondary">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {services.map((service, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-2xl overflow-hidden border border-border/30">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        width={800}
                        height={544}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">{service.desc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => setBookingService({ name: service.title, icon: <CheckCircle2 className="w-5 h-5 text-secondary" /> })}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 font-semibold"
                    >
                      Book This Service
                    </Button>
                  </div>
                </div>
              );
            })}
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
