import { plural } from './plural';

export const en = {
  meta: {
    siteName: 'MBSC Australia',
    defaultTitle:
      'MBSC Australia | Engineering consultancy, technical training and digital solutions',
    defaultDescription:
      'Melbourne-based engineering consultancy for oil & gas, mining and infrastructure. Consultancy, inspection, technical training and digital solutions across Australia, the Middle East and Europe.',
    pages: {
      home: {
        title: 'MBSC Australia | Oil & Gas and Mining Engineering Consultancy',
        description:
          'Engineering consultancy, technical training and digital solutions for oil & gas, mining and infrastructure operators in Australia, the Middle East and Europe.',
      },
      services: {
        title: 'Services | MBSC Australia',
        description:
          'Oil & gas engineering, technical training, digital solutions, mining and geology services, and safety and compliance programs.',
      },
      projects: {
        title: 'Projects and case studies | MBSC Australia',
        description:
          'Selected oil & gas, mining and civil infrastructure projects delivered by MBSC Australia across Australia.',
      },
      training: {
        title: 'Training calendar {year} | MBSC Australia',
        description:
          '{year} technical training dates in oil & gas, geoscience, mining and digital engineering. On-site, virtual and hybrid delivery.',
      },
      rental: {
        title: 'Equipment hire | MBSC Australia',
        description:
          'Calibrated non-destructive testing and monitoring equipment for hire: GPR, ultrasonic pulse velocity, cover meters and vibration monitors.',
      },
      about: {
        title: 'About | MBSC Australia',
        description:
          'Who we are, how we work and where we operate. A Melbourne engineering consultancy serving energy, mining and infrastructure.',
      },
      contact: {
        title: 'Contact | MBSC Australia',
        description:
          'Talk to an engineer about a project, a training program or equipment hire. We reply within one business day.',
      },
      privacy: {
        title: 'Privacy policy | MBSC Australia',
        description: 'How MBSC Australia collects, uses and protects personal information.',
      },
      terms: {
        title: 'Terms of use | MBSC Australia',
        description: 'Terms that apply to using the MBSC Australia website.',
      },
      insights: {
        title: 'Insights | MBSC Australia',
        description:
          'Practical notes from MBSC engineers on AI, maintenance, geology and safety in mining and energy.',
      },
      notFound: {
        title: 'Page not found | MBSC Australia',
        description: 'The page you were looking for could not be found.',
      },
    },
  },
  brand: { tagline: 'Energy · Mining · Infrastructure' },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageSwitcher: 'Choose language',
    breadcrumb: 'Breadcrumb',
    footerNav: 'Footer navigation',
    homeLink: 'MBSC Australia home',
    externalLink: '(opens in a new tab)',
  },
  nav: {
    services: 'Services',
    ai: 'AI & Digital',
    projects: 'Projects',
    insights: 'Insights',
    training: 'Training',
    rental: 'Equipment',
    about: 'About',
    contact: 'Contact',
    cta: 'Talk to an engineer',
    home: 'Home',
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
    learnMore: 'Learn more',
    viewAll: 'View all',
    readCaseStudy: 'Read case study',
    enquire: 'Enquire',
    requestQuote: 'Request a quote',
    call: 'Call',
    email: 'Email',
    hours: 'Mon–Fri, 7:00 am – 5:00 pm Melbourne time',
    back: 'Back',
    location: 'Location',
    sector: 'Sector',
    year: 'Year',
    client: 'Client',
    services: 'Services',
    confidentialClient: 'Confidential client',
    regions: { au: 'Australia', me: 'Middle East', eu: 'Europe' },
    regionsLong: {
      au: 'Head office in Melbourne. Field teams deploy nationally, from the Cooper Basin to the Pilbara.',
      me: 'Consultancy and training delivered on client sites and in partnership with regional operators.',
      eu: 'Specialist consultancy and virtual training programs for European energy and resources clients.',
    },
  },
  hero: {
    eyebrow: 'Melbourne HQ · Australia · Middle East · Europe',
    title: 'Engineering integrity for energy, mining and infrastructure.',
    lead: 'Consultancy, inspection, technical training and digital solutions for operators who cannot afford to get it wrong.',
    primary: 'Talk to an engineer',
    secondary: 'View training calendar',
    imageAlt: 'Offshore gas platform at dusk',
  },
  stats: {
    labels: {
      projects: 'Projects delivered',
      trainingHours: 'Training hours delivered',
    },
    footnote: 'Cumulative figures to {date}.',
    // {n} is the formatted number.
    format: { projects: '{n}+', trainingHours: '{n}+' },
  },
  home: {
    trust: {
      title: 'Organisations we’ve worked with',
      disclaimer: 'Logos are trademarks of their owners and do not imply endorsement.',
      mining: 'Mining',
      oilGas: 'Energy',
    },
    services: {
      eyebrow: 'What we do',
      title: 'Six disciplines, one accountable team',
      lead: 'From well integrity to workforce competency, each engagement is led by a senior engineer who stays with it to close-out.',
    },
    process: {
      eyebrow: 'How we work',
      title: 'Assess. Deliver. Verify.',
      steps: [
        {
          title: 'Assess',
          body: 'We scope the problem on site or from your data, agree the standards that apply and fix a clear deliverable.',
        },
        {
          title: 'Deliver',
          body: 'Engineers, inspectors or trainers mobilise with calibrated equipment and a documented method.',
        },
        {
          title: 'Verify',
          body: 'Every job closes with a report, dataset or certificate your team can audit and act on.',
        },
      ],
    },
    projects: {
      eyebrow: 'Track record',
      title: 'Selected case studies',
      all: 'All projects',
    },
    training: {
      eyebrow: 'Upcoming training',
      title: 'Next scheduled sessions',
      all: 'Full training calendar',
      none: 'New sessions are being scheduled. Contact us for dates.',
    },
    testimonials: { eyebrow: 'Client feedback', title: 'What operators say' },
    regions: { eyebrow: 'Where we work', title: 'Deployed across three regions' },
    cta: {
      title: 'Ready to discuss your next project?',
      lead: 'Tell us what you need. A senior engineer will reply within one business day.',
      primary: 'Talk to an engineer',
      secondary: 'Call {phone}',
    },
  },
  services: {
    eyebrow: 'Services',
    title: 'Engineering services',
    lead: 'Consultancy, training and digital solutions for oil & gas, mining and infrastructure.',
    capabilities: 'Capabilities',
    whyTitle: 'Why operators choose MBSC',
    why: [
      {
        title: 'Senior-led',
        body: 'A senior engineer owns every engagement from scoping to close-out.',
      },
      {
        title: 'Standards first',
        body: 'Work is planned against the Australian and international standards your auditors expect.',
      },
      {
        title: 'Field and classroom',
        body: 'The same people who inspect assets train the teams who run them.',
      },
    ],
    detail: {
      overview: 'Overview',
      process: 'How the engagement runs',
      deliverables: 'What you receive',
      relatedProjects: 'Related projects',
      relatedCourses: 'Related training',
      otherServices: 'Other services',
      ctaTitle: 'Discuss your {service} requirements',
      ctaPrimary: 'Request a proposal',
    },
    faqTitle: 'Common questions',
    ctaTitle: 'Not sure which service fits?',
    ctaLead: 'Describe the problem and we will recommend a scope.',
  },
  projects: {
    eyebrow: 'Track record',
    title: 'Projects and case studies',
    lead: 'Oil & gas, mining and civil infrastructure work delivered across Australia.',
    filterLabel: 'Filter by sector',
    all: 'All',
    sectors: {
      oilGas: 'Oil & gas',
      mining: 'Mining',
      civil: 'Civil infrastructure',
      marine: 'Marine',
    },
    detail: {
      challenge: 'The challenge',
      approach: 'Our approach',
      outcome: 'Outcome',
      keyFacts: 'Key facts',
      illustrative: 'Illustrative image',
      more: 'More {sector} projects',
    },
    empty: 'No projects in this sector yet.',
    ctaTitle: 'Have a similar project?',
    ctaLead: 'We can mobilise engineers and equipment across Australia at short notice.',
  },
  training: {
    eyebrow: 'Technical training',
    title: 'Training programs',
    lead: 'Scheduled and bespoke programs in oil & gas, geoscience, mining and digital engineering, delivered on site, online or both.',
    valueProps: [
      {
        title: 'Delivered where you work',
        body: 'Senior engineers and experienced instructors deploy to your site, or run sessions from Melbourne and Perth.',
      },
      {
        title: 'Standards-mapped content',
        body: 'Courses map to Australian Standards, and NDT courses prepare candidates for ISO 9712 certification by an accredited certification body.',
      },
      {
        title: 'Flexible formats',
        body: 'On-site workshops, virtual classrooms, hybrid programs or fully bespoke corporate courses.',
      },
    ],
    upcoming: 'Next sessions',
    calendar: {
      title: '{year} training calendar',
      lead: 'Dates are confirmed when you enquire. Group and on-site bookings can be arranged outside this schedule.',
      yearNav: 'Calendar year',
      filters: 'Filter sessions',
      category: 'Category',
      delivery: 'Delivery',
      location: 'Location',
      any: 'All',
      reset: 'Reset filters',
      results: '{count} sessions shown',
      resultsOne: '1 session shown',
      noMatches: 'No sessions match these filters.',
      noSessions: 'No sessions scheduled this month.',
      onRequest: 'Dates on request',
      past: 'Past session',
      showPast: 'Show {count} earlier months',
      showPastOne: 'Show 1 earlier month',
      hidePast: 'Hide earlier months',
      days: plural({ one: '1 day', other: '{count} days' }),
      custom: 'Custom',
      enquire: 'Enquire',
      enquireLabel: 'Enquire about {course}',
      notice:
        'Sessions may be rescheduled if minimum numbers are not met. We confirm every booking in writing.',
      categories: {
        oilGas: 'Oil & gas',
        geoscience: 'Geoscience',
        geology: 'Geology',
        mining: 'Mining',
        crossDiscipline: 'Cross-discipline',
        digitalAI: 'Digital & AI',
      },
      deliveryModes: { onsite: 'In person', virtual: 'Virtual', hybrid: 'Hybrid' },
      locations: {
        melbourne: 'Melbourne',
        perth: 'Perth',
        global: 'Worldwide',
        clientSite: 'At your site',
      },
      certificates: {
        technicalCertification: 'Certificate of completion',
        professionalProgram: 'Professional program',
        bespokeTraining: 'Bespoke training',
        corporateWorkshop: 'Corporate workshop',
        iso9712Certification: 'Prepares for ISO 9712 certification',
        associateProgram: 'Associate program',
      },
    },
    catalogue: {
      title: 'Course catalogue',
      lead: 'Every program we run, grouped by discipline.',
      sessions: plural({
        one: '1 scheduled session in {year}',
        other: '{count} scheduled sessions in {year}',
      }),
    },
    launch: {
      badge: 'Now open',
      title: '{year} training calendar',
      body: '{sessions} scheduled sessions across {courses} courses, delivered on site, virtually or hybrid. Enquire early to secure places or arrange a group booking.',
      view: 'See the {year} dates',
      pdf: 'Download PDF',
      enquire: 'Enquire about {year}',
      finalBadge: 'Final sessions',
      finalTitle: 'Still to run in {year}',
      finalBody: plural({
        one: '1 session left this year, finishing on {date}.',
        other: '{count} sessions left this year, the last finishing on {date}.',
      }),
      finalLink: 'View the remaining {year} sessions',
      outgoingNotice:
        'Only the {year} sessions still to run are shown. The {next} calendar is now open.',
      outgoingLink: 'See the {next} calendar',
      print: {
        docTitle: '{year} training calendar (printable) | MBSC Australia',
        date: 'Dates',
        course: 'Course',
        format: 'Format',
        length: 'Length',
        onRequestTitle: 'Programs with dates on request',
        contact: 'Enquiries',
        updated: 'Updated {date}',
        print: 'Print',
      },
    },
    faqTitle: 'Training questions',
    ctaTitle: 'Build your team’s capability',
    ctaLead: 'Ask about group rates, on-site delivery and custom programs.',
    ctaPrimary: 'Request training information',
  },
  rental: {
    eyebrow: 'Equipment hire',
    title: 'Testing equipment for hire',
    lead: 'Calibrated non-destructive testing and monitoring equipment for short and long-term hire, with technical support.',
    specs: { model: 'Model', measures: 'Measures', use: 'Typical use', supplied: 'Supplied with' },
    supplied: 'Calibration certificate, carry case and phone support',
    items: {
      gpr: {
        name: 'Ground penetrating radar',
        model: 'High-frequency GPR system',
        measures: 'Reinforcement, conduits and voids in concrete',
        use: 'Scanning before coring, cutting or anchoring; subsurface mapping',
      },
      ultrasonic: {
        name: 'Ultrasonic pulse velocity tester',
        model: 'Proceq Pundit Lab+',
        measures: 'Pulse velocity through concrete and other materials',
        use: 'Concrete uniformity, crack depth and strength estimation',
      },
      coverMeter: {
        name: 'Cover meter',
        model: 'Proceq Profometer 6',
        measures: 'Rebar location, cover depth and bar diameter',
        use: 'Durability assessments and pre-drilling checks',
      },
      vibration: {
        name: 'Vibration monitor',
        model: 'Tri-axial geophone system',
        measures: 'Peak particle velocity on three axes',
        use: 'Construction and blasting vibration compliance',
      },
    },
    calibration:
      'All equipment is calibrated to the manufacturer’s specification and supplied with a current calibration certificate.',
    termsTitle: 'Hire questions',
    ctaTitle: 'Need equipment on site?',
    ctaLead:
      'Tell us the job, location and dates. We confirm availability and pricing in a written quote.',
  },
  about: {
    eyebrow: 'About us',
    title: 'About MBSC Australia',
    lead: 'A Melbourne engineering consultancy built on field experience, technical rigour and long client relationships.',
    story: {
      title: 'Who we are',
      body: [
        'MBSC Australia is a specialist engineering consultancy serving the oil & gas, mining and infrastructure sectors. Our senior engineers, geoscientists and technical specialists work alongside operators, contractors and government agencies.',
        'We combine hands-on inspection and consultancy with technical training and digital tools, so the knowledge gained on one project strengthens the next.',
      ],
      imageAlt: 'MBSC engineer carrying out laboratory testing',
    },
    mission: {
      title: 'Our mission',
      body: 'To deliver engineering work that keeps critical infrastructure and operations safe, efficient and sustainable.',
    },
    values: {
      title: 'What we stand for',
      items: [
        {
          title: 'Technical rigour',
          body: 'Methods are documented, equipment is calibrated and results are traceable to a standard.',
        },
        {
          title: 'Safety first',
          body: 'No schedule pressure justifies an unsafe shortcut. Our people stop work when conditions change.',
        },
        {
          title: 'Partnership',
          body: 'We stay with a problem until it is solved and explain our findings in plain language.',
        },
      ],
    },
    team: { eyebrow: 'People', title: 'Leadership team' },
    clientsEyebrow: 'Clients',
    accreditations: {
      eyebrow: 'Assurance',
      title: 'Accreditations and memberships',
      onRequest: 'Certificates are available on request.',
    },
    regions: { eyebrow: 'Where we work', title: 'Regions we serve' },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Talk to an engineer',
    lead: 'Tell us about your project, training need or equipment enquiry. We reply within one business day.',
    office: {
      title: 'Head office',
      addressFallback: 'Melbourne, Victoria, Australia',
      phone: 'Phone',
      email: 'Email',
      hours: 'Office hours',
    },
    map: {
      title: 'Map',
      load: 'Load map',
      notice: 'Loading the map connects to Google Maps, which may set cookies.',
      iframeTitle: 'Map of MBSC Australia head office',
    },
    form: {
      title: 'Send an enquiry',
      required: 'Required',
      optional: 'Optional',
      firstName: 'First name',
      lastName: 'Last name',
      company: 'Company',
      email: 'Work email',
      phone: 'Phone',
      topic: 'Topic',
      message: 'How can we help?',
      messageHint: 'A few lines on the site, asset or course, and your timing.',
      regarding: 'Regarding:',
      consent:
        'I agree to MBSC Australia using these details to respond to my enquiry and keep a record of it, as described in the {privacy}.',
      privacyLink: 'privacy policy',
      honeypot: 'Leave this field empty',
      submit: 'Send enquiry',
      sending: 'Sending…',
      topics: {
        general: 'General enquiry',
        ai: 'AI & machine learning',
        oilGas: 'Oil & gas consultancy',
        training: 'Training programs',
        digital: 'Digital solutions',
        mining: 'Mining & geology',
        safety: 'Safety & compliance',
        rental: 'Equipment hire',
      },
      errors: {
        required: 'This field is required.',
        email: 'Enter a valid email address.',
        phone: 'Enter a valid phone number.',
        tooShort: 'Please add a little more detail (at least {min} characters).',
        tooLong: 'Please keep this under {max} characters.',
        consent: 'Please agree so we can reply to you.',
        summary: 'Please check the highlighted fields.',
        send: 'Your enquiry could not be sent. Please try again, or email us directly at {email}.',
        unavailable:
          'Online enquiries are temporarily unavailable. Please email {email} or call {phone}.',
        tooFast: 'That was quick. Please wait a moment and try again.',
      },
      success: {
        title: 'Enquiry received',
        body: 'Thank you. A member of our engineering team will reply within one business day.',
        again: 'Send another enquiry',
      },
    },
    faqTitle: 'Before you get in touch',
  },
  cta: {
    title: 'Ready to discuss your next project?',
    lead: 'A senior engineer will reply within one business day.',
    primary: 'Talk to an engineer',
  },
  ai: {
    meta: {
      title: 'AI & machine learning for mining | MBSC Australia',
      description:
        'Predictive maintenance, ML-assisted geology and grade control, computer-vision safety and VR training for mining and energy operators.',
    },
    eyebrow: 'AI & Digital',
    title: 'AI & machine learning for mining',
    lead: 'We turn the data your operation already produces into earlier warnings, better resource models, safer sites and crews trained before they set foot on site.',
    primary: 'Talk to our specialists',
    secondary: 'See how it works',
    intro: {
      title: 'Engineering first, then algorithms',
      body: [
        'Most AI projects in mining stall because they start with a tool rather than a problem. Ours start with an engineer who knows the asset, the ore body or the procedure, and a clear decision the model must improve.',
        'We build on the systems you already run, keep a qualified engineer accountable for every recommendation, and hand over models your team can operate and audit.',
      ],
    },
    principles: [
      {
        title: 'Your data stays yours',
        body: 'Models can run in your own cloud tenancy or on site. We agree data handling before any data moves.',
      },
      {
        title: 'Engineer in the loop',
        body: 'Safety alerts go straight to supervisors; engineering and geological recommendations are reviewed by a qualified engineer or geologist before they are acted on.',
      },
      {
        title: 'Built on what you have',
        body: 'We connect to existing historians, fleet systems, CMMS and geological databases rather than replacing them.',
      },
    ],
    diagram: {
      eyebrow: 'Architecture',
      title: 'The data architecture we design for your operation',
      lead: 'A high-level view of the data flow we design for mining clients. Each deployment is tailored to the systems already on site.',
      loop: 'Engineer in the loop: reviewed outcomes retrain the models',
      stages: [
        {
          title: 'Data sources',
          items: [
            'Fleet and plant sensors (SCADA, IoT)',
            'Drill-hole, assay and geophysics data',
            'Fixed cameras and drone surveys',
            'Maintenance and operator records',
          ],
        },
        {
          title: 'Edge and ingestion',
          items: ['Site gateways', 'Validation and cleansing', 'Secure, encrypted transfer'],
        },
        {
          title: 'Data platform',
          items: ['Engineering data lake', 'Geospatial store', 'Feature store'],
        },
        {
          title: 'Models',
          items: [
            'Predictive maintenance',
            'Ore and grade modelling',
            'Computer-vision safety',
            'VR scenario engine',
          ],
        },
        {
          title: 'Outcomes',
          items: [
            'Alerts and dashboards',
            'Resource model inputs',
            'Safety interventions',
            'Trained, assessed crews',
          ],
        },
      ],
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: 'Four ways we apply AI on site',
      problem: 'The challenge',
      method: 'How we do it',
      delivers: 'What you receive',
      items: [
        {
          title: 'Predictive maintenance',
          problem:
            'Unplanned failures of haul trucks, conveyors, crushers and pumps stop production and create safety risk.',
          method:
            'We combine vibration, temperature, oil-analysis and operating data with maintenance history to train models that estimate each asset’s condition and likely time to failure.',
          delivers: [
            'Ranked asset risk list, refreshed continuously',
            'Alerts routed into your maintenance system',
            'Model documentation and validation report',
          ],
          imageAlt: 'Loader working on a mine haul road seen from above',
        },
        {
          title: 'Geology and ore modelling',
          problem:
            'Resource models built from sparse drilling carry uncertainty that flows straight into mine plans and grade control.',
          method:
            'Machine-learning-assisted domaining and grade estimation run alongside conventional geostatistics, with uncertainty quantified and every result reviewed by our geologists.',
          delivers: [
            'Block-model inputs and domain boundaries',
            'Uncertainty and confidence maps',
            'Validation report prepared to support Competent Person review',
          ],
          imageAlt: 'Aerial view of a terraced open-pit mine',
        },
        {
          title: 'Safety and computer vision',
          problem:
            'People and heavy equipment share the same ground, and slopes and tailings dams change between inspections.',
          method:
            'Models running on fixed cameras and drone surveys detect exclusion-zone breaches and missing PPE, and track surface movement on slopes and tailings dams over time.',
          delivers: [
            'Real-time alerts to supervisors',
            'Change-detection maps from drone surveys',
            'Auditable event log, designed with privacy in mind',
          ],
          imageAlt: 'Survey drone in flight',
        },
        {
          title: 'VR and immersive training',
          problem:
            'High-risk tasks are hard to practise safely, and classroom training rarely matches site conditions.',
          method:
            'We build virtual-reality scenarios from your own procedures and equipment so crews rehearse critical tasks and emergencies before doing them for real.',
          delivers: [
            'Site-specific VR scenarios',
            'Assessment results per participant',
            'Competency records for your training system',
          ],
          imageAlt: 'Worker in a high-visibility jacket using a virtual-reality headset',
        },
      ],
    },
    vr: {
      eyebrow: 'VR training',
      title: 'From procedure to headset',
      steps: [
        {
          title: 'Scenario design',
          body: 'We turn your procedures, equipment and hazards into a scripted scenario with clear pass criteria.',
        },
        {
          title: 'Headset session',
          body: 'Crews complete the scenario on site or in our Melbourne and Perth training rooms.',
        },
        {
          title: 'Assessment',
          body: 'Every decision is recorded and assessed against the procedure, with instructor debrief.',
        },
        {
          title: 'Competency record',
          body: 'Results flow into your competency system, ready for audit.',
        },
      ],
    },
    courses: 'Digital and AI courses',
    faqTitle: 'Questions about AI projects',
    faq: [
      {
        q: 'Do we need a data platform before we start?',
        a: 'No. We begin with an assessment of the data you already have and recommend the smallest platform that supports the first use case.',
      },
      {
        q: 'Where does our data live?',
        a: 'By default in your own cloud tenancy or on site. We agree data handling, access and retention with you before any data moves.',
      },
      {
        q: 'How do you start?',
        a: 'With a pilot on one asset class, area or procedure, and success criteria agreed up front. We only scale once the pilot meets them.',
      },
      {
        q: 'Will this replace our engineers?',
        a: 'No. Models flag issues and quantify uncertainty; qualified people make the decisions and stay accountable for them.',
      },
    ],
    ctaTitle: 'Start with one problem worth solving',
    ctaLead:
      'Tell us about the asset, ore body or procedure. We will tell you whether AI can help and what the first step looks like.',
    teaser: {
      eyebrow: 'AI & Digital',
      title: 'AI and machine learning, engineered for mining',
      lead: 'Predictive maintenance, ML-assisted geology, computer-vision safety and VR training, built on the data your operation already produces.',
      cta: 'Explore our AI capabilities',
    },
  },
  presence: {
    eyebrow: 'Where we work',
    title: 'Engineering delivered across three regions',
    lead: 'From our Melbourne head office and Perth training base, we deploy engineers and trainers to operators in Australia, the Middle East and Europe.',
    places: {
      melbourne: 'Melbourne HQ',
      perth: 'Perth',
      'middle-east': 'Middle East',
      europe: 'Europe',
    },
    facts: { regions: 'Regions served', languages: 'Languages', disciplines: 'Service lines' },
  },
  insights: {
    eyebrow: 'From our engineers',
    title: 'Insights',
    lead: 'Practical notes from our engineers on AI, maintenance, geology and safety in mining and energy.',
    filterLabel: 'Filter by topic',
    all: 'All',
    readingTime: plural({ one: '1 min read', other: '{count} min read' }),
    meta: {
      published: 'Published',
      updated: 'Updated',
      reading: 'Reading time',
      author: 'Written by',
    },
    published: 'Published {date}',
    updated: 'Updated {date}',
    toc: 'On this page',
    related: 'Related articles',
    latest: 'Latest insights',
    viewAll: 'All insights',
    read: 'Read article',
    empty: 'New articles are on their way.',
    rss: 'RSS feed',
    draft: 'Draft preview: not published on the live site.',
    ctaTitle: 'Want to discuss this for your operation?',
    ctaLead: 'Talk to the engineer behind the article.',
    tags: {
      ai: 'AI & data',
      maintenance: 'Maintenance',
      geology: 'Geology',
      safety: 'Safety',
      training: 'Training',
      vr: 'VR',
      news: 'News',
    },
  },
  partners: {
    eyebrow: 'Technology partner',
    sectionTitle: 'Partners',
    panelTitle: 'Delivered with our technology partner',
    since: 'Partner since {date}',
  },
  footer: {
    tagline:
      'Engineering consultancy, technical training and digital solutions for oil & gas, mining and infrastructure.',
    services: 'Services',
    company: 'Company',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    sitemap: 'Sitemap',
    rights: 'All rights reserved.',
    abn: 'ABN {abn}',
    linkedin: 'MBSC Australia on LinkedIn',
    credits: 'Photography credits',
  },
  notFound: {
    eyebrow: 'Error 404',
    title: 'We could not find that page',
    lead: 'The page may have moved. These links will get you back on track.',
    home: 'Go to the home page',
  },
  credits: {
    intro: 'Photographs used under the Unsplash License. Thank you to the photographers.',
    own: 'Project photos of Moomba, the North West Shelf, the Metro Tunnel, the western suburbs pipeline and the laboratory belong to MBSC Australia.',
  },
  testimonials: { sample: 'Sample testimonial for layout preview' },
  faq: {
    services: [
      {
        q: 'Where can you deploy engineers?',
        a: 'Anywhere in Australia, with regular work in Victoria, South Australia and Western Australia. We also support clients in the Middle East and Europe.',
      },
      {
        q: 'How quickly can you mobilise?',
        a: 'It depends on the scope and site access requirements. Tell us your dates when you enquire and we will confirm availability in writing.',
      },
      {
        q: 'Which standards do you work to?',
        a: 'We work to the Australian Standards and international codes specified for your asset, and agree them with you before work starts.',
      },
      {
        q: 'Can you work under our safety system?',
        a: 'Yes. Our teams complete client inductions and work under your permit-to-work and HSE requirements.',
      },
    ],
    training: [
      {
        q: 'Can a course be run at our site?',
        a: 'Yes. Most programs can be delivered on site for a group. Contact us with your numbers and preferred dates.',
      },
      {
        q: 'Do participants receive a certificate?',
        a: 'Each session lists its certificate type. ISO 9712 courses lead to certification subject to meeting the examination and experience requirements.',
      },
      {
        q: 'Are virtual sessions live?',
        a: 'Yes. Virtual and hybrid sessions are instructor-led in real time, not pre-recorded.',
      },
      {
        q: 'Are courses offered in French?',
        a: 'Selected programs can be delivered in French. Ask when you enquire.',
      },
    ],
    rental: [
      {
        q: 'How much does hire cost?',
        a: 'Rates depend on the equipment, hire period and location. We confirm pricing in a written quote.',
      },
      {
        q: 'Can you deliver to site?',
        a: 'Yes. Delivery and collection can be arranged and are included in your quote.',
      },
      {
        q: 'Can an operator come with the equipment?',
        a: 'Yes. A technician can operate the equipment and report the results if you prefer.',
      },
    ],
    contact: [
      {
        q: 'How quickly will you reply?',
        a: 'Within one business day, Monday to Friday, Australian Eastern time.',
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes. We regularly work under confidentiality agreements and can sign yours before we discuss details.',
      },
      {
        q: 'Can I request a quote without full drawings?',
        a: 'Yes. Send what you have and we will tell you what else is needed for a firm price.',
      },
    ],
  },
  legal: {
    updated: 'Last updated {date}',
    reviewNotice: 'This policy is a draft pending legal review.',
    privacy: {
      title: 'Privacy policy',
      sections: [
        {
          heading: 'Who we are',
          body: [
            'MBSC Australia Pty Ltd ("we", "us") handles personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth). This policy explains how we handle personal information collected through this website.',
          ],
        },
        {
          heading: 'What we collect',
          body: [
            'When you send an enquiry we collect your name and email address, and any company name, phone number, topic, reference and message you provide. You can also phone or email us instead, and you do not need to identify yourself to ask a general question.',
            'Our hosting provider records technical information such as your IP address, browser type and the pages you request, to deliver and protect the site. Vercel Web Analytics and Speed Insights measure visits and page performance without cookies and without identifying individual visitors.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'This website does not set cookies. The map on our contact page loads only if you choose to load it; Google may then set cookies under its own privacy policy.',
          ],
        },
        {
          heading: 'How we use it',
          body: [
            'We use your details only to respond to your enquiry, prepare a quote or proposal, and keep a record of our correspondence. We do not sell personal information or use it for unrelated marketing.',
          ],
        },
        {
          heading: 'Who we share it with',
          body: [
            'Our website is hosted by Vercel Inc. Enquiries are sent by email through Zoho ZeptoMail and received in Zoho Mail (Zoho Corporation). These providers process data on our behalf, and your details are likely to be stored or processed in the United States. We take reasonable steps to ensure they protect it. We do not otherwise disclose your information unless the law requires it.',
          ],
        },
        {
          heading: 'How long we keep it',
          body: [
            'We keep enquiry records for as long as needed to respond and to meet our legal and business record-keeping obligations, then delete them.',
          ],
        },
        {
          heading: 'Access, correction and complaints',
          body: [
            'You can ask to access or correct your personal information by emailing {email}. If you have a privacy complaint, contact us first and we aim to respond within 30 days. If you are not satisfied with our response you can contact the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au or on 1300 363 992.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of use',
      sections: [
        {
          heading: 'Using this site',
          body: [
            'By using this website you agree to these terms. If you do not agree, please do not use the site.',
          ],
        },
        {
          heading: 'Information only',
          body: [
            'Content on this site is general information about our services. It is not engineering advice for a specific situation. Always obtain advice for your project before acting on it.',
          ],
        },
        {
          heading: 'Training schedule',
          body: [
            'Training dates are indicative and may change. A booking is confirmed only when we confirm it in writing.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'Text and graphics on this site belong to MBSC Australia Pty Ltd. Third-party names and logos are trademarks of their respective owners. Photographs credited to third parties remain the property of their owners.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'To the extent permitted by law, we are not liable for loss arising from use of this website. Nothing in these terms excludes rights you have under the Australian Consumer Law.',
          ],
        },
        {
          heading: 'Governing law',
          body: ['These terms are governed by the laws of Victoria, Australia.'],
        },
      ],
    },
  },
};

export type UI = typeof en;
