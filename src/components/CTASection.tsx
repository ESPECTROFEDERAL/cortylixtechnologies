import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CTAProps {
  onQuoteOpen: () => void;
}

const CTASection = ({ onQuoteOpen }: CTAProps) => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4">
      <div ref={ref} className={`container mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8 sm:mb-10 text-base sm:text-lg">
          {t('ctaSubtitle')}
        </p>
        <Button
          size="lg"
          onClick={onQuoteOpen}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm sm:text-base px-8 sm:px-10 py-6 sm:py-7 font-semibold rounded-full group"
        >
          Start a Conversation
          <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
