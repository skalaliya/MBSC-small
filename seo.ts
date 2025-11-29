import { Page } from './types';

export interface PageSEO {
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  keywords: {
    en: string;
    fr: string;
  };
  canonical: string;
}

export const PAGE_SEO_META: Record<Page, PageSEO> = {
  [Page.HOME]: {
    title: {
      en: "MBSC Australia | Mining, NDT, Geotechnical & Oil & Gas Engineering Services",
      fr: "MBSC Australia | Services d'Ingénierie Minière, END, Géotechnique et Pétrole & Gaz"
    },
    description: {
      en: "Leading Australian engineering services provider specializing in mining support, NDT inspection, geotechnical investigations, oil & gas field services, concrete testing, and certified technical training across Australia.",
      fr: "Fournisseur leader de services d'ingénierie australiens spécialisé dans le support minier, l'inspection END, les investigations géotechniques, les services pétroliers et gaziers, les essais de béton et la formation technique certifiée en Australie."
    },
    keywords: {
      en: "mining engineering services Australia, geotechnical services Australia, NDT inspection Australia, oil and gas field services, concrete testing, MBSC Australia, asset integrity inspection, engineering consultancy Melbourne",
      fr: "services d'ingénierie minière Australie, services géotechniques Australie, inspection END Australie, services pétroliers et gaziers, essais béton, MBSC Australia, inspection intégrité actifs"
    },
    canonical: "https://www.mbscaustralia.com.au/"
  },
  [Page.SERVICES]: {
    title: {
      en: "Engineering Services | NDT, Geotechnical, Oil & Gas, Mining | MBSC Australia",
      fr: "Services d'Ingénierie | END, Géotechnique, Pétrole & Gaz, Minier | MBSC Australia"
    },
    description: {
      en: "Comprehensive engineering solutions: NDT concrete inspection, geotechnical investigations, oil & gas integrity services, mining compliance, engineering geophysics, and civil infrastructure testing across Australia.",
      fr: "Solutions d'ingénierie complètes : inspection END du béton, investigations géotechniques, services d'intégrité pétrolière et gazière, conformité minière, géophysique d'ingénierie et essais d'infrastructure civile en Australie."
    },
    keywords: {
      en: "NDT inspection precast concrete, geotechnical investigations, oil gas engineering services, mining services Australia, engineering geophysics survey, civil infrastructure testing, concrete NDT, asset integrity",
      fr: "inspection END béton préfabriqué, investigations géotechniques, services ingénierie pétrolière gazière, services miniers Australie, études géophysiques ingénierie, essais infrastructure civile"
    },
    canonical: "https://www.mbscaustralia.com.au/services"
  },
  [Page.PROJECTS]: {
    title: {
      en: "Featured Engineering Projects | Mining, Infrastructure & Oil & Gas | MBSC Australia",
      fr: "Projets d'Ingénierie Phares | Minier, Infrastructure & Pétrole & Gaz | MBSC Australia"
    },
    description: {
      en: "Explore MBSC Australia's portfolio of major engineering projects including Pilbara rail expansion, Santos Moomba cementing, Olympic Dam mining, Melbourne infrastructure, and offshore platform NDT inspections.",
      fr: "Découvrez le portfolio de projets d'ingénierie majeurs de MBSC Australia incluant l'expansion ferroviaire du Pilbara, la cimentation Santos Moomba, le projet minier Olympic Dam, l'infrastructure de Melbourne et les inspections END de plateformes offshore."
    },
    keywords: {
      en: "mining project support Australia, infrastructure engineering projects, oil gas field services, Santos Moomba cementing, Olympic Dam project, Pilbara engineering, Melbourne infrastructure",
      fr: "support projet minier Australie, projets ingénierie infrastructure, services terrain pétroliers gaziers, cimentation Santos Moomba, projet Olympic Dam, ingénierie Pilbara"
    },
    canonical: "https://www.mbscaustralia.com.au/projects"
  },
  [Page.TRAINING]: {
    title: {
      en: "Engineering Training & Certification | NDT, Geotechnical Safety | MBSC Australia",
      fr: "Formation et Certification en Ingénierie | END, Sécurité Géotechnique | MBSC Australia"
    },
    description: {
      en: "ISO 9712 certified NDT training, geotechnical safety leadership courses, advanced GPR interpretation, and corporate engineering standards training. Global deployment available for on-site technical education.",
      fr: "Formation END certifiée ISO 9712, cours de leadership en sécurité géotechnique, interprétation GPR avancée et formation aux normes d'ingénierie d'entreprise. Déploiement mondial disponible pour l'éducation technique sur site."
    },
    keywords: {
      en: "MBSC Australia training, NDT certification ISO 9712, geotechnical safety training, engineering training Australia, GPR interpretation course, corporate engineering standards, technical education",
      fr: "formation MBSC Australia, certification END ISO 9712, formation sécurité géotechnique, formation ingénierie Australie, cours interprétation GPR, normes ingénierie entreprise"
    },
    canonical: "https://www.mbscaustralia.com.au/training"
  },
  [Page.ABOUT]: {
    title: {
      en: "About MBSC Australia | Engineering Consultancy & Testing Services Provider",
      fr: "À Propos de MBSC Australia | Consultant en Ingénierie et Fournisseur de Services d'Essais"
    },
    description: {
      en: "MBSC Australia is a leading engineering consultancy providing specialized testing, inspection, and technical services to construction, mining, and oil & gas industries. ISO 9001 certified with NATA accredited laboratories.",
      fr: "MBSC Australia est un consultant en ingénierie de premier plan fournissant des services spécialisés d'essais, d'inspection et techniques aux industries de la construction, des mines et du pétrole et gaz. Certifié ISO 9001 avec laboratoires accrédités NATA."
    },
    keywords: {
      en: "MBSC engineering consultancy, Australian engineering services, ISO 9001 certified, NATA accredited, engineering testing services, technical consultancy Australia",
      fr: "consultant ingénierie MBSC, services ingénierie australiens, certifié ISO 9001, accrédité NATA, services essais ingénierie, consultant technique Australie"
    },
    canonical: "https://www.mbscaustralia.com.au/about"
  },
  [Page.RENTAL]: {
    title: {
      en: "Equipment Rental | NDT Testing Equipment & Inspection Tools | MBSC Australia",
      fr: "Location d'Équipement | Matériel d'Essai END & Outils d'Inspection | MBSC Australia"
    },
    description: {
      en: "Professional-grade testing equipment rental: GPR systems for concrete scanning, ultrasonic testers, cover meters, vibration monitors. All equipment calibrated to manufacturer standards. Short and long-term hire available.",
      fr: "Location d'équipement d'essai de qualité professionnelle : systèmes GPR pour balayage du béton, testeurs ultrasoniques, pachomètres, moniteurs de vibration. Tous les équipements calibrés selon les normes du fabricant. Location courte et longue durée disponible."
    },
    keywords: {
      en: "NDT equipment rental Australia, GPR rental concrete scanning, ultrasonic testing equipment, vibration monitoring equipment, cover meter rental, testing equipment hire Melbourne",
      fr: "location équipement END Australie, location GPR balayage béton, équipement essai ultrasonique, équipement surveillance vibration, location pachomètre"
    },
    canonical: "https://www.mbscaustralia.com.au/rental"
  },
  [Page.CONTACT]: {
    title: {
      en: "Contact MBSC Australia | Get Engineering Services Quote | Melbourne",
      fr: "Contacter MBSC Australia | Obtenir un Devis Services d'Ingénierie | Melbourne"
    },
    description: {
      en: "Contact MBSC Australia for engineering services quotes, technical consultancy, and project support. Melbourne head office serving projects nationwide. Phone: +61 414 955 631 | Email: admin@mbscaustralia.com.au",
      fr: "Contactez MBSC Australia pour des devis de services d'ingénierie, consultation technique et support de projet. Siège social de Melbourne desservant des projets dans tout le pays. Téléphone: +61 414 955 631 | Email: admin@mbscaustralia.com.au"
    },
    keywords: {
      en: "contact MBSC Australia, engineering services quote, Melbourne engineering company, project support Australia, technical consultancy contact, NDT services enquiry",
      fr: "contacter MBSC Australia, devis services ingénierie, entreprise ingénierie Melbourne, support projet Australie, contact consultant technique"
    },
    canonical: "https://www.mbscaustralia.com.au/contact"
  }
};

