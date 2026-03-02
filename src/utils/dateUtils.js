import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";
import { enUS } from "date-fns/locale/en-US";

/** Map language codes to date-fns locales */
const localeMap = {
  es: es,
  en: enUS,
};

/**
 * Format a date in a human-readable format, locale-aware.
 * @param {Date|string} date The date to format
 * @param {string} [lang='es'] Language code ('es' or 'en')
 * @param {string} [formatStr] The format string (default varies by lang)
 * @returns {string} The formatted date
 */
export function formatDate(date, lang = "es", formatStr) {
  if (!date) return "";
  
  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  
  // Default format per language
  const defaultFormat = lang === "es" ? "d 'de' MMMM, yyyy" : "MMMM d, yyyy";
  const fmt = formatStr || defaultFormat;
  
  return format(dateObj, fmt, { locale: localeMap[lang] || localeMap.es });
}

/**
 * Check if a date is in the future
 * @param {Date|string} date The date to check
 * @returns {boolean} True if the date is in the future
 */
export function isFutureDate(date) {
  if (!date) return false;
  
  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  
  return dateObj > new Date();
}

/**
 * Check if a date is in the past
 * @param {Date|string} date The date to check
 * @returns {boolean} True if the date is in the past
 */
export function isPastDate(date) {
  if (!date) return false;
  
  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  
  return dateObj < new Date();
}
