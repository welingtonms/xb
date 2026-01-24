import { createContext } from '@lit/context';

/**
 * @typedef {Object} I18nTranslations
 * @property {Record<string | number, { abbr: string; label: string }> | null} months
 * @property {Record<string | number, { abbr: string; label: string }> | null} weekDays
 * @property {Record<string, string>} presets
 * @property {Object} relativeDates
 * @property {string} relativeDates.today
 * @property {string} relativeDates.yesterday
 * @property {string} relativeDates.tomorrow
 */

/**
 * @typedef {Object} I18nContextValue
 * @property {string} locale
 * @property {string} [timeZone]
 * @property {string} [weekStart]
 * @property {string} [dateFormat]
 * @property {I18nTranslations} translations
 */

export const i18nContext = createContext( 'i18n' );
