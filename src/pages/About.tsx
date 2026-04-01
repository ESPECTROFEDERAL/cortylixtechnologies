import { useState } from 'react';
import { Target, Eye, Building, Users, Award, ChevronDown, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import QuoteDialog from '@/components/QuoteDialog';

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => setExpanded(expanded === key ? null : key);

  const sections = [
    {
      key: 'company',
      icon: Building,
      title: t('aboutTitle'),
      content: t('aboutDesc'),
      gradient: 'from-secondary/20 to-primary/10',
    },
    {
      key: 'mission',
      icon: Target,
      title: t('mission'),
      content: t('missionDesc'),
      gradient: 'from-primary/20 to-secondary/10',
    },
    {
      key: 'vision',
      icon: Eye,
      title: t('vision'),
      content: t('visionDesc'),
      gradient: 'from-secondary/10 to-primary/20',
    },
  ];

  const team = [
    { name: 'CORTYLIX Team', role: 'Founders & Engineers', icon: Users },
    { name: 'Innovation First', role: 'Our Core Philosophy', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />

      {/* Hero banner */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[120px]" />

        <div className="relative z-10 container mx-auto text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('aboutTitle').split(' ').map((word, i) => (
              <span key={i} className={i === 0 ? 'text-gradient' : ''}>{word} </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a passionate team of engineers and designers building the digital future of Tanzania.
          </p>
        </div>
      </section>

      {/* Expandable sections */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl space-y-6">
          {sections.map((section) => (
            <div
              key={section.key}
              className="glass rounded-2xl overflow-hidden hover:border-secondary/30 transition-all duration-300"
            >
              <button
                onClick={() => toggle(section.key)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold group-hover:text-secondary transition-colors">
                    {section.title}
                  </h2>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                    expanded === section.key ? 'rotate-180 text-secondary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expanded === section.key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0">
                  <div className="border-t border-border/30 pt-6">
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Bio / Values */}
      <section className="section-padding bg-accent/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Who We Are
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center hover:border-secondary/30 transition-all duration-300 group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <member.icon className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl p-8 md:p-12 mt-8">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg text-center max-w-3xl mx-auto">
              Founded in Tanzania, CORTYLIX TECHNOLOGIES was born from a passion to bridge the digital gap for local businesses. 
              We combine cutting-edge technology with deep understanding of the African market to deliver solutions that truly make a difference. 
              From small startups to established enterprises, we've helped dozens of businesses transform their operations and reach new customers through technology.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default About;
