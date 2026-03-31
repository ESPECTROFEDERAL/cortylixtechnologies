import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  { title: 'E-Commerce Platform', desc: 'Full-stack online store for a retail business in Dar es Salaam.', tag: 'Web Development' },
  { title: 'School Management System', desc: 'Custom software for managing student records and grading.', tag: 'Software Development' },
  { title: 'Restaurant Brand Identity', desc: 'Complete branding package including logo and social media kit.', tag: 'Graphic Design' },
  { title: 'Hotel Booking Website', desc: 'Responsive booking platform for a hospitality business.', tag: 'Web Development' },
  { title: 'Clinic Patient Portal', desc: 'Secure patient management and appointment scheduling system.', tag: 'Software Development' },
  { title: 'Corporate Network Setup', desc: 'End-to-end networking and IT infrastructure for an office.', tag: 'IT Support' },
];

const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="section-padding bg-accent/30">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          {t('portfolioTitle')}
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-4">{t('portfolioSubtitle')}</p>
        <div className="w-20 h-1 bg-secondary mx-auto mb-16 rounded-full" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="glass rounded-2xl overflow-hidden group hover:border-secondary/40 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-primary/30 to-secondary/10 flex items-center justify-center">
                <span className="text-5xl font-display font-bold text-secondary/20 group-hover:text-secondary/40 transition-colors">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  {p.tag}
                </span>
                <h3 className="font-display font-semibold text-lg mt-3 mb-2 flex items-center gap-2">
                  {p.title}
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
