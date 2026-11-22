# Notes for AI agents and contributors

Start with `README.md` (stack, commands, where things live) and `docs/CONTENT-GUIDE.md`.

## Training calendar: yearly job

The training calendar needs a person or agent **once a year, before 1 October**. Follow the checklist in [`docs/TRAINING-CALENDAR.md`](docs/TRAINING-CALENDAR.md):

1. Add the new year's VIC, WA and national public holidays to `src/lib/holidays.ts`.
2. `npm run calendar:year -- <previous> <new>`
3. `npm run calendar:holidays -- <new> --write`
4. Have the owner review the dates.
5. `npm run calendar:pdf` (and again whenever the leading year's JSON changes), then commit the PDFs.

Everything else (which year leads `/training`, hiding finished sessions, retiring last year, redirects, promo banners) is automatic. Do not hard-code years in pages, tests or copy: use the calendar plan (`src/lib/calendar-lifecycle.ts`, `scripts/calendar-state.mjs`). Preview any date with `CALENDAR_TODAY=YYYY-MM-DD npm run build`.

## Ground rules

- Run `npm run check`, `npm test`, `npm run build` and `npm run test:e2e` before opening a pull request. Changes go to `main` through pull requests.
- Commits and pull requests carry no AI attribution lines.
- Trust content: no invented figures, testimonials or certification claims; numbers shown on the site come from the data.
- Never write secrets (deploy hook URL, SMTP passwords) into the repository.
