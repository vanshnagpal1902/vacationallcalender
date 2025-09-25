import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import { HolidayService } from './src/services/holidayService.js';
import dayjs from 'dayjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const holidayService = new HolidayService();
app.locals.dayjs = dayjs;

function parseIntOrDefault(value, defaultValue) {
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

app.get('/', async (req, res) => {
  try {
    const availableCountries = await holidayService.getAvailableCountries();

    const now = dayjs();
    const country = (req.query.country || 'US').toUpperCase();
    const year = parseIntOrDefault(req.query.year, now.year());
    const month = parseIntOrDefault(req.query.month, now.month() + 1); // 1-12

    const holidays = await holidayService.getHolidays(year, country);

    res.render('calendar', {
      title: 'Monthly Vacation Calendar',
      availableCountries,
      country,
      year,
      month,
      holidays,
    });
  } catch (err) {
    res.status(500).send('Error loading calendar');
  }
});

app.get('/quarterly', async (req, res) => {
  try {
    const availableCountries = await holidayService.getAvailableCountries();

    const now = dayjs();
    const country = (req.query.country || 'US').toUpperCase();
    const year = parseIntOrDefault(req.query.year, now.year());
    const qParam = parseIntOrDefault(req.query.q, Math.floor(now.month() / 3) + 1); // 1-4
    const quarter = Math.min(Math.max(qParam, 1), 4);
    const startMonth = (quarter - 1) * 3 + 1; // 1,4,7,10

    const holidays = await holidayService.getHolidays(year, country);

    res.render('calendar', {
      title: 'Quarterly Vacation Calendar',
      availableCountries,
      country,
      year,
      quarter,
      startMonth,
      holidays,
    });
  } catch (err) {
    res.status(500).send('Error loading calendar');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


