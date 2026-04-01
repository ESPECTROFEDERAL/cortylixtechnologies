import { useState } from 'react';
import { Rocket, Users, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteDialog from '@/components/QuoteDialog';

const About = () => {
  const { t } = useLanguage();
  const [quoteOpen, setQuoteOpen] = useState(false);

  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      desc: 'We constantly explore new technologies and push boundaries to deliver cutting-edge solutions.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      desc: 'We believe in community-driven development to accelerate progress.',
    },
    {
      icon: Heart,
      title: 'Passion',
      desc: 'Every project is fueled by genuine curiosity and love for technology.',
    },
  ];

  const expertise = ['Web Development', 'Software Systems', 'Graphic Design'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-secondary">CORTYLIX</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('aboutDesc')}
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{t('mission')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t('missionDesc')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('visionDesc')}
              </p>
              <div className="flex flex-wrap gap-3">
                {expertise.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-muted/20 text-sm font-medium text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Card */}
            <div className="w-full lg:w-1/2">
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🚀</div>
                <p className="text-muted-foreground italic text-lg">
                  "We build digital solutions faster than you can imagine."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center hover:border-secondary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <value.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">
            Let's collaborate on your next project and push the boundaries of technology together.
          </p>
          <Button
            onClick={() => setQuoteOpen(true)}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 py-7 text-base font-semibold group"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default About;
