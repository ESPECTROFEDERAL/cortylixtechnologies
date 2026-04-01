import { ArrowRight, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface HeroProps {
  onQuoteOpen: () => void;
}

const HeroSection = ({ onQuoteOpen }: HeroProps) => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '30+', label: 'Happy Clients' },
    { value: '3+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
        
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.04] animate-grid_move"
          style={{
            backgroundImage:
              'linear-gradient(hsl(193 100% 42% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(193 100% 42% / 0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(hsl(193 100% 42%) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-sm mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm text-secondary font-medium tracking-wide">Digital Solutions Company — Tanzania</span>
        </div>

        {/* Main headline */}
        <h1 
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {t('heroTitle').split(' ').map((word, i) =>
            ['Digital', 'Solutions', 'Future', 'Kidijitali', 'Kisasa'].includes(word) ? (
              <span key={i} className="text-gradient relative">
                {word}{' '}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {t('heroSubtitle')}
        </p>

        {/* CTA buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-700 delay-[450ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow text-base px-10 py-7 font-semibold rounded-xl group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('getStarted')}
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary/40 text-secondary hover:bg-secondary/10 text-base px-10 py-7 font-semibold rounded-xl backdrop-blur-sm"
            onClick={onQuoteOpen}
          >
            {t('requestQuote')}
          </Button>
        </div>

        {/* Stats bar */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 md:p-6 text-center hover:border-secondary/30 transition-all duration-300 group">
              <div className="font-display text-2xl md:text-3xl font-bold text-secondary mb-1 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-colors animate-float"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};

export default HeroSection;
