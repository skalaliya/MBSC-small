export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export const SERVICE_SLUGS = [
  'oil-gas-engineering',
  'technical-training',
  'digital-solutions',
  'mining-geology',
  'safety-compliance',
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const SECTORS = ['oilGas', 'mining', 'civil', 'marine'] as const;
export type Sector = (typeof SECTORS)[number];

/** Display order when listing projects: oil & gas, then mining, then the rest. */
export const SECTOR_ORDER: Record<Sector, number> = { oilGas: 0, mining: 1, civil: 2, marine: 3 };

export const TOPICS = ['general', 'oilGas', 'training', 'digital', 'mining', 'safety', 'rental'] as const;
export type Topic = (typeof TOPICS)[number];

export const CATEGORIES = ['oilGas', 'geoscience', 'geology', 'mining', 'crossDiscipline', 'digitalAI'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_DOT: Record<Category, string> = {
  oilGas: 'bg-cat-oilgas',
  geoscience: 'bg-cat-geoscience',
  geology: 'bg-cat-geology',
  mining: 'bg-cat-mining',
  crossDiscipline: 'bg-cat-cross',
  digitalAI: 'bg-cat-digital',
};

export const DELIVERY = ['onsite', 'virtual', 'hybrid'] as const;
export type Delivery = (typeof DELIVERY)[number];

export const CERTIFICATES = [
  'technicalCertification',
  'professionalProgram',
  'bespokeTraining',
  'corporateWorkshop',
  'iso9712Certification',
  'associateProgram',
] as const;
export type Certificate = (typeof CERTIFICATES)[number];
