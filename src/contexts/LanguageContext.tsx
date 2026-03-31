import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface Translations {
  [key: string]: { en: string; sw: string };
}

const translations: Translations = {
  // Navbar
  home: { en: 'Home', sw: 'Nyumbani' },
  services: { en: 'Services', sw: 'Huduma' },
  portfolio: { en: 'Portfolio', sw: 'Kazi Zetu' },
  contact: { en: 'Contact', sw: 'Wasiliana' },
  requestQuote: { en: 'Request a Quote', sw: 'Omba Bei' },

  // Hero
  heroTitle: { en: 'Innovating Digital Solutions for the Future', sw: 'Tunaunda Suluhisho za Kidijitali za Kisasa' },
  heroSubtitle: { en: 'Affordable and reliable tech services in Tanzania', sw: 'Huduma za teknolojia za bei nafuu na za kuaminika Tanzania' },
  getStarted: { en: 'Get Started', sw: 'Anza Sasa' },

  // About
  aboutTitle: { en: 'About Us', sw: 'Kuhusu Sisi' },
  aboutDesc: {
    en: 'CORTYLIX TECHNOLOGIES is a leading digital solutions company based in Tanzania. We specialize in delivering innovative, affordable, and high-quality technology services that empower businesses to thrive in the digital age.',
    sw: 'CORTYLIX TECHNOLOGIES ni kampuni inayoongoza katika suluhisho za kidijitali iliyoko Tanzania. Tunabobea katika kutoa huduma za teknolojia za kisasa, za bei nafuu na za ubora wa juu zinazosaidia biashara kukua katika enzi ya kidijitali.',
  },
  mission: { en: 'Our Mission', sw: 'Dhamira Yetu' },
  missionDesc: {
    en: 'To deliver high-quality digital solutions that help businesses grow and succeed in the modern world.',
    sw: 'Kutoa suluhisho za kidijitali za ubora wa juu zinazosaidia biashara kukua na kufanikiwa katika ulimwengu wa kisasa.',
  },
  vision: { en: 'Our Vision', sw: 'Maono Yetu' },
  visionDesc: {
    en: 'To become a leading technology company in Africa, driving innovation and digital transformation across the continent.',
    sw: 'Kuwa kampuni ya teknolojia inayoongoza Afrika, ikiendeleza uvumbuzi na mabadiliko ya kidijitali barani kote.',
  },

  // Services
  servicesTitle: { en: 'Our Services', sw: 'Huduma Zetu' },
  servicesSubtitle: { en: 'We offer a wide range of digital solutions tailored to your business needs', sw: 'Tunatoa huduma mbalimbali za kidijitali kulingana na mahitaji ya biashara yako' },
  webDev: { en: 'Web Development', sw: 'Utengenezaji wa Tovuti' },
  webDevDesc: { en: 'Custom business websites and web applications built with modern technologies for optimal performance.', sw: 'Tovuti za biashara na programu za wavuti zinazojengwa kwa teknolojia za kisasa kwa utendaji bora.' },
  softwareDev: { en: 'Software Development', sw: 'Utengenezaji wa Programu' },
  softwareDevDesc: { en: 'Custom software systems designed to streamline your business operations and boost productivity.', sw: 'Mifumo ya programu iliyoundwa kurahisisha shughuli za biashara yako na kuongeza tija.' },
  graphicDesign: { en: 'Graphic Design', sw: 'Usanifu wa Picha' },
  graphicDesignDesc: { en: 'Professional branding, logos, and social media designs that make your brand stand out.', sw: 'Nembo, alama za kibiashara na michoro ya mitandao ya kijamii inayofanya chapa yako ionekane.' },
  itSupport: { en: 'IT Support', sw: 'Msaada wa IT' },
  itSupportDesc: { en: 'Reliable troubleshooting, installations, networking, and ongoing maintenance for your systems.', sw: 'Utatuzi wa matatizo, usanidi, mitandao na matengenezo ya mifumo yako kwa uaminifu.' },

  // Why Choose Us
  whyTitle: { en: 'Why Choose Us', sw: 'Kwa Nini Ututeue' },
  fastDelivery: { en: 'Fast Delivery', sw: 'Utoaji wa Haraka' },
  fastDeliveryDesc: { en: 'We deliver projects on time without compromising on quality.', sw: 'Tunawasilisha miradi kwa wakati bila kupunguza ubora.' },
  affordable: { en: 'Affordable Pricing', sw: 'Bei Nafuu' },
  affordableDesc: { en: 'Get top-notch digital solutions at prices that fit your budget.', sw: 'Pata suluhisho bora za kidijitali kwa bei zinazofaa bajeti yako.' },
  localSupport: { en: 'Local Support', sw: 'Msaada wa Ndani' },
  localSupportDesc: { en: 'Based in Tanzania, we provide personalized support when you need it.', sw: 'Tukiwa Tanzania, tunatoa msaada wa kibinafsi unapohitaji.' },
  reliable: { en: 'Reliable & Secure', sw: 'Kuaminika na Salama' },
  reliableDesc: { en: 'Our solutions are built with security and reliability at the core.', sw: 'Suluhisho zetu zimejengwa kwa usalama na uaminifu.' },

  // Portfolio
  portfolioTitle: { en: 'Our Portfolio', sw: 'Kazi Zetu' },
  portfolioSubtitle: { en: 'Check out some of our recent projects', sw: 'Angalia baadhi ya miradi yetu ya hivi karibuni' },

  // Testimonials
  testimonialsTitle: { en: 'What Our Clients Say', sw: 'Wateja Wetu Wanasema Nini' },

  // Contact
  contactTitle: { en: 'Get In Touch', sw: 'Wasiliana Nasi' },
  contactSubtitle: { en: "Have a project in mind? Let's discuss how we can help.", sw: 'Una mradi akilini? Hebu tujadili jinsi tunavyoweza kusaidia.' },
  yourName: { en: 'Your Name', sw: 'Jina Lako' },
  yourEmail: { en: 'Your Email', sw: 'Barua Pepe Yako' },
  yourMessage: { en: 'Your Message', sw: 'Ujumbe Wako' },
  sendMessage: { en: 'Send Message', sw: 'Tuma Ujumbe' },
  chatWhatsApp: { en: 'Chat on WhatsApp', sw: 'Piga Gumzo WhatsApp' },

  // CTA
  ctaTitle: { en: 'Need a website or system? Let\'s work together!', sw: 'Unahitaji tovuti au mfumo? Tufanye kazi pamoja!' },
  ctaSubtitle: { en: 'Transform your business with our expert digital solutions.', sw: 'Badilisha biashara yako na suluhisho zetu za kidijitali.' },

  // Footer
  quickLinks: { en: 'Quick Links', sw: 'Viungo vya Haraka' },
  ourServices: { en: 'Our Services', sw: 'Huduma Zetu' },
  contactInfo: { en: 'Contact Info', sw: 'Mawasiliano' },

  // Quote form
  quoteFormTitle: { en: 'Request a Quote', sw: 'Omba Bei' },
  quoteFormDesc: { en: 'Tell us about your project and we\'ll get back to you within 24 hours.', sw: 'Tuambie kuhusu mradi wako na tutakujibu ndani ya masaa 24.' },
  projectType: { en: 'Project Type', sw: 'Aina ya Mradi' },
  selectService: { en: 'Select a service', sw: 'Chagua huduma' },
  submit: { en: 'Submit Request', sw: 'Wasilisha Ombi' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
