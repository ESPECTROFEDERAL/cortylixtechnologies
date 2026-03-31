import { ArrowRight } from 'lucide-react';
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
        <div className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/10" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('ctaTitle')}</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">{t('ctaSubtitle')}</p>
            <Button
              size="lg"
              onClick={onQuoteOpen}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow text-base px-8 py-6 font-semibold"
            >
              {t('requestQuote')}
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
