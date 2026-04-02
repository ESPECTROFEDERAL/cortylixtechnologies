import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
    toast({ title: 'Message Sent!', description: 'We will get back to you within 24 hours.' });
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  const contactInfo = [
    { icon: Mail, label: 'contact@cortylix.com' },
    { icon: Phone, label: '+255 700 000 000' },
    { icon: MapPin, label: 'Dar es Salaam, Tanzania' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4">
      <div className="container mx-auto">
        <div ref={headerRef} className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">{t('contactSubtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          <div ref={formRef} className={`transition-all duration-700 ${formVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 sm:p-8 space-y-4 sm:space-y-5"
          >
            <div>
              <Input placeholder={t('yourName')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border/30 focus:border-secondary h-11 sm:h-12 rounded-xl" maxLength={100} />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Input type="email" placeholder={t('yourEmail')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50 border-border/30 focus:border-secondary h-11 sm:h-12 rounded-xl" maxLength={255} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Textarea placeholder={t('yourMessage')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-background/50 border-border/30 focus:border-secondary min-h-[120px] sm:min-h-[140px] rounded-xl" maxLength={1000} />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 sm:h-12 font-semibold rounded-full">
              <Send className="w-4 h-4 mr-2" />
              {t('sendMessage')}
            </Button>
          </form>
          </div>

          <div ref={infoRef} className={`flex flex-col justify-center gap-6 sm:gap-8 transition-all duration-700 ${infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {contactInfo.map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full border border-border/30 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-foreground text-sm sm:text-base">{c.label}</span>
              </div>
            ))}
            <a href="https://wa.me/255700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-2 sm:mt-4">
              <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground font-semibold px-6 rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('chatWhatsApp')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
