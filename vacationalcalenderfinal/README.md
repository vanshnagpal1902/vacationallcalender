Vacation Calendar (Node.js + Express + EJS)

A full-stack vacation/holiday calendar with Monthly and Quarterly views. Holidays are fetched dynamically from the public Nager.Date API and support multiple countries.

Features
- Monthly and Quarterly calendar views
- Country selector (multi-country support)
- Dynamic holidays per year via API (no hardcoding)
- Week highlighting rules:
  - Exactly 1 holiday in a week → light green
  - More than 2 holidays in a week → dark green
  - Exactly 2 holidays → no highlight
- Optional focus of a specific holiday date (YYYY-MM-DD)

Tech
- Node.js, Express, EJS, express-ejs-layouts
- Axios for HTTP, Day.js for dates

Setup
1. Install Node.js 18+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in dev (auto-restart):
   ```bash
   npm run dev
   ```
   Or start normally:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000`.

Usage
- Monthly view: `GET /?country=US&year=2025&month=9&focusDate=2025-09-01`
- Quarterly view: `GET /quarterly?country=US&year=2025&q=3&focusDate=2025-07-04`

Parameters
- `country`: ISO 3166-1 alpha-2 code (e.g., US, GB, IN); defaults to US
- `year`: year (defaults to current year)
- `month`: 1-12 (Monthly view only; defaults to current month)
- `q`: 1-4 (Quarterly view only; defaults to current quarter)
- `focusDate`: `YYYY-MM-DD` of a specific holiday to emphasize

Notes
- Holidays are cached in-memory for 12 hours per (year,country). Country list is cached 12 hours.
- Week starts on Monday in the grid.

Credits
- Holidays API: Nager.Date (`https://date.nager.at`)

# vacationallcalender
