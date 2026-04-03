import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

const gradients = [
  'from-secondary/20 to-primary/10',
  'from-primary/20 to-secondary/10',
  'from-secondary/15 to-primary/15',
  'from-primary/15 to-secondary/20',
  'from-secondary/20 to-primary/15',
  'from-primary/20 to-secondary/15',
];

const fallbackProjects = [
  { title: 'E-Commerce Platform', description: 'Full-stack online store for a retail business in Dar es Salaam.', tag: 'Web Development', image_url: null, link: null },
  { title: 'School Management System', description: 'Custom software for managing student records and grading.', tag: 'Software', image_url: null, link: null },
  { title: 'Restaurant Brand Identity', description: 'Complete branding package including logo and social media kit.', tag: 'Design', image_url: null, link: null },
  { title: 'Hotel Booking Website', description: 'Responsive booking platform for a hospitality business.', tag: 'Web Development', image_url: null, link: null },
  { title: 'Clinic Patient Portal', description: 'Secure patient management and appointment scheduling system.', tag: 'Software', image_url: null, link: null },
  { title: 'Corporate Network Setup', description: 'End-to-end networking and IT infrastructure for an office.', tag: 'IT Support', image_url: null, link: null },
];

type ProjectItem = { title: string; description: string; tag: string; image_url: string | null; link: string | null };

const PortfolioSection = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(projects.length || 6);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('projects').select('*').order('display_order');
      if (data?.length) setProjects(data);
      else setProjects(fallbackProjects);
    };
    fetch();
  }, []);

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
              <div className={`h-36 sm:h-48 ${p.image_url ? '' : `bg-gradient-to-br ${gradients[i % gradients.length]}`} flex items-center justify-center relative overflow-hidden`}>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <span className="text-5xl sm:text-6xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 group-hover:scale-110 transition-all duration-500">
                    0{i + 1}
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg mt-3 mb-2 flex items-center gap-2 group-hover:text-secondary transition-colors">
                  {p.title}
                  {p.link && <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
