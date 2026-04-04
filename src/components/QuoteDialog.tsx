import { useState } from 'react';
import { Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, checkRateLimit } from '@/lib/security';

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.service) errs.service = 'Required';
    if (!form.message.trim()) errs.message = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!checkRateLimit('quote-form', 3, 5 * 60 * 1000)) {
      toast({ title: 'Please wait', description: 'Too many submissions. Try again in a few minutes.', variant: 'destructive' });
      return;
    }
    const sanitized = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      service: form.service,
      message: sanitizeInput(form.message),
    };
    toast({ title: 'Quote Request Sent!', description: 'We will get back to you within 24 hours.' });
    setForm({ name: '', email: '', service: '', message: '' });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{t('quoteFormTitle')}</DialogTitle>
          <DialogDescription>{t('quoteFormDesc')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input placeholder={t('yourName')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border/50" maxLength={100} />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input type="email" placeholder={t('yourEmail')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50 border-border/50" maxLength={255} />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger className="bg-background/50 border-border/50">
                <SelectValue placeholder={t('selectService')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">{t('webDev')}</SelectItem>
                <SelectItem value="software">{t('softwareDev')}</SelectItem>
                <SelectItem value="design">{t('graphicDesign')}</SelectItem>
                <SelectItem value="it">{t('itSupport')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.service && <p className="text-destructive text-xs mt-1">{errors.service}</p>}
          </div>
          <div>
            <Textarea placeholder={t('yourMessage')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-background/50 border-border/50 min-h-[100px]" maxLength={1000} />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
            <Send className="w-4 h-4 mr-2" />
            {t('submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
