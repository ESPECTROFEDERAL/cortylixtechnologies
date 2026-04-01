import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface ServiceBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceIcon: React.ReactNode;
}

const ServiceBookingDialog = ({ open, onOpenChange, serviceName, serviceIcon }: ServiceBookingDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone.trim()) errs.phone = 'Required';
    if (step === 2) {
      if (!form.date) errs.date = 'Required';
      if (!form.details.trim()) errs.details = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep(3);
    setTimeout(() => {
      toast({ title: 'Booking Confirmed!', description: `Your ${serviceName} consultation has been scheduled.` });
    }, 500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setForm({ name: '', email: '', phone: '', date: '', time: '', details: '' });
      setErrors({});
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass border-border/50 sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              {serviceIcon}
            </div>
            <div>
              <DialogTitle className="font-display text-lg">Book {serviceName}</DialogTitle>
              <DialogDescription className="text-xs">Step {Math.min(step, 2)} of 2</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Progress bar */}
        <div className="flex gap-2 mb-2">
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-secondary' : 'bg-muted'}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-secondary' : 'bg-muted'}`} />
        </div>

        {step === 3 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              We'll contact you at <span className="text-foreground">{form.email}</span> to confirm the details.
            </p>
            <Button onClick={handleClose} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border/50 pl-10 h-12" maxLength={100} />
                  </div>
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50 border-border/50 pl-10 h-12" maxLength={255} />
                  </div>
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background/50 border-border/50 pl-10 h-12" maxLength={20} />
                  </div>
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold">
                  Next Step
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-background/50 border-border/50 pl-10 h-12" />
                    </div>
                    {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="bg-background/50 border-border/50 pl-10 h-12" />
                    </div>
                  </div>
                </div>
                <div>
                  <Textarea placeholder="Describe your project requirements..." value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="bg-background/50 border-border/50 min-h-[120px]" maxLength={1000} />
                  {errors.details && <p className="text-destructive text-xs mt-1">{errors.details}</p>}
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-border/50">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 font-semibold">
                    <Send className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceBookingDialog;
