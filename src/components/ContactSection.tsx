import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { sanitizeInput, checkRateLimit } from '@/lib/security';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!checkRateLimit('contact-form', 3, 5 * 60 * 1000)) {
      toast({ title: 'Please wait', description: 'Too many submissions. Try again in a few minutes.', variant: 'destructive' });
      return;
    }
    const sanitized = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message),
    };
    toast({ title: 'Message Sent!', description: 'We will get back to you within 24 hours.' });
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  const contactInfo = [
    { icon: Mail, label: 'contact@cortylix.com', href: 'mailto:contact@cortylix.com', color: 'bg-secondary/10 text-secondary' },
    { icon: Phone, label: '+255 700 000 000', href: 'tel:+255700000000', color: 'bg-primary/10 text-primary' },
    { icon: MapPin, label: 'Dar es Salaam, Tanzania', href: '#', color: 'bg-accent/20 text-secondary' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-secondary text-sm font-semibold tracking-wider uppercase mb-3">Get In Touch</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">{t('contactSubtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Info Side */}
          <div ref={infoRef} className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 ${infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-lg sm:text-xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ready to start your project? Reach out to us and let's build something amazing together.
              </p>

              <div className="space-y-4">
                {contactInfo.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-foreground/5 transition-colors group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <c.icon className="w-5 h-5" />
                    </div>
                    <span className="text-foreground text-sm sm:text-base">{c.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-border/20">
                <a href="https://wa.me/255700000000" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[hsl(142,70%,30%)] hover:bg-[hsl(142,70%,25%)] text-primary-foreground font-semibold rounded-xl h-12">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('chatWhatsApp')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass rounded-2xl p-6">
              <h4 className="font-display font-bold text-sm mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-foreground font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-foreground font-medium">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-destructive font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div ref={formRef} className={`lg:col-span-3 transition-all duration-700 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2">Send us a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Name</label>
                  <Input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-background/50 border-border/30 focus:border-secondary h-11 sm:h-12 rounded-xl"
                    maxLength={100}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-background/50 border-border/30 focus:border-secondary h-11 sm:h-12 rounded-xl"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Message</label>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-background/50 border-border/30 focus:border-secondary min-h-[160px] sm:min-h-[180px] rounded-xl resize-none"
                  maxLength={1000}
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 sm:h-13 font-semibold rounded-xl text-base group">
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                {t('sendMessage')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
