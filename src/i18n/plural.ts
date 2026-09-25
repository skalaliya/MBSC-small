/**
 * Count-dependent text. English and French need `one` and `other`; Arabic also has `two`
 * (dual), `few` (3–10) and `many` (11–99). Intl.PluralRules picks the category.
 */
export interface Plural {
  zero?: string;
  one: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}
export const plural = (forms: Plural): Plural => forms;
export const isPlural = (v: unknown): v is Plural =>
  !!v && typeof v === 'object' && 'one' in v && 'other' in v;
