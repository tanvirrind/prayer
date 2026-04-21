import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import { formatInTimeZone } from 'date-fns-tz';

const methodMap: Record<string, any> = {
  "saudi-arabia": CalculationMethod.UmmAlQura(),
  "united-states": CalculationMethod.NorthAmerica(),
  "canada": CalculationMethod.NorthAmerica(),
  "united-kingdom": CalculationMethod.MuslimWorldLeague(),
  "pakistan": CalculationMethod.Karachi(),
  "india": CalculationMethod.Karachi(),
  "bangladesh": CalculationMethod.Karachi(),
  "egypt": CalculationMethod.Egyptian(),
  "turkey": CalculationMethod.Turkey(),
  "malaysia": CalculationMethod.Singapore(),
  "indonesia": CalculationMethod.Singapore(),
};

function getMethod(countrySlug: string) {
  return methodMap[countrySlug] || CalculationMethod.MuslimWorldLeague();
}

function formatTime(date: Date, timezone: string) {
  return formatInTimeZone(date, timezone, 'HH:mm');
}

export function generateDailyTimings(lat: number, lng: number, timezone: string, countrySlug: string, date: Date = new Date()) {
  const coordinates = new Coordinates(lat, lng);
  const params = getMethod(countrySlug);
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  const sunnahTimes = new SunnahTimes(prayerTimes);
  

  return {
    timings: {
      Fajr: formatTime(prayerTimes.fajr, timezone),
      Sunrise: formatTime(prayerTimes.sunrise, timezone),
      Dhuhr: formatTime(prayerTimes.dhuhr, timezone),
      Asr: formatTime(prayerTimes.asr, timezone),
      Maghrib: formatTime(prayerTimes.maghrib, timezone),
      Isha: formatTime(prayerTimes.isha, timezone),
      Imsak: formatTime(prayerTimes.fajr, timezone), // Imsak is generally Fajr time
      Midnight: formatTime(sunnahTimes.middleOfTheNight, timezone),
      Tahajjud: formatTime(sunnahTimes.lastThirdOfTheNight, timezone),
    },
    meta: {
      method: { name: "Offline Calculation (Adhan)" },
      timezone: timezone
    }
  };
}

export function generateMonthlyCalendar(lat: number, lng: number, timezone: string, countrySlug: string) {
  const calendar = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dailyData = generateDailyTimings(lat, lng, timezone, countrySlug, date);
    
    calendar.push({
      timings: dailyData.timings,
      date: {
        gregorian: {
          day: i.toString().padStart(2, '0'),
          month: { en: date.toLocaleString('en-US', { month: 'long' }) },
          year: year.toString()
        }
      }
    });
  }
  return calendar;
}