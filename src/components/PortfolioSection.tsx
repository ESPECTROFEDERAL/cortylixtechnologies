import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  { title: 'E-Commerce Platform', desc: 'Full-stack online store for a retail business in Dar es Salaam.', tag: 'Web Development', gradient: 'from-secondary/20 to-primary/10' },
  { title: 'School Management System', desc: 'Custom software for managing student records and grading.', tag: 'Software', gradient: 'from-primary/20 to-secondary/10' },
  { title: 'Restaurant Brand Identity', desc: 'Complete branding package including logo and social media kit.', tag: 'Design', gradient: 'from-secondary/15 to-primary/15' },
  { title: 'Hotel Booking Website', desc: 'Responsive booking platform for a hospitality business.', tag: 'Web Development', gradient: 'from-primary/15 to-secondary/20' },
  { title: 'Clinic Patient Portal', desc: 'Secure patient management and appointment scheduling system.', tag: 'Software', gradient: 'from-secondary/20 to-primary/15' },
  { title: 'Corporate Network Setup', desc: 'End-to-end networking and IT infrastructure for an office.', tag: 'IT Support', gradient: 'from-primary/20 to-secondary/15' },
];

const PortfolioSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(projects.length);

  return (
    <section id="portfolio" className="py-16 sm:py-24 md:py-32 px-4">
      <div className="container mx-auto">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-secondary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">{t('portfolioSubtitle')}</p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden group hover:border-secondary/30 hover:-translate-y-2 transition-all duration-500 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={gridVisible ? { ...getDelay(i), transitionDuration: '600ms', transitionTimingFunction: 'ease-out' } : getDelay(i)}
            >
              <div className={`h-36 sm:h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl sm:text-6xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 group-hover:scale-110 transition-all duration-500">
                  0{i + 1}
                </span>
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg mt-3 mb-2 flex items-center gap-2 group-hover:text-secondary transition-colors">
                  {p.title}
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
