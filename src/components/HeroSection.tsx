import { ArrowRight, ChevronDown } from 'lucide-react';
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

  const categories = [
    { label: 'Web Dev', desc: 'Custom Websites & Apps' },
    { label: 'Software', desc: 'Tailored Systems' },
    { label: 'Design', desc: 'Branding & Graphics' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Orbital ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full border border-border/20 opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-border/10 opacity-20" />

      {/* Floating orbs */}
      <div className="absolute top-[15%] right-[15%] w-16 h-16 rounded-full bg-secondary/20 blur-sm animate-float" />
      <div className="absolute top-[25%] left-[10%] w-8 h-8 rounded-full bg-[hsl(270,80%,60%)] opacity-40 blur-sm animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] right-[25%] w-6 h-6 rounded-full bg-secondary/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[60%] left-[20%] w-4 h-4 rounded-full bg-[hsl(270,80%,60%)] opacity-30 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[10%] left-[50%] w-3 h-3 rounded-full bg-secondary/40 animate-float" style={{ animationDelay: '0.5s' }} />

      {/* Large blurred orbs */}
      <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-[10%] w-[250px] h-[250px] bg-[hsl(270,80%,60%)]/5 rounded-full blur-[100px]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--secondary)) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-secondary/20 bg-secondary/5 backdrop-blur-sm mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm text-secondary font-medium tracking-wide">Digital Solutions Company — Tanzania</span>
        </div>

        {/* Main headline */}
        <h1
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {t('heroTitle').split(' ').map((word, i) =>
            ['Digital', 'Solutions', 'Future', 'Kidijitali', 'Kisasa'].includes(word) ? (
              <span key={i} className="text-gradient">
                {word}{' '}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {t('heroSubtitle')}
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 transition-all duration-700 delay-[450ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow text-base px-10 py-7 font-semibold rounded-full group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('getStarted')}
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/50 text-foreground hover:bg-muted/20 text-base px-10 py-7 font-semibold rounded-full backdrop-blur-sm"
            onClick={onQuoteOpen}
          >
            {t('requestQuote')}
          </Button>
        </div>

        {/* Category stats */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20 transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {categories.map((cat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-secondary mb-1">{cat.label}</div>
              <div className="text-sm text-muted-foreground">{cat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
      >
        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
