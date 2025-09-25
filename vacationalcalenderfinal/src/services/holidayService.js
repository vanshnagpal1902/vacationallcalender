import axios from 'axios';

const NAGER_BASE = 'https://date.nager.at/api/v3';

export class HolidayService {
  constructor() {
    this.cache = new Map(); // key: `${year}-${country}` => { expiresAt: number, data: [] }
    this.countriesCache = { expiresAt: 0, data: [] };
    this.ttlMs = 12 * 60 * 60 * 1000; // 12 hours
  }

  async getAvailableCountries() {
    const now = Date.now();
    if (this.countriesCache.data.length && this.countriesCache.expiresAt > now) {
      return this.countriesCache.data;
    }
    const url = `${NAGER_BASE}/AvailableCountries`;
    const { data } = await axios.get(url, { timeout: 15000 });
    const countries = data
      .map((c) => ({ code: c.countryCode, name: c.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
    this.countriesCache = { data: countries, expiresAt: now + this.ttlMs };
    return countries;
  }

  async getHolidays(year, countryCode) {
    const key = `${year}-${countryCode}`;
    const now = Date.now();
    const cached = this.cache.get(key);
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }
    const url = `${NAGER_BASE}/PublicHolidays/${year}/${countryCode}`;
    const { data } = await axios.get(url, { timeout: 15000 });
    // Normalize: date -> YYYY-MM-DD, keep localName/name, types, etc.
    const normalized = data.map((h) => ({
      date: h.date, // YYYY-MM-DD
      localName: h.localName,
      name: h.name,
      countryCode: h.countryCode,
      fixed: h.fixed,
      global: h.global,
      counties: h.counties || [],
      launchYear: h.launchYear || null,
      types: h.types || [],
    }));
    this.cache.set(key, { data: normalized, expiresAt: now + this.ttlMs });
    return normalized;
  }
}


