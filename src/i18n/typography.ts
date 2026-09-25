/**
 * French typography: a narrow no-break space before ; ! ? » and a no-break space before : and
 * after «, so these marks never wrap onto a line of their own. Only existing spaces are
 * replaced, so URLs and times ("7 h – 17 h") are untouched.
 */
export function frenchTypography(s: string): string {
  return s
    .replace(/ ([;!?»])/g, ' $1')
    .replace(/ :/g, ' :')
    .replace(/« /g, '« ');
}

/** Apply a string transform to every string in a nested dictionary. */
export function mapStrings<T>(value: T, f: (s: string) => string): T {
  if (typeof value === 'string') return f(value) as T;
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, f)) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, f)])) as T;
  return value;
}
