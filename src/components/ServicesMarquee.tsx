import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Code, Palette, Monitor } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Web Development': <Globe className="w-5 h-5" />,
  'Software Development': <Code className="w-5 h-5" />,
  'Graphic Design': <Palette className="w-5 h-5" />,
  'IT Support': <Monitor className="w-5 h-5" />,
};

const ServicesMarquee = () => {
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('services').select('title').order('display_order');
      if (data?.length) setServices(data.map(s => s.title));
      else setServices(['Web Development', 'Software Development', 'Graphic Design', 'IT Support']);
    };
    fetch();
  }, []);

  if (!services.length) return null;

  const items = [...services, ...services, ...services, ...services];

  return (
    <div className="py-6 sm:py-8 overflow-hidden border-y border-border/20 bg-accent/30">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((service, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 mx-6 sm:mx-10">
            <span className="text-secondary">{iconMap[service] || <Code className="w-5 h-5" />}</span>
            <span className="text-sm sm:text-base font-semibold text-foreground/80 uppercase tracking-wider">
              {service}
            </span>
            <span className="text-secondary/40 text-lg">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesMarquee;