// Structured Data Schema
export const generateWebsiteSchema = (currentLang: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MBSC Australia",
  "alternateName": "MBSC Australia Pty Ltd",
  "url": "https://www.mbscaustralia.com.au",
  "description": currentLang === 'en' 
    ? "Leading Australian engineering services provider specializing in mining support, NDT inspection, geotechnical investigations, oil & gas field services, and technical training."
    : "Fournisseur leader de services d'ingénierie australiens spécialisé dans le support minier, l'inspection END, les investigations géotechniques, les services pétroliers et gaziers, et la formation technique.",
  "inLanguage": [currentLang === 'en' ? "en-AU" : "fr-AU"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.mbscaustralia.com.au/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = (currentLang: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MBSC Australia Pty Ltd",
  "image": "https://www.mbscaustralia.com.au/logo.jpg",
  "logo": "https://www.mbscaustralia.com.au/logo.jpg",
  "@id": "https://www.mbscaustralia.com.au",
  "url": "https://www.mbscaustralia.com.au",
  "telephone": "+61414955631",
  "email": "admin@mbscaustralia.com.au",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -37.8136,
    "longitude": 144.9631
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "07:00",
    "closes": "17:00"
  },
  "sameAs": [],
  "priceRange": "$$$$",
  "areaServed": [
    {
      "@type": "Country",
      "name": "Australia"
    }
  ],
  "serviceType": [
    "Mining Engineering Services",
    "Non-Destructive Testing (NDT)",
    "Geotechnical Investigations",
    "Oil & Gas Engineering",
    "Concrete Testing & Inspection",
    "Engineering Geophysics",
    "Technical Training & Certification",
    "Asset Integrity Management"
  ],
  "description": currentLang === 'en'
    ? "MBSC Australia provides specialized engineering and testing services for the construction, mining, and oil & gas industries. ISO 9001 certified with NATA accredited laboratories."
    : "MBSC Australia fournit des services spécialisés d'ingénierie et d'essais pour les industries de la construction, des mines et du pétrole et gaz. Certifié ISO 9001 avec laboratoires accrédités NATA."
});

export const generateServiceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@type": "Organization",
    "name": "MBSC Australia Pty Ltd",
    "url": "https://www.mbscaustralia.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "description": description
});
