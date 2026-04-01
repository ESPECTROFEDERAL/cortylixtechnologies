import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import QuoteDialog from '@/components/QuoteDialog';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onQuoteOpen={() => setQuoteOpen(true)} />
      <HeroSection onQuoteOpen={() => setQuoteOpen(true)} />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection onQuoteOpen={() => setQuoteOpen(true)} />
      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
