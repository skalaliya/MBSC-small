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
      en: "MBSC Australia | Engineering Consultancy, Technical Training & Digital Solutions",
      fr: "MBSC Australia | Conseil en Ingénierie, Formation Technique et Solutions Numériques"
    },
    description: {
      en: "World-class engineering consultancy delivering oil & gas services, technical training programs, digital solutions, and mining expertise. Serving clients across Australia, the Middle East, and Europe.",
      fr: "Conseil en ingénierie de classe mondiale fournissant des services pétroliers et gaziers, des programmes de formation technique, des solutions numériques et une expertise minière. Au service des clients en Australie, au Moyen-Orient et en Europe."
    },
    keywords: {
      en: "engineering consultancy Australia, oil gas consulting, technical training programs, digital engineering solutions, mining services Australia, MBSC Australia, global engineering services",
      fr: "conseil ingénierie Australie, conseil pétrole gaz, programmes formation technique, solutions ingénierie numérique, services miniers Australie, MBSC Australia"
    },
    canonical: "https://www.mbscaustralia.com.au/"
  },
  [Page.SERVICES]: {
    title: {
      en: "Engineering Services | Oil & Gas, Training, Digital Solutions, Mining | MBSC Australia",
      fr: "Services d'Ingénierie | Pétrole & Gaz, Formation, Solutions Numériques, Minier | MBSC Australia"
    },
    description: {
      en: "Comprehensive engineering consultancy: oil & gas engineering, global technical training, integrated digital solutions, mining & geology services, and safety compliance. Worldwide deployment available.",
      fr: "Conseil en ingénierie complet : ingénierie pétrolière et gazière, formation technique mondiale, solutions numériques intégrées, services miniers et géologiques, et conformité sécurité. Déploiement mondial disponible."
    },
    keywords: {
      en: "oil gas engineering consultancy, technical training programs, digital engineering solutions, mining geology services, safety compliance consulting, workforce development, drilling engineering",
      fr: "conseil ingénierie pétrolière gazière, programmes formation technique, solutions numériques ingénierie, services géologie minière, conseil conformité sécurité"
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
      en: "Global Technical Training Programs | NDT Certification, Safety Leadership | MBSC Australia",
      fr: "Programmes de Formation Technique Mondiale | Certification END, Leadership Sécurité | MBSC Australia"
    },
    description: {
      en: "World-class technical training delivered globally. ISO 9712 NDT certification, safety leadership programs, engineering skills development, and custom corporate training. On-site deployment across Australia, Middle East, and Europe.",
      fr: "Formation technique de classe mondiale dispensée à l'échelle internationale. Certification END ISO 9712, programmes de leadership en sécurité, développement des compétences en ingénierie et formation d'entreprise sur mesure. Déploiement sur site en Australie, au Moyen-Orient et en Europe."
    },
    keywords: {
      en: "global technical training, NDT certification ISO 9712, safety leadership training, engineering workforce development, corporate training programs, international training deployment",
      fr: "formation technique mondiale, certification END ISO 9712, formation leadership sécurité, développement effectifs ingénierie, programmes formation entreprise"
    },
    canonical: "https://www.mbscaustralia.com.au/training"
  },
  [Page.ABOUT]: {
    title: {
      en: "About MBSC Australia | Global Engineering Consultancy & Technical Training",
      fr: "À Propos de MBSC Australia | Conseil en Ingénierie Mondial et Formation Technique"
    },
    description: {
      en: "MBSC Australia is a specialist engineering consultancy serving oil & gas, mining, and infrastructure sectors. We deliver integrated engineering solutions, technical training, and digital innovation to clients across Australia, the Middle East, and Europe.",
      fr: "MBSC Australia est un cabinet de conseil spécialisé en ingénierie au service des secteurs pétrolier et gazier, minier et des infrastructures. Nous fournissons des solutions d'ingénierie intégrées, de la formation technique et de l'innovation numérique aux clients en Australie, au Moyen-Orient et en Europe."
    },
    keywords: {
      en: "MBSC engineering consultancy, global engineering services, oil gas consultancy, technical training provider, digital engineering solutions, ISO 9001 certified",
      fr: "conseil ingénierie MBSC, services ingénierie mondiaux, conseil pétrole gaz, fournisseur formation technique, solutions ingénierie numérique"
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
    ? "World-class engineering consultancy delivering oil & gas services, technical training programs, digital solutions, and mining expertise. Serving clients across Australia, the Middle East, and Europe."
    : "Conseil en ingénierie de classe mondiale fournissant des services pétroliers et gaziers, des programmes de formation technique, des solutions numériques et une expertise minière. Au service des clients en Australie, au Moyen-Orient et en Europe.",
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
    },
    {
      "@type": "Place",
      "name": "Middle East"
    },
    {
      "@type": "Place",
      "name": "Europe"
    }
  ],
  "serviceType": [
    "Oil & Gas Engineering Consultancy",
    "Global Technical Training Programs",
    "Integrated Engineering & Digital Solutions",
    "Mining & Geology Technical Services",
    "Safety, Compliance & Workforce Development",
    "Well Integrity Management",
    "NDT Certification Training"
  ],
  "description": currentLang === 'en'
    ? "MBSC Australia is a specialist engineering consultancy serving oil & gas, mining, and infrastructure sectors. We deliver integrated engineering solutions, technical training, and digital innovation to clients worldwide."
    : "MBSC Australia est un cabinet de conseil spécialisé en ingénierie au service des secteurs pétrolier et gazier, minier et des infrastructures. Nous fournissons des solutions d'ingénierie intégrées, de la formation technique et de l'innovation numérique aux clients du monde entier."
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
