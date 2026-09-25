import type { UI } from './en';

export const fr: UI = {
  meta: {
    siteName: 'MBSC Australia',
    defaultTitle:
      'MBSC Australia | Conseil en ingénierie, formation technique et solutions numériques',
    defaultDescription:
      'Cabinet de conseil en ingénierie basé à Melbourne pour le pétrole et le gaz, les mines et les infrastructures. Conseil, inspection, formation technique et solutions numériques en Australie, au Moyen-Orient et en Europe.',
    pages: {
      home: {
        title:
          'MBSC Australia | Conseil en ingénierie pour le pétrole et le gaz, les mines et les infrastructures',
        description:
          'Conseil en ingénierie, formation technique et solutions numériques pour les opérateurs du pétrole et du gaz, des mines et des infrastructures en Australie, au Moyen-Orient et en Europe.',
      },
      services: {
        title: 'Services | MBSC Australia',
        description:
          'Ingénierie pétrolière et gazière, formation technique, solutions numériques, services miniers et géologiques, sécurité et conformité.',
      },
      projects: {
        title: 'Projets et études de cas | MBSC Australia',
        description:
          'Sélection de projets pétroliers et gaziers, miniers et d’infrastructures civiles réalisés par MBSC Australia en Australie.',
      },
      training: {
        title: 'Calendrier de formation {year} | MBSC Australia',
        description:
          'Formations techniques programmées en pétrole et gaz, géosciences, mines et ingénierie numérique. En présentiel, à distance ou en format hybride.',
      },
      rental: {
        title: 'Location d’équipement | MBSC Australia',
        description:
          'Équipements d’essais non destructifs et de surveillance étalonnés à louer : GPR, auscultation sonique, pachomètres et moniteurs de vibrations.',
      },
      about: {
        title: 'À propos | MBSC Australia',
        description:
          'Qui nous sommes, notre méthode et nos zones d’intervention. Un cabinet d’ingénierie de Melbourne au service de l’énergie, des mines et des infrastructures.',
      },
      contact: {
        title: 'Contact | MBSC Australia',
        description:
          'Parlez à un ingénieur d’un projet, d’un programme de formation ou d’une location d’équipement. Réponse sous un jour ouvré.',
      },
      privacy: {
        title: 'Politique de confidentialité | MBSC Australia',
        description:
          'Comment MBSC Australia collecte, utilise et protège les informations personnelles.',
      },
      terms: {
        title: 'Conditions d’utilisation | MBSC Australia',
        description: 'Conditions applicables à l’utilisation du site de MBSC Australia.',
      },
      notFound: {
        title: 'Page introuvable | MBSC Australia',
        description: 'La page demandée est introuvable.',
      },
    },
  },
  a11y: {
    skipToContent: 'Aller au contenu',
    mainNav: 'Navigation principale',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    languageSwitcher: 'Choisir la langue',
    breadcrumb: 'Fil d’Ariane',
    footerNav: 'Navigation de pied de page',
    homeLink: 'Accueil MBSC Australia',
    externalLink: '(s’ouvre dans un nouvel onglet)',
  },
  nav: {
    services: 'Services',
    projects: 'Projets',
    training: 'Formation',
    rental: 'Équipement',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Parler à un ingénieur',
    home: 'Accueil',
  },
  lang: { en: 'English', fr: 'Français', enShort: 'EN', frShort: 'FR' },
  common: {
    learnMore: 'En savoir plus',
    viewAll: 'Tout voir',
    readCaseStudy: 'Lire l’étude de cas',
    enquire: 'Se renseigner',
    requestQuote: 'Demander un devis',
    call: 'Appeler',
    email: 'E-mail',
    hours: 'Lun–ven, 7 h – 17 h (heure de l’Est australien)',
    back: 'Retour',
    location: 'Lieu',
    sector: 'Secteur',
    year: 'Année',
    client: 'Client',
    services: 'Services',
    confidentialClient: 'Opérateur confidentiel',
    regions: { au: 'Australie', me: 'Moyen-Orient', eu: 'Europe' },
    regionsLong: {
      au: 'Siège à Melbourne. Nos équipes interviennent dans tout le pays, du bassin de Cooper au Pilbara.',
      me: 'Conseil et formation sur les sites clients, en partenariat avec des opérateurs régionaux.',
      eu: 'Conseil spécialisé et formations à distance pour les clients européens de l’énergie et des ressources.',
    },
  },
  hero: {
    eyebrow: 'Siège à Melbourne · Australie · Moyen-Orient · Europe',
    title: 'L’intégrité en ingénierie pour l’énergie, les mines et les infrastructures.',
    lead: 'Conseil, inspection, formation technique et solutions numériques pour les opérateurs qui n’ont pas droit à l’erreur.',
    primary: 'Parler à un ingénieur',
    secondary: 'Voir le calendrier de formation',
    imageAlt: 'Plateforme gazière en mer au crépuscule',
  },
  stats: {
    labels: {
      projects: 'Projets livrés',
      trainingHours: 'Heures de formation dispensées',
      metresDrilled: 'Mètres forés',
      assets: 'Valeur d’actifs accompagnés',
    },
    footnote: 'Chiffres cumulés au {date}.',
  },
  home: {
    trust: { title: 'Ils nous font confiance', mining: 'Mines', oilGas: 'Énergie' },
    services: {
      eyebrow: 'Nos activités',
      title: 'Cinq disciplines, une seule équipe responsable',
      lead: 'De l’intégrité des puits aux compétences des équipes, chaque mission est pilotée par un ingénieur senior jusqu’à sa clôture.',
    },
    process: {
      eyebrow: 'Notre méthode',
      title: 'Évaluer. Réaliser. Vérifier.',
      steps: [
        {
          title: 'Évaluer',
          body: 'Nous cadrons le problème sur site ou à partir de vos données, convenons des normes applicables et fixons un livrable clair.',
        },
        {
          title: 'Réaliser',
          body: 'Ingénieurs, inspecteurs ou formateurs interviennent avec du matériel étalonné et une méthode documentée.',
        },
        {
          title: 'Vérifier',
          body: 'Chaque mission se termine par un rapport, un jeu de données ou un certificat vérifiable et exploitable.',
        },
      ],
    },
    projects: { eyebrow: 'Références', title: 'Études de cas choisies', all: 'Tous les projets' },
    training: {
      eyebrow: 'Formations à venir',
      title: 'Prochaines sessions programmées',
      all: 'Calendrier complet',
      none: 'De nouvelles sessions sont en cours de programmation. Contactez-nous pour les dates.',
    },
    testimonials: { eyebrow: 'Retours clients', title: 'Ce qu’en disent les opérateurs' },
    regions: { eyebrow: 'Zones d’intervention', title: 'Présents sur trois régions' },
    cta: {
      title: 'Prêt à parler de votre prochain projet ?',
      lead: 'Expliquez-nous votre besoin. Un ingénieur senior vous répondra sous un jour ouvré.',
      primary: 'Parler à un ingénieur',
      secondary: 'Appeler le {phone}',
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'Services d’ingénierie',
    lead: 'Conseil, formation et solutions numériques pour le pétrole et le gaz, les mines et les infrastructures.',
    capabilities: 'Compétences',
    whyTitle: 'Pourquoi les opérateurs choisissent MBSC',
    why: [
      {
        title: 'Pilotage senior',
        body: 'Un ingénieur senior est responsable de chaque mission, du cadrage à la clôture.',
      },
      {
        title: 'Les normes d’abord',
        body: 'Chaque intervention est planifiée selon les normes australiennes et internationales attendues par vos auditeurs.',
      },
      {
        title: 'Terrain et salle',
        body: 'Les personnes qui inspectent vos actifs forment aussi les équipes qui les exploitent.',
      },
    ],
    detail: {
      overview: 'Présentation',
      process: 'Déroulement de la mission',
      deliverables: 'Ce que vous recevez',
      relatedProjects: 'Projets associés',
      relatedCourses: 'Formations associées',
      otherServices: 'Autres services',
      ctaTitle: 'Parlons de vos besoins en {service}',
      ctaPrimary: 'Demander une proposition',
    },
    faqTitle: 'Questions fréquentes',
    ctaTitle: 'Vous ne savez pas quel service choisir ?',
    ctaLead: 'Décrivez le problème et nous vous proposerons un périmètre.',
  },
  projects: {
    eyebrow: 'Références',
    title: 'Projets et études de cas',
    lead: 'Travaux pétroliers et gaziers, miniers et d’infrastructures civiles réalisés en Australie.',
    filterLabel: 'Filtrer par secteur',
    all: 'Tous',
    sectors: {
      oilGas: 'Pétrole et gaz',
      mining: 'Mines',
      civil: 'Infrastructures civiles',
      marine: 'Maritime',
    },
    detail: {
      challenge: 'L’enjeu',
      approach: 'Notre approche',
      outcome: 'Résultat',
      keyFacts: 'Informations clés',
      more: 'Autres projets : {sector}',
    },
    empty: 'Aucun projet dans ce secteur pour le moment.',
    ctaTitle: 'Un projet similaire ?',
    ctaLead:
      'Nous pouvons mobiliser ingénieurs et équipements partout en Australie dans des délais courts.',
  },
  training: {
    eyebrow: 'Formation technique',
    title: 'Programmes de formation',
    lead: 'Programmes planifiés et sur mesure en pétrole et gaz, géosciences, mines et ingénierie numérique, en présentiel, à distance ou les deux.',
    valueProps: [
      {
        title: 'Au plus près de vos sites',
        body: 'Ingénieurs seniors et formateurs certifiés se déplacent sur vos sites, ou animent les sessions depuis Melbourne et Perth.',
      },
      {
        title: 'Certification reconnue',
        body: 'Les cours s’appuient sur les normes australiennes et sur l’ISO 9712 lorsque la certification est requise.',
      },
      {
        title: 'Formats flexibles',
        body: 'Ateliers sur site, classes virtuelles, programmes hybrides ou formations d’entreprise sur mesure.',
      },
    ],
    upcoming: 'Prochaines sessions',
    calendar: {
      title: 'Calendrier de formation {year}',
      lead: 'Les dates sont confirmées lors de votre demande. Des sessions de groupe ou sur site peuvent être organisées hors calendrier.',
      yearNav: 'Année du calendrier',
      filters: 'Filtrer les sessions',
      category: 'Catégorie',
      delivery: 'Format',
      location: 'Lieu',
      any: 'Tous',
      reset: 'Réinitialiser',
      results: '{count} sessions affichées',
      resultsOne: '1 session affichée',
      noMatches: 'Aucune session ne correspond à ces filtres.',
      noSessions: 'Aucune session programmée ce mois-ci.',
      onRequest: 'Dates sur demande',
      past: 'Terminée',
      showPast: 'Afficher les {count} mois précédents',
      showPastOne: 'Afficher le mois précédent',
      hidePast: 'Masquer les mois précédents',
      days: '{count} jours',
      dayOne: '1 jour',
      custom: 'Sur mesure',
      enquire: 'Se renseigner',
      enquireLabel: 'Se renseigner sur {course}',
      notice:
        'Une session peut être reportée si le nombre minimum de participants n’est pas atteint. Chaque inscription est confirmée par écrit.',
      categories: {
        oilGas: 'Pétrole et gaz',
        geoscience: 'Géosciences',
        geology: 'Géologie',
        mining: 'Mines',
        crossDiscipline: 'Pluridisciplinaire',
        digitalAI: 'Numérique et IA',
      },
      deliveryModes: { onsite: 'Sur site', virtual: 'À distance', hybrid: 'Hybride' },
      locations: {
        melbourne: 'Melbourne',
        perth: 'Perth',
        global: 'International',
        clientSite: 'Site client',
      },
      certificates: {
        technicalCertification: 'Certification technique',
        professionalProgram: 'Programme professionnel',
        bespokeTraining: 'Formation sur mesure',
        corporateWorkshop: 'Atelier d’entreprise',
        iso9712Certification: 'Certification ISO 9712',
        associateProgram: 'Programme associé',
      },
    },
    catalogue: {
      title: 'Catalogue des formations',
      lead: 'Tous nos programmes, classés par discipline.',
      sessions: '{count} sessions programmées en {year}',
    },
    faqTitle: 'Questions sur la formation',
    ctaTitle: 'Développez les compétences de votre équipe',
    ctaLead:
      'Renseignez-vous sur les tarifs de groupe, la formation sur site et les programmes sur mesure.',
    ctaPrimary: 'Demander des informations',
  },
  rental: {
    eyebrow: 'Location d’équipement',
    title: 'Équipements d’essai à louer',
    lead: 'Équipements d’essais non destructifs et de surveillance étalonnés, en location courte ou longue durée, avec assistance technique.',
    specs: { model: 'Modèle', measures: 'Mesures', use: 'Usage type', supplied: 'Fourni avec' },
    supplied: 'Certificat d’étalonnage, mallette de transport et assistance téléphonique',
    items: {
      gpr: {
        name: 'Géoradar (GPR)',
        model: 'Système GPR haute fréquence',
        measures: 'Armatures, gaines et vides dans le béton',
        use: 'Détection avant carottage, découpe ou ancrage ; cartographie du sous-sol',
      },
      ultrasonic: {
        name: 'Appareil d’auscultation sonique',
        model: 'Proceq Pundit Lab+',
        measures: 'Vitesse de propagation des ultrasons dans le béton et d’autres matériaux',
        use: 'Homogénéité du béton, profondeur de fissures et estimation de résistance',
      },
      coverMeter: {
        name: 'Pachomètre',
        model: 'Proceq Profometer 6',
        measures: 'Position des armatures, enrobage et diamètre des barres',
        use: 'Diagnostics de durabilité et contrôles avant perçage',
      },
      vibration: {
        name: 'Moniteur de vibrations',
        model: 'Système de géophones triaxiaux',
        measures: 'Vitesse particulaire de crête sur trois axes',
        use: 'Conformité vibratoire des chantiers et tirs de mines',
      },
    },
    calibration:
      'Tous les équipements sont étalonnés selon les spécifications du fabricant et livrés avec un certificat d’étalonnage en cours de validité.',
    termsTitle: 'Questions sur la location',
    ctaTitle: 'Besoin d’un équipement sur site ?',
    ctaLead:
      'Indiquez-nous l’intervention, le lieu et les dates. Nous confirmons disponibilité et prix dans un devis écrit.',
  },
  about: {
    eyebrow: 'À propos',
    title: 'À propos de MBSC Australia',
    lead: 'Un cabinet d’ingénierie de Melbourne fondé sur l’expérience de terrain, la rigueur technique et des relations clients durables.',
    story: {
      title: 'Qui nous sommes',
      body: [
        'MBSC Australia est un cabinet de conseil spécialisé en ingénierie au service des secteurs du pétrole et du gaz, des mines et des infrastructures. Nos ingénieurs seniors, géoscientifiques et spécialistes techniques travaillent aux côtés d’opérateurs, d’entrepreneurs et d’organismes publics.',
        'Nous associons inspection et conseil sur le terrain, formation technique et outils numériques, pour que l’expérience acquise sur un projet profite au suivant.',
      ],
      imageAlt: 'Ingénieur MBSC réalisant des essais en laboratoire',
    },
    mission: {
      title: 'Notre mission',
      body: 'Réaliser une ingénierie qui maintient les infrastructures et les opérations critiques sûres, efficaces et durables.',
    },
    values: {
      title: 'Nos engagements',
      items: [
        {
          title: 'Rigueur technique',
          body: 'Les méthodes sont documentées, le matériel étalonné et les résultats traçables à une norme.',
        },
        {
          title: 'La sécurité d’abord',
          body: 'Aucune contrainte de délai ne justifie un raccourci dangereux. Nos équipes arrêtent le travail si les conditions changent.',
        },
        {
          title: 'Partenariat',
          body: 'Nous restons sur un problème jusqu’à sa résolution et expliquons nos conclusions simplement.',
        },
      ],
    },
    team: { eyebrow: 'Équipe', title: 'Direction' },
    accreditations: {
      eyebrow: 'Assurance qualité',
      title: 'Accréditations et adhésions',
      onRequest: 'Les certificats sont disponibles sur demande.',
    },
    regions: { eyebrow: 'Zones d’intervention', title: 'Régions desservies' },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Parler à un ingénieur',
    lead: 'Parlez-nous de votre projet, de votre besoin de formation ou de location. Nous répondons sous un jour ouvré.',
    office: {
      title: 'Siège social',
      addressFallback: 'Melbourne, Victoria, Australie',
      phone: 'Téléphone',
      email: 'E-mail',
      hours: 'Horaires',
    },
    map: {
      title: 'Plan',
      load: 'Afficher le plan',
      notice: 'L’affichage du plan se connecte à Google Maps, qui peut déposer des cookies.',
      iframeTitle: 'Plan d’accès au siège de MBSC Australia',
    },
    form: {
      title: 'Envoyer une demande',
      required: 'Obligatoire',
      optional: 'Facultatif',
      firstName: 'Prénom',
      lastName: 'Nom',
      company: 'Entreprise',
      email: 'E-mail professionnel',
      phone: 'Téléphone',
      topic: 'Sujet',
      message: 'Comment pouvons-nous vous aider ?',
      messageHint: 'Quelques lignes sur le site, l’actif ou la formation, et vos délais.',
      regarding: 'Concernant',
      consent:
        'J’accepte que MBSC Australia utilise ces informations pour répondre à ma demande, conformément à la {privacy}.',
      privacyLink: 'politique de confidentialité',
      honeypot: 'Laissez ce champ vide',
      submit: 'Envoyer la demande',
      sending: 'Envoi…',
      topics: {
        general: 'Demande générale',
        oilGas: 'Conseil pétrole et gaz',
        training: 'Programmes de formation',
        digital: 'Solutions numériques',
        mining: 'Mines et géologie',
        safety: 'Sécurité et conformité',
        rental: 'Location d’équipement',
      },
      errors: {
        required: 'Ce champ est obligatoire.',
        email: 'Saisissez une adresse e-mail valide.',
        phone: 'Saisissez un numéro de téléphone valide.',
        tooShort: 'Merci d’ajouter quelques détails (au moins {min} caractères).',
        tooLong: 'Merci de rester sous {max} caractères.',
        consent: 'Merci de donner votre accord pour que nous puissions vous répondre.',
        summary: 'Merci de vérifier les champs signalés.',
        send: 'Votre demande n’a pas pu être envoyée. Réessayez ou écrivez-nous directement à {email}.',
        unavailable:
          'Les demandes en ligne sont temporairement indisponibles. Écrivez à {email} ou appelez le {phone}.',
        tooFast: 'C’était rapide. Patientez un instant et réessayez.',
      },
      success: {
        title: 'Demande reçue',
        body: 'Merci. Un membre de notre équipe d’ingénierie vous répondra sous un jour ouvré.',
        again: 'Envoyer une autre demande',
      },
    },
    faqTitle: 'Avant de nous contacter',
  },
  cta: {
    title: 'Prêt à parler de votre prochain projet ?',
    lead: 'Un ingénieur senior vous répondra sous un jour ouvré.',
    primary: 'Parler à un ingénieur',
  },
  footer: {
    tagline:
      'Conseil en ingénierie, formation technique et solutions numériques pour le pétrole et le gaz, les mines et les infrastructures.',
    services: 'Services',
    company: 'Entreprise',
    contact: 'Contact',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    sitemap: 'Plan du site',
    rights: 'Tous droits réservés.',
    abn: 'ABN {abn}',
    linkedin: 'MBSC Australia sur LinkedIn',
    credits: 'Crédits photo',
  },
  notFound: {
    eyebrow: 'Erreur 404',
    title: 'Cette page est introuvable',
    lead: 'La page a peut-être été déplacée. Ces liens vous remettront sur la bonne voie.',
    home: 'Retour à l’accueil',
  },
  credits: {
    intro: 'Photographies utilisées sous licence Unsplash. Merci aux photographes.',
    own: 'Les photos de projets de Moomba, du North West Shelf, du Metro Tunnel, du pipeline de la banlieue ouest et du laboratoire appartiennent à MBSC Australia.',
  },
  testimonials: { sample: 'Témoignage d’exemple pour la mise en page' },
  faq: {
    services: [
      {
        q: 'Où pouvez-vous envoyer vos ingénieurs ?',
        a: 'Partout en Australie, avec une activité régulière au Victoria, en Australie-Méridionale et en Australie-Occidentale. Nous accompagnons aussi des clients au Moyen-Orient et en Europe.',
      },
      {
        q: 'Sous quel délai pouvez-vous intervenir ?',
        a: 'Cela dépend du périmètre et des conditions d’accès au site. Indiquez vos dates lors de votre demande et nous confirmerons nos disponibilités par écrit.',
      },
      {
        q: 'Selon quelles normes travaillez-vous ?',
        a: 'Selon les normes australiennes et les codes internationaux applicables à votre actif, que nous validons avec vous avant de commencer.',
      },
      {
        q: 'Pouvez-vous travailler sous notre système de sécurité ?',
        a: 'Oui. Nos équipes suivent vos accueils sécurité et travaillent selon vos permis de travail et exigences HSE.',
      },
    ],
    training: [
      {
        q: 'Une formation peut-elle avoir lieu sur notre site ?',
        a: 'Oui. La plupart des programmes peuvent être dispensés sur site pour un groupe. Indiquez-nous l’effectif et vos dates.',
      },
      {
        q: 'Les participants reçoivent-ils un certificat ?',
        a: 'Chaque session précise son type de certificat. Les cours ISO 9712 mènent à la certification sous réserve de réussite à l’examen et d’expérience suffisante.',
      },
      {
        q: 'Les sessions à distance sont-elles en direct ?',
        a: 'Oui. Les sessions à distance et hybrides sont animées en direct par un formateur.',
      },
      {
        q: 'Les cours sont-ils proposés en français ?',
        a: 'Certains programmes peuvent être dispensés en français. Précisez-le dans votre demande.',
      },
    ],
    rental: [
      {
        q: 'Combien coûte la location ?',
        a: 'Le tarif dépend de l’équipement, de la durée et du lieu. Nous le confirmons dans un devis écrit.',
      },
      {
        q: 'Pouvez-vous livrer sur site ?',
        a: 'Oui. La livraison et la reprise peuvent être organisées et figurent dans votre devis.',
      },
      {
        q: 'Un opérateur peut-il accompagner l’équipement ?',
        a: 'Oui. Un technicien peut utiliser l’équipement et vous remettre les résultats si vous le souhaitez.',
      },
    ],
    contact: [
      {
        q: 'Sous quel délai répondez-vous ?',
        a: 'Sous un jour ouvré, du lundi au vendredi, heure de l’Est australien.',
      },
      {
        q: 'Signez-vous des accords de confidentialité ?',
        a: 'Oui. Nous travaillons régulièrement sous accord de confidentialité et pouvons signer le vôtre avant d’entrer dans les détails.',
      },
      {
        q: 'Puis-je demander un devis sans plans complets ?',
        a: 'Oui. Envoyez ce dont vous disposez et nous vous dirons ce qu’il faut de plus pour un prix ferme.',
      },
    ],
  },
  legal: {
    updated: 'Dernière mise à jour : {date}',
    reviewNotice: 'Cette politique est un projet en attente de relecture juridique.',
    privacy: {
      title: 'Politique de confidentialité',
      sections: [
        {
          heading: 'Qui nous sommes',
          body: [
            'MBSC Australia Pty Ltd (« nous ») est soumise aux Australian Privacy Principles du Privacy Act 1988 (Cth). Cette politique explique comment nous traitons les informations personnelles recueillies via ce site.',
          ],
        },
        {
          heading: 'Ce que nous collectons',
          body: [
            'Lorsque vous envoyez une demande, nous collectons votre nom, votre adresse e-mail et, le cas échéant, le nom de votre entreprise, votre téléphone et votre message.',
            'Nous utilisons Vercel Web Analytics et Speed Insights pour mesurer les visites et les performances. Ces outils n’utilisent pas de cookies et n’identifient pas les visiteurs.',
          ],
        },
        {
          heading: 'Utilisation',
          body: [
            'Nous utilisons vos informations uniquement pour répondre à votre demande, préparer un devis ou une proposition et conserver une trace de nos échanges. Nous ne vendons pas d’informations personnelles et ne les utilisons pas à d’autres fins commerciales.',
          ],
        },
        {
          heading: 'Partage',
          body: [
            'Les demandes sont transmises à notre messagerie professionnelle via Zoho Mail. Le site est hébergé par Vercel. Ces prestataires traitent les données pour notre compte et peuvent les stocker hors d’Australie. Nous prenons des mesures raisonnables pour qu’ils les protègent.',
          ],
        },
        {
          heading: 'Durée de conservation',
          body: [
            'Nous conservons les demandes le temps nécessaire pour y répondre et respecter nos obligations légales et de gestion, puis nous les supprimons.',
          ],
        },
        {
          heading: 'Accès, rectification et réclamations',
          body: [
            'Vous pouvez demander l’accès à vos informations ou leur rectification en écrivant à {email}. Pour toute réclamation, contactez-nous d’abord. Si notre réponse ne vous satisfait pas, vous pouvez saisir l’Office of the Australian Information Commissioner sur oaic.gov.au.',
          ],
        },
      ],
    },
    terms: {
      title: 'Conditions d’utilisation',
      sections: [
        {
          heading: 'Utilisation du site',
          body: [
            'En utilisant ce site, vous acceptez ces conditions. Dans le cas contraire, merci de ne pas l’utiliser.',
          ],
        },
        {
          heading: 'Information générale',
          body: [
            'Le contenu de ce site est une information générale sur nos services. Il ne constitue pas un avis d’ingénierie adapté à une situation particulière.',
          ],
        },
        {
          heading: 'Calendrier de formation',
          body: [
            'Les dates de formation sont indicatives et peuvent changer. Une inscription n’est confirmée qu’après notre confirmation écrite.',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          body: [
            'Les textes, graphismes et logos de ce site appartiennent à MBSC Australia Pty Ltd ou sont utilisés avec autorisation. Les photographies créditées à des tiers restent la propriété de leurs auteurs.',
          ],
        },
        {
          heading: 'Responsabilité',
          body: [
            'Dans les limites permises par la loi, nous déclinons toute responsabilité pour les pertes liées à l’utilisation de ce site. Rien dans ces conditions n’exclut vos droits au titre de l’Australian Consumer Law.',
          ],
        },
        {
          heading: 'Droit applicable',
          body: ['Ces conditions sont régies par le droit de l’État de Victoria, Australie.'],
        },
      ],
    },
  },
};
