import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onQuoteOpen: () => void;
}

const HeroSection = ({ onQuoteOpen }: HeroProps) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
        <div
          className="absolute inset-0 opacity-[0.03] animate-grid_move"
          style={{
            backgroundImage:
              'linear-gradient(hsl(193 100% 42% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(193 100% 42% / 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-8 animate-fade-in">
          <Zap className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">Digital Solutions Company — Tanzania</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
          {t('heroTitle').split(' ').map((word, i) =>
            ['Digital', 'Solutions', 'Future', 'Kidijitali', 'Kisasa'].includes(word) ? (
              <span key={i} className="text-gradient">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
           style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          {t('heroSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
             style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow text-base px-8 py-6 font-semibold"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('getStarted')}
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary/40 text-secondary hover:bg-secondary/10 text-base px-8 py-6 font-semibold"
            onClick={onQuoteOpen}
          >
            {t('requestQuote')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
