# Content guide

Everything editable lives under `src/`. After any change run `npm run build`; it validates content and fails with a clear message if something is missing or malformed.

## Company details

`src/data/site.ts`. Phone, email, address, hours, LinkedIn URL and the ISO 9001 certificate live here. Fields set to `null` are hidden on the site until filled in (street address, ABN, LinkedIn, ISO 9001). Headline statistics are numeric so they can animate; update `basisDate` when you update the numbers.

## UI text

`src/i18n/en.ts` is the source of truth. `src/i18n/fr.ts` must contain exactly the same keys; the build fails otherwise. Placeholders like `{year}` or `{phone}` must appear in both languages.

## Services

One Markdown file per service per language: `src/content/services/en/<slug>.md` and `src/content/services/fr/<slug>.md`. The frontmatter holds the title, short description, capabilities, three-step process and deliverables; the body is the overview text. Keep the `slug` identical in both languages. Allowed slugs are listed in `src/lib/content.ts`.

## Case studies

`src/content/projects/{en,fr}/<slug>.md`. Required fields: `title`, `sector` (`oilGas`, `mining`, `civil`, `marine`), `location`, `summary`, `challenge`, `approach` (list), `outcome`, `image`, `imageAlt`. Optional: `client` (omit to show "Confidential operator"), `year`, `facts`, `services` (links to service slugs), `featured` (shows on the home page; keep three featured). Photos go in `src/assets/images/` and are referenced with a relative path.

## Training calendar

`src/content/calendars/<year>.json`. Each session has `start` and `end` as `YYYY-MM-DD` (or `null` for "dates on request"), a `month`, and `category`, `delivery`, `location`, `certificate` codes from `src/lib/content.ts` and `src/lib/calendar-model.ts`. The build rejects sessions whose month does not match their start date.

To create next year's calendar from an existing one:

```bash
npm run calendar:year -- 2028 2029
```

Sessions keep their ISO week and weekday, so a Monday-to-Friday course stays Monday to Friday. Review the output, then adjust individual dates as needed. The page at `/training` shows the current year by default; other years get `/training/<year>`.

## Client logos

`src/content/clients.json`. Add the SVG to `src/assets/logos/clients/` and set `confirmed: true` only for organisations MBSC has actually done work for. The logo strip appears once at least three clients are confirmed.

## Testimonials

`src/content/testimonials.json`. Entries with `approved: false` are samples and never show in production. Replace them with real quotes, attribute them to a role and organisation the client has agreed to, and set `approved: true`.

## Team

`src/content/team.json`. Entries with `placeholder: true` are not rendered. Add `photo` (in `src/assets/images/`) or leave it out to show initials.

## Photos

Run `node scripts/fetch-photos.mjs` to download the Unsplash photos listed in it; credits are written to `src/data/credits.json` and shown at `/credits`. Add MBSC's own photos to `src/assets/images/` directly (JPEG, at least 1600 px wide).

## Logo

`src/assets/logo/mbsc-roundel.svg` is the vector master. If the logo changes, replace `src/assets/logo/logo-source.jpg` and run `node scripts/vectorise-logo.mjs && node scripts/make-brand-assets.mjs` to regenerate the PNGs, favicons and social card.
