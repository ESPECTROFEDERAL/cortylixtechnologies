import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'James Mwangi',
    role: 'CEO, Savannah Retail',
    text: 'CORTYLIX TECHNOLOGIES built our e-commerce platform from scratch. Their professionalism and speed were impressive. Our online sales have grown by 200% since the launch!',
    initials: 'JM',
  },
  {
    name: 'Amina Hassan',
    role: 'Director, Bright Future Academy',
    text: 'The school management system they developed has transformed how we operate. Everything from grading to attendance is now digital and efficient. Highly recommended!',
    initials: 'AH',
  },
  {
    name: 'David Kimaro',
    role: 'Founder, Kilimanjaro Tours',
    text: 'Their graphic design work gave our brand a completely new identity. The logo and marketing materials are stunning. They truly understand the local market.',
    initials: 'DK',
  },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible, getDelay } = useStaggerAnimation(testimonials.length);

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4">
      <div className="container mx-auto">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('testimonialsTitle')}
          </h2>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 sm:p-8 hover:border-secondary/30 hover:-translate-y-2 transition-all duration-500 relative group ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={gridVisible ? { ...getDelay(i), transitionDuration: '600ms' } : getDelay(i)}
            >
              <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-secondary/10 absolute top-4 sm:top-6 right-4 sm:right-6 group-hover:text-secondary/20 transition-colors" />
              <div className="flex gap-1 mb-4 sm:mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">"{item.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center text-xs sm:text-sm font-bold text-secondary">
                  {item.initials}
                </div>
                <div>
                  <p className="font-display font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
