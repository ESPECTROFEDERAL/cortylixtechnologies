import { Shield, Rocket, Cpu, DollarSign, HeadphonesIcon, Zap } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const features = [
  { icon: Shield, title: 'Security-Focused Solutions', desc: 'We prioritize protecting your data and systems with industry-leading security practices.' },
  { icon: Rocket, title: 'Fast & Reliable Performance', desc: 'Our solutions are optimized for speed, ensuring your business stays ahead of the competition.' },
  { icon: Cpu, title: 'Modern Technologies', desc: 'We use cutting-edge tools and frameworks to build future-proof digital solutions.' },
  { icon: DollarSign, title: 'Affordable Pricing', desc: 'Enterprise-quality solutions at prices tailored for small businesses and startups.' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Round-the-clock technical support to keep your systems running without interruption.' },
  { icon: Zap, title: 'Quick Turnaround', desc: 'We deliver projects on time without compromising on quality or attention to detail.' },
];

const WhyChooseUs = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(6);

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--secondary)/0.05),transparent_50%)]" />

      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-secondary text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">Our Advantages</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-secondary">CORTYLIX</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            We combine expertise, modern technology, and dedication to deliver results that exceed expectations
          </p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group text-center p-6 sm:p-8 rounded-2xl border border-border/15 bg-card/30 backdrop-blur-sm hover:border-secondary/30 hover:bg-card/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(var(--secondary)/0.08)] ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={gridVisible ? { ...getDelay(i), transitionDuration: '600ms' } : getDelay(i)}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-secondary/20 group-hover:to-primary/20 transition-all duration-300">
                <f.icon className="w-6 sm:w-7 h-6 sm:h-7 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg mb-2 group-hover:text-secondary transition-colors">{f.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
