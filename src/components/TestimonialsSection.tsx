import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    name: 'James Mwangi',
    role: 'CEO, Savannah Retail',
    text: 'CORTYLIX TECHNOLOGIES built our e-commerce platform from scratch. Their professionalism and speed were impressive. Our online sales have grown by 200% since the launch!',
  },
  {
    name: 'Amina Hassan',
    role: 'Director, Bright Future Academy',
    text: 'The school management system they developed has transformed how we operate. Everything from grading to attendance is now digital and efficient. Highly recommended!',
  },
  {
    name: 'David Kimaro',
    role: 'Founder, Kilimanjaro Tours',
    text: 'Their graphic design work gave our brand a completely new identity. The logo and marketing materials are stunning. They truly understand the local market.',
  },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          {t('testimonialsTitle')}
        </h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-16 rounded-full" />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 hover:border-secondary/40 transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-secondary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{item.text}"</p>
              <div>
                <p className="font-display font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
