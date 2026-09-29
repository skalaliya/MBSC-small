import type { UI } from './en';
import { plural } from './plural';

export const fr: UI = {
  meta: {
    siteName: 'MBSC Australia',
    defaultTitle:
      'MBSC Australia | Conseil en ingénierie, formation technique et solutions numériques',
    defaultDescription:
      'Cabinet de conseil en ingénierie basé à Melbourne pour le pétrole et le gaz, les mines et les infrastructures. Conseil, inspection, formation technique et solutions numériques en Australie, au Moyen-Orient et en Europe.',
    pages: {
      home: {
        title: 'MBSC Australia | Conseil en ingénierie pétrole, gaz et mines',
        description:
          'Ingénierie, formation technique et solutions numériques pour le pétrole et le gaz, les mines et les infrastructures. Australie, Moyen-Orient et Europe.',
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
          'Dates {year} des formations techniques en pétrole et gaz, géosciences, mines et ingénierie numérique. En présentiel, à distance ou en hybride.',
      },
      rental: {
        title: 'Location d’équipement | MBSC Australia',
        description:
          'Équipements d’essais non destructifs et de surveillance étalonnés à louer : GPR, auscultation sonique, pachomètres et enregistreurs de vibrations.',
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
      insights: {
        title: 'Analyses | MBSC Australia',
        description:
          'Notes pratiques des ingénieurs de MBSC sur l’IA, la maintenance, la géologie et la sécurité dans les mines et l’énergie.',
      },
      notFound: {
        title: 'Page introuvable | MBSC Australia',
        description: 'La page demandée est introuvable.',
      },
    },
  },
  brand: { tagline: 'Énergie · Mines · Infrastructures' },
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
    ai: 'IA et numérique',
    projects: 'Projets',
    insights: 'Analyses',
    training: 'Formation',
    rental: 'Équipement',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Parler à un ingénieur',
    home: 'Accueil',
  },
  lang: {
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
    enShort: 'EN',
    frShort: 'FR',
    arShort: 'عربي',
  },
  common: {
    learnMore: 'En savoir plus',
    viewAll: 'Tout voir',
    readCaseStudy: 'Lire l’étude de cas',
    enquire: 'Se renseigner',
    requestQuote: 'Demander un devis',
    call: 'Appeler',
    email: 'E-mail',
    hours: 'Lun–ven, 7 h – 17 h (heure de Melbourne)',
    back: 'Retour',
    location: 'Lieu',
    sector: 'Secteur',
    year: 'Année',
    client: 'Client',
    services: 'Services',
    confidentialClient: 'Client confidentiel',
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
    },
    footnote: 'Chiffres cumulés à fin {date}.',
    format: { projects: '{n}+', trainingHours: '{n}+' },
  },
  home: {
    trust: {
      title: 'Organisations avec lesquelles nous avons travaillé',
      disclaimer:
        'Les logos sont des marques de leurs propriétaires et n’impliquent aucune approbation.',
      mining: 'Mines',
      oilGas: 'Énergie',
    },
    services: {
      eyebrow: 'Nos activités',
      title: 'Six disciplines, une seule équipe responsable',
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
    projects: {
      eyebrow: 'Références',
      title: 'Sélection d’études de cas',
      all: 'Tous les projets',
    },
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
      illustrative: 'Image d’illustration',
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
        body: 'Ingénieurs seniors et formateurs expérimentés se déplacent sur vos sites, ou animent les sessions depuis Melbourne et Perth.',
      },
      {
        title: 'Contenus alignés sur les normes',
        body: 'Les cours s’appuient sur les normes australiennes, et les formations END préparent les candidats à la certification ISO 9712 délivrée par un organisme de certification accrédité.',
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
      any: 'Tout afficher',
      reset: 'Réinitialiser',
      results: '{count} sessions affichées',
      resultsOne: '1 session affichée',
      noMatches: 'Aucune session ne correspond à ces filtres.',
      noSessions: 'Aucune session programmée ce mois-ci.',
      onRequest: 'Dates sur demande',
      past: 'Session passée',
      showPast: 'Afficher les {count} mois précédents',
      showPastOne: 'Afficher le mois précédent',
      hidePast: 'Masquer les mois précédents',
      days: plural({ one: '1 jour', other: '{count} jours' }),
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
      deliveryModes: { onsite: 'En présentiel', virtual: 'À distance', hybrid: 'Hybride' },
      locations: {
        melbourne: 'Melbourne',
        perth: 'Perth',
        global: 'Monde entier',
        clientSite: 'Sur votre site',
      },
      certificates: {
        technicalCertification: 'Attestation de formation',
        professionalProgram: 'Programme professionnel',
        bespokeTraining: 'Formation sur mesure',
        corporateWorkshop: 'Atelier d’entreprise',
        iso9712Certification: 'Préparation à la certification ISO 9712',
        associateProgram: 'Programme associé',
      },
    },
    catalogue: {
      title: 'Catalogue des formations',
      lead: 'Tous nos programmes, classés par discipline.',
      sessions: plural({
        one: '1 session programmée en {year}',
        other: '{count} sessions programmées en {year}',
      }),
    },
    faqTitle: 'Questions sur la formation',
    ctaTitle: 'Développez les compétences de votre équipe',
    ctaLead:
      'Renseignez-vous sur les tarifs de groupe, la formation sur site et les programmes sur mesure.',
    ctaPrimary: 'Demander des informations',
  },
  rental: {
    eyebrow: 'Location d’équipement',
    title: 'Équipements d’essais à louer',
    lead: 'Équipements d’essais non destructifs et de surveillance étalonnés, en location courte ou longue durée, avec assistance technique.',
    specs: {
      model: 'Modèle',
      measures: 'Grandeurs mesurées',
      use: 'Usage type',
      supplied: 'Fourni avec',
    },
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
        name: 'Enregistreur de vibrations (sismographe de chantier)',
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
        'MBSC Australia est un cabinet de conseil spécialisé en ingénierie au service des secteurs du pétrole et du gaz, des mines et des infrastructures. Nos ingénieurs seniors, géoscientifiques et spécialistes techniques travaillent aux côtés d’opérateurs, d’entreprises prestataires et d’organismes publics.',
        'Nous associons inspection et conseil sur le terrain, formation technique et outils numériques, pour que l’expérience acquise sur un projet profite au suivant.',
      ],
      imageAlt: 'Ingénieur MBSC réalisant des essais en laboratoire',
    },
    mission: {
      title: 'Notre mission',
      body: 'Fournir une ingénierie qui assure la sécurité, l’efficacité et la durabilité des infrastructures et des opérations critiques.',
    },
    values: {
      title: 'Nos engagements',
      items: [
        {
          title: 'Rigueur technique',
          body: 'Les méthodes sont documentées, le matériel étalonné et les résultats raccordés à des étalons de référence.',
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
    clientsEyebrow: 'Références clients',
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
      optional: 'facultatif',
      firstName: 'Prénom',
      lastName: 'Nom',
      company: 'Entreprise',
      email: 'E-mail professionnel',
      phone: 'Téléphone',
      topic: 'Sujet',
      message: 'Comment pouvons-nous vous aider ?',
      messageHint: 'Quelques lignes sur le site, l’actif ou la formation, et vos délais.',
      regarding: 'Concernant :',
      consent:
        'J’accepte que MBSC Australia utilise ces informations pour répondre à ma demande et en conserver une trace, conformément à la {privacy}.',
      privacyLink: 'politique de confidentialité',
      honeypot: 'Laissez ce champ vide',
      submit: 'Envoyer la demande',
      sending: 'Envoi…',
      topics: {
        general: 'Demande générale',
        ai: 'IA et apprentissage automatique',
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
        tooLong: 'Merci de ne pas dépasser {max} caractères.',
        consent: 'Merci de donner votre accord pour que nous puissions vous répondre.',
        summary: 'Merci de vérifier les champs signalés.',
        send: 'Votre demande n’a pas pu être envoyée. Réessayez ou écrivez-nous directement à {email}.',
        unavailable:
          'Les demandes en ligne sont temporairement indisponibles. Écrivez à {email} ou appelez le {phone}.',
        tooFast: 'Envoi trop rapide. Patientez quelques secondes et réessayez.',
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
  ai: {
    meta: {
      title: 'IA et apprentissage automatique pour les mines | MBSC Australia',
      description:
        'Maintenance prédictive, contrôle des teneurs assisté par ML, sécurité par vision artificielle et formation en réalité virtuelle pour les mines et l’énergie.',
    },
    eyebrow: 'IA et numérique',
    title: 'IA et apprentissage automatique pour les mines',
    lead: 'Nous transformons les données que votre exploitation produit déjà en alertes plus précoces, en modèles de ressources plus fiables, en sites plus sûrs et en équipes formées avant même de mettre le pied sur le site.',
    primary: 'Parler à nos spécialistes',
    secondary: 'Voir le fonctionnement',
    intro: {
      title: 'L’ingénierie d’abord, les algorithmes ensuite',
      body: [
        'La plupart des projets d’IA dans les mines s’essoufflent parce qu’ils partent d’un outil plutôt que d’un problème. Les nôtres partent d’un ingénieur qui connaît l’actif, le gisement ou la procédure, et d’une décision précise que le modèle doit améliorer.',
        'Nous nous appuyons sur vos systèmes existants, un ingénieur qualifié reste responsable de chaque recommandation, et nous livrons des modèles que votre équipe peut exploiter et auditer.',
      ],
    },
    principles: [
      {
        title: 'Vos données restent les vôtres',
        body: 'Les modèles peuvent fonctionner dans votre propre environnement cloud ou sur site. Le traitement des données est convenu avant tout transfert.',
      },
      {
        title: 'L’ingénieur dans la boucle',
        body: 'Les alertes de sécurité sont transmises directement aux superviseurs ; les recommandations d’ingénierie et de géologie sont vérifiées par un ingénieur ou un géologue qualifié avant toute mise en œuvre.',
      },
      {
        title: 'Sur votre existant',
        body: 'Nous nous connectons à vos historiens, systèmes de flotte, GMAO et bases géologiques au lieu de les remplacer.',
      },
    ],
    diagram: {
      eyebrow: 'Architecture',
      title: 'L’architecture de données que nous concevons pour votre exploitation',
      lead: 'Vue d’ensemble du flux de données que nous concevons pour nos clients miniers. Chaque déploiement est adapté aux systèmes déjà en place.',
      loop: 'L’ingénieur dans la boucle : les résultats validés réentraînent les modèles',
      stages: [
        {
          title: 'Sources de données',
          items: [
            'Capteurs de flotte et d’usine (SCADA, IoT)',
            'Sondages, analyses et géophysique',
            'Caméras fixes et relevés par drone',
            'Historiques de maintenance et d’exploitation',
          ],
        },
        {
          title: 'Edge et ingestion des données',
          items: [
            'Passerelles sur site',
            'Validation et nettoyage',
            'Transfert sécurisé et chiffré',
          ],
        },
        {
          title: 'Plateforme de données',
          items: ['Lac de données d’ingénierie', 'Base géospatiale', 'Référentiel de variables'],
        },
        {
          title: 'Modèles',
          items: [
            'Maintenance prédictive',
            'Modélisation du minerai et des teneurs',
            'Sécurité par vision artificielle',
            'Moteur de scénarios VR',
          ],
        },
        {
          title: 'Résultats',
          items: [
            'Alertes et tableaux de bord',
            'Données pour le modèle de ressources',
            'Interventions de sécurité',
            'Équipes formées et évaluées',
          ],
        },
      ],
    },
    capabilities: {
      eyebrow: 'Compétences',
      title: 'Quatre applications de l’IA sur site',
      problem: 'L’enjeu',
      method: 'Notre méthode',
      delivers: 'Ce que vous recevez',
      items: [
        {
          title: 'Maintenance prédictive',
          problem:
            'Les pannes imprévues des camions de roulage, convoyeurs, concasseurs et pompes arrêtent la production et créent des risques pour la sécurité.',
          method:
            'Nous combinons vibrations, températures, analyses d’huile et données d’exploitation avec l’historique de maintenance pour entraîner des modèles qui estiment l’état de chaque actif et le délai probable avant défaillance.',
          delivers: [
            'Classement des actifs à risque, actualisé en continu',
            'Alertes transmises à votre système de maintenance',
            'Documentation et rapport de validation des modèles',
          ],
          imageAlt: 'Chargeuse sur une piste minière vue du ciel',
        },
        {
          title: 'Géologie et modélisation du minerai',
          problem:
            'Les modèles de ressources construits sur des sondages espacés comportent une incertitude qui se répercute sur la planification et le contrôle des teneurs.',
          method:
            'Le domaining et l’estimation des teneurs assistés par apprentissage automatique complètent la géostatistique classique, avec une incertitude quantifiée et chaque résultat vérifié par nos géologues.',
          delivers: [
            'Données et limites de domaines pour le modèle de blocs',
            'Cartes d’incertitude et de confiance',
            'Rapport de validation préparé pour l’examen de la Personne compétente',
          ],
          imageAlt: 'Vue aérienne d’une mine à ciel ouvert en gradins',
        },
        {
          title: 'Sécurité et vision artificielle',
          problem:
            'Personnel et engins lourds partagent le même terrain, et talus et digues à résidus évoluent entre deux inspections.',
          method:
            'Des modèles appliqués aux caméras fixes et aux relevés par drone détectent les intrusions en zone d’exclusion et l’absence d’EPI, et suivent les mouvements de surface des talus et digues.',
          delivers: [
            'Alertes en temps réel aux superviseurs',
            'Cartes de détection de changements issues des drones',
            'Journal d’événements auditable, conçu dans le respect de la vie privée',
          ],
          imageAlt: 'Drone de relevé en vol',
        },
        {
          title: 'Réalité virtuelle et formation immersive',
          problem:
            'Les tâches à haut risque sont difficiles à pratiquer en sécurité, et la formation en salle reflète rarement les conditions du site.',
          method:
            'Nous créons des scénarios de réalité virtuelle à partir de vos propres procédures et équipements pour que les équipes répètent les tâches critiques et les situations d’urgence avant de les réaliser en conditions réelles.',
          delivers: [
            'Scénarios VR propres à votre site',
            'Résultats d’évaluation par participant',
            'Registres de compétences pour votre système de formation',
          ],
          imageAlt: 'Opérateur en gilet haute visibilité utilisant un casque de réalité virtuelle',
        },
      ],
    },
    vr: {
      eyebrow: 'Formation VR',
      title: 'De la procédure au casque',
      steps: [
        {
          title: 'Conception du scénario',
          body: 'Nous transformons vos procédures, équipements et dangers en un scénario scripté avec des critères de réussite clairs.',
        },
        {
          title: 'Session en casque',
          body: 'Les équipes réalisent le scénario sur site ou dans nos salles de formation de Melbourne et Perth.',
        },
        {
          title: 'Évaluation',
          body: 'Chaque décision est enregistrée et évaluée au regard de la procédure, avec un débriefing du formateur.',
        },
        {
          title: 'Registre de compétences',
          body: 'Les résultats alimentent votre système de compétences, prêts pour l’audit.',
        },
      ],
    },
    courses: 'Formations au numérique et à l’IA',
    faqTitle: 'Questions sur les projets d’IA',
    faq: [
      {
        q: 'Faut-il une plateforme de données avant de commencer ?',
        a: 'Non. Nous commençons par évaluer les données dont vous disposez et recommandons la plateforme la plus simple pour le premier cas d’usage.',
      },
      {
        q: 'Où sont hébergées nos données ?',
        a: 'Par défaut dans votre propre environnement cloud ou sur site. Le traitement, l’accès et la conservation des données sont convenus avec vous avant tout transfert.',
      },
      {
        q: 'Comment démarrer ?',
        a: 'Par un pilote sur une famille d’actifs, une zone ou une procédure, avec des critères de réussite définis à l’avance. Nous n’élargissons qu’une fois ces critères atteints.',
      },
      {
        q: 'Cela remplacera-t-il nos ingénieurs ?',
        a: 'Non. Les modèles signalent les problèmes et quantifient l’incertitude ; des personnes qualifiées prennent les décisions et en restent responsables.',
      },
    ],
    ctaTitle: 'Commencez par un problème qui en vaut la peine',
    ctaLead:
      'Parlez-nous de l’actif, du gisement ou de la procédure. Nous vous dirons si l’IA peut aider et à quoi ressemble la première étape.',
    teaser: {
      eyebrow: 'IA et numérique',
      title: 'L’IA et l’apprentissage automatique, conçus pour les mines',
      lead: 'Maintenance prédictive, géologie assistée par ML, sécurité par vision artificielle et formation VR, à partir des données que votre exploitation produit déjà.',
      cta: 'Découvrir nos capacités en IA',
    },
  },
  presence: {
    eyebrow: 'Zones d’intervention',
    title: 'Une ingénierie déployée sur trois régions',
    lead: 'Depuis notre siège de Melbourne et notre base de formation de Perth, nous envoyons ingénieurs et formateurs auprès d’opérateurs en Australie, au Moyen-Orient et en Europe.',
    places: {
      melbourne: 'Siège de Melbourne',
      perth: 'Perth',
      'middle-east': 'Moyen-Orient',
      europe: 'Europe',
    },
    facts: {
      regions: 'Régions desservies',
      languages: 'Langues',
      disciplines: 'Domaines d’activité',
    },
  },
  insights: {
    eyebrow: 'Par nos ingénieurs',
    title: 'Analyses',
    lead: 'Notes pratiques de nos ingénieurs sur l’IA, la maintenance, la géologie et la sécurité dans les mines et l’énergie.',
    filterLabel: 'Filtrer par thème',
    all: 'Tous',
    readingTime: plural({ one: '1 min de lecture', other: '{count} min de lecture' }),
    meta: {
      published: 'Publié le',
      updated: 'Mis à jour le',
      reading: 'Temps de lecture',
      author: 'Rédigé par',
    },
    published: 'Publié le {date}',
    updated: 'Mis à jour le {date}',
    toc: 'Sur cette page',
    related: 'Articles liés',
    latest: 'Dernières analyses',
    viewAll: 'Toutes les analyses',
    read: 'Lire l’article',
    empty: 'De nouveaux articles arrivent bientôt.',
    rss: 'Flux RSS',
    draft: 'Aperçu de brouillon : non publié sur le site.',
    ctaTitle: 'Envie d’en parler pour votre exploitation ?',
    ctaLead: 'Échangez avec l’ingénieur à l’origine de l’article.',
    tags: {
      ai: 'IA et données',
      maintenance: 'Maintenance',
      geology: 'Géologie',
      safety: 'Sécurité',
      training: 'Formation',
      vr: 'Réalité virtuelle',
      news: 'Actualités',
    },
  },
  partners: {
    eyebrow: 'Partenaire technologique',
    sectionTitle: 'Partenaires',
    panelTitle: 'Réalisé avec notre partenaire technologique',
    since: 'Partenaire depuis {date}',
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
        a: 'Partout en Australie, avec une activité régulière dans l’État de Victoria, en Australie-Méridionale et en Australie-Occidentale. Nous accompagnons aussi des clients au Moyen-Orient et en Europe.',
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
        a: 'Oui. Les sessions à distance et hybrides sont animées en direct par un formateur, sans contenu préenregistré.',
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
        a: 'Sous un jour ouvré, du lundi au vendredi, heure de Melbourne.',
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
            'MBSC Australia Pty Ltd (« nous ») traite les informations personnelles conformément aux Australian Privacy Principles du Privacy Act 1988 (Cth). Cette politique décrit la manière dont nous gérons les informations personnelles recueillies via ce site.',
          ],
        },
        {
          heading: 'Ce que nous collectons',
          body: [
            'Lorsque vous envoyez une demande, nous collectons votre nom et votre adresse e-mail et, le cas échéant, le nom de votre entreprise, votre téléphone, le sujet, la référence et votre message. Vous pouvez aussi nous appeler ou nous écrire, et vous n’avez pas à vous identifier pour poser une question générale.',
            'Notre hébergeur enregistre des informations techniques, comme votre adresse IP, votre navigateur et les pages consultées, afin de fournir et de protéger le site. Vercel Web Analytics et Speed Insights mesurent les visites et les performances sans cookies et sans identifier les visiteurs.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'Ce site ne dépose pas de cookies. Le plan de notre page Contact ne se charge que si vous choisissez de l’afficher ; Google peut alors déposer des cookies selon sa propre politique de confidentialité.',
          ],
        },
        {
          heading: 'Utilisation',
          body: [
            'Nous utilisons vos informations uniquement pour répondre à votre demande, préparer un devis ou une proposition et conserver une trace de nos échanges. Nous ne vendons pas d’informations personnelles et ne les utilisons pas à des fins de prospection sans rapport avec votre demande.',
          ],
        },
        {
          heading: 'Partage',
          body: [
            'Notre site est hébergé par Vercel Inc. Les demandes sont envoyées par e-mail via Zoho ZeptoMail et reçues dans Zoho Mail (Zoho Corporation). Ces prestataires traitent les données pour notre compte, et vos informations sont susceptibles d’être stockées ou traitées aux États-Unis. Nous prenons des mesures raisonnables pour qu’ils les protègent. Nous ne communiquons pas vos informations à d’autres tiers, sauf obligation légale.',
          ],
        },
        {
          heading: 'Durée de conservation',
          body: [
            'Nous conservons les demandes le temps nécessaire pour y répondre et respecter nos obligations légales et professionnelles de conservation des documents, puis nous les supprimons.',
          ],
        },
        {
          heading: 'Accès, rectification et réclamations',
          body: [
            'Vous pouvez demander l’accès à vos informations ou leur rectification en écrivant à {email}. Pour toute réclamation relative à la protection de vos informations personnelles, contactez-nous d’abord : nous nous efforçons de répondre sous 30 jours. Si notre réponse ne vous satisfait pas, vous pouvez saisir l’Office of the Australian Information Commissioner (OAIC), l’autorité australienne de protection des données, sur oaic.gov.au ou au 1300 363 992.',
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
            'Le contenu de ce site est une information générale sur nos services. Il ne constitue pas un avis d’ingénierie adapté à une situation particulière. Obtenez toujours un avis propre à votre projet avant d’agir sur la base de ce contenu.',
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
            'Les textes et graphismes de ce site appartiennent à MBSC Australia Pty Ltd. Les noms et logos de tiers sont des marques de leurs propriétaires respectifs. Les photographies créditées à des tiers restent la propriété de leurs auteurs.',
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
