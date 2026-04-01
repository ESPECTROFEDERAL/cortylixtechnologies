import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CTAProps {
  onQuoteOpen: () => void;
}

const CTASection = ({ onQuoteOpen }: CTAProps) => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-secondary/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(var(--secondary)/0.2),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-medium">Let's Build Something Great</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">{t('ctaTitle')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">{t('ctaSubtitle')}</p>
            <Button
              size="lg"
              onClick={onQuoteOpen}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow text-base px-10 py-7 font-semibold rounded-xl group"
            >
              {t('requestQuote')}
              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
