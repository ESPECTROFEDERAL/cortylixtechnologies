import { useEffect, useRef } from 'react';

const partners = [
  'TechVentures TZ',
  'Azam Media',
  'Vodacom Tanzania',
  'CRDB Bank',
  'Tigo Tanzania',
  'NMB Bank',
  'Bakhresa Group',
  'Sumatra',
];

const TrustedByMarquee = () => {
  return (
    <section className="py-10 sm:py-14 border-y border-border/10 bg-accent/20 overflow-hidden">
      <div className="container mx-auto mb-6 sm:mb-8 text-center">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">
          Trusted By Leading Companies
        </span>
      </div>
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-accent/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-accent/80 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-8 sm:mx-14 shrink-0"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-border/10 bg-background/5 backdrop-blur-sm">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm sm:text-base">
                  {name.charAt(0)}
                </div>
                <span className="text-sm sm:text-base font-medium text-foreground/70 tracking-wide">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedByMarquee;
