# Training calendar runbook

How the training calendar works, what happens by itself each year, and the jobs a person (or an AI agent) must do. Read this before changing anything under `src/content/calendars/`, `src/lib/calendar-*.ts` or `src/lib/holidays.ts`.

## Yearly checklist

Do this **before 1 October** each year, when next year's calendar takes over `/training` (see below). The example adds 2029:

1. **Add the public holidays** for the new year to `src/lib/holidays.ts` (VIC, WA and national, weekdays only). Sources and rules are in the file header. Check WA on [wa.gov.au](https://www.wa.gov.au/service/employment/workplace-arrangements/public-holidays-western-australia) and VIC on [business.vic.gov.au](https://business.vic.gov.au/business-information/public-holidays); WA changes several dates from 2028. The test `public holidays › covers every calendar year` fails until this is done.
2. **Create the calendar** from the previous year:
   ```bash
   npm run calendar:year -- 2028 2029
   ```
   It keeps weekdays and lengths, and warns about weekend and holiday clashes.
3. **Move holiday clashes** to the nearest free slot in the same month:
   ```bash
   npm run calendar:holidays -- 2029            # report only
   npm run calendar:holidays -- 2029 --write    # apply
   ```
   If a session has no free slot in its month, the script stops: decide that one by hand.
4. **Review the dates** with the business owner. Generated dates are a starting point, not a commitment.
5. **Generate the PDFs** once the year is about to lead (on or after the cutover), or whenever the primary year's JSON changes:
   ```bash
   npm run calendar:pdf
   ```
   This writes `public/downloads/mbsc-training-calendar-<year>-{en,fr,ar}.pdf` and `calendar-pdf.json`. Commit them.
6. Run `npm test`, `npm run build` and `npm run test:e2e`, then open a pull request into `integration`. The change reaches the live site with the next release (`integration` → `main`).

Optional: refresh the launch announcement in `src/content/insights/{en,fr,ar}/` (see `training-calendar-2027.md` for the pattern).

## What happens by itself

All of this is decided at build time by `src/lib/calendar-lifecycle.ts`, using **Melbourne time**.

| When                                                       | What visitors see                                                                                                                                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Jan – 30 Sep                                             | The current year leads at `/training`. Later years are at `/training/<year>` (noindex).                                                                                             |
| From 1 Oct (`site.calendar.cutover` in `src/data/site.ts`) | Next year leads at `/training`, with a "now open" strip there and a band on the home page. The current year moves to the back of the tabs and shows **only sessions still to run**. |
| Day after the outgoing year's last session                 | That year's page is no longer built; its URL redirects (307) to `/training`.                                                                                                        |
| 1 Jan                                                      | The "now open" strip and band switch off.                                                                                                                                           |

- Year URLs without a page (the primary year, retired years) redirect with **307, not 308**: a URL like `/training/2027` becomes a page again when that year is outgoing.
- Changes only reach the live site when it rebuilds. `.github/workflows/weekly-rebuild.yml` calls a Vercel deploy hook every Monday (needs the `VERCEL_DEPLOY_HOOK_URL` repository secret, from Vercel › Project › Settings › Git › Deploy Hooks, hook `weekly-rebuild`, branch `main`). It **fails loudly** if the secret is missing. In the browser, finished sessions are hidden by a small script even if the build is a few days old.
- To change the switch date, edit `site.calendar.cutover`. `{ month: 12, day: 31 }` gives the old New Year switch.

## Safety nets

- `scripts/check-dist.mjs` (runs in `npm run build`) fails if a calendar year is neither a page nor a redirect, if a PDF is older than its JSON, or if a page links to a missing `/downloads/` file. A **missing** PDF only warns, and the download button is hidden, so the October cutover never breaks a production build.
- `tests/calendar.test.ts` checks the lifecycle at fixed dates, the Melbourne time zone, and that no future session falls on a public holiday where it runs.
- e2e tests read the same plan (`scripts/calendar-state.mjs`), so they do not need yearly edits.

## Previewing another date

```bash
CALENDAR_TODAY=2027-10-01 npm run build && npm run preview:vercel
```

Builds the site as it will look on that day (Melbourne date). Use it to check a cutover or a retirement before it happens.

## Key files

| File                                                                                     | Role                                             |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `src/content/calendars/<year>.json`                                                      | Sessions (schema in `src/lib/calendar-model.ts`) |
| `src/lib/calendar-lifecycle.ts`                                                          | Primary, outgoing, retired years; build date     |
| `src/lib/holidays.ts`                                                                    | VIC, WA and national public holidays             |
| `src/lib/calendar-pdf.ts`                                                                | PDF file names and freshness check               |
| `src/components/CalendarLaunch.astro`                                                    | "Now open" strip and home band                   |
| `src/views/TrainingView.astro`, `CalendarPrintView.astro`                                | Training page and printable page                 |
| `scripts/calendar-state.mjs`                                                             | The same plan for Node scripts and redirects     |
| `scripts/fix-holiday-clashes.mjs`, `make-calendar-pdf.mjs`, `generate-calendar-year.mjs` | Maintenance scripts                              |
