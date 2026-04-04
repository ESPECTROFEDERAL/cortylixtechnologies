import { Shield, Globe, Server, Code, Palette, Monitor, Smartphone, Search, Bug, Zap } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const services = [
  { icon: Shield, title: 'Cybersecurity', desc: 'Security audits, protection & ethical hacking' },
  { icon: Globe, title: 'Web Development', desc: 'Custom websites & web applications' },
  { icon: Server, title: 'Web Hosting', desc: 'Fast, secure & reliable hosting' },
  { icon: Code, title: 'Software Development', desc: 'Tailored systems & applications' },
  { icon: Palette, title: 'Graphic Design', desc: 'Branding, logos & visual content' },
  { icon: Monitor, title: 'IT Support', desc: 'System maintenance & troubleshooting' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Android & cross-platform apps' },
  { icon: Bug, title: 'Penetration Testing', desc: 'Vulnerability testing & reports' },
  { icon: Search, title: 'SEO Optimization', desc: 'Website ranking & performance' },
  { icon: Zap, title: 'Automation & Scripting', desc: 'Bots, tools & task automation' },
];

const ServicesGrid = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(10);

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-secondary text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">What We Do</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            We offer a wide range of digital solutions tailored to your business needs
          </p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-border/20 bg-card/40 backdrop-blur-sm p-6 transition-all duration-500 hover:border-secondary/40 hover:bg-card/70 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.1)] hover:-translate-y-1 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={gridVisible ? { ...getDelay(i), transitionDuration: '500ms' } : getDelay(i)}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/15 to-primary/15 flex items-center justify-center mb-4 group-hover:from-secondary/25 group-hover:to-primary/25 group-hover:scale-110 transition-all duration-300">
                <s.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg mb-1.5 group-hover:text-secondary transition-colors">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {s.desc}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
