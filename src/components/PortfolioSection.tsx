import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  { title: 'E-Commerce Platform', desc: 'Full-stack online store for a retail business in Dar es Salaam.', tag: 'Web Development', gradient: 'from-secondary/30 via-primary/20 to-secondary/5' },
  { title: 'School Management System', desc: 'Custom software for managing student records and grading.', tag: 'Software', gradient: 'from-primary/30 via-secondary/15 to-primary/5' },
  { title: 'Restaurant Brand Identity', desc: 'Complete branding package including logo and social media kit.', tag: 'Design', gradient: 'from-secondary/20 via-primary/30 to-secondary/10' },
  { title: 'Hotel Booking Website', desc: 'Responsive booking platform for a hospitality business.', tag: 'Web Development', gradient: 'from-primary/25 via-secondary/20 to-primary/5' },
  { title: 'Clinic Patient Portal', desc: 'Secure patient management and appointment scheduling system.', tag: 'Software', gradient: 'from-secondary/25 via-primary/15 to-secondary/5' },
  { title: 'Corporate Network Setup', desc: 'End-to-end networking and IT infrastructure for an office.', tag: 'IT Support', gradient: 'from-primary/20 via-secondary/25 to-primary/10' },
];

const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="section-padding bg-accent/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Recent Work</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('portfolioTitle')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('portfolioSubtitle')}</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="glass rounded-2xl overflow-hidden group hover:border-secondary/40 hover:-translate-y-2 transition-all duration-500"
            >
              <div className={`h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-6xl font-display font-bold text-foreground/5 group-hover:text-foreground/10 group-hover:scale-110 transition-all duration-500">
                  0{i + 1}
                </span>
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                  {p.tag}
                </span>
                <h3 className="font-display font-bold text-lg mt-3 mb-2 flex items-center gap-2 group-hover:text-secondary transition-colors">
                  {p.title}
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
