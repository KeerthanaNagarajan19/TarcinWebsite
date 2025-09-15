// i18n utility functions

// Define locale type
export type Locale = 'en' | 'ta' | 'ar';

export type LocalizedContent = {
  [key in Locale]: string;
};

// Function to get the localized content based on current locale
export const getLocalizedContent = (content: LocalizedContent, locale: Locale): string => {
  return content[locale] || content.en; // Fallback to English
};

// Determine text direction based on locale
export const getTextDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

// Format dates according to the locale
export const formatDate = (date: Date, locale: Locale): string => {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Map our locale codes to Intl locale codes
const localeToIntl = (locale: Locale): string => {
  const map: Record<Locale, string> = {
    en: 'en-US',
    ta: 'ta-IN',
    ar: 'ar-SA',
  };
  return map[locale];
};

// Format numbers according to the locale
export const formatNumber = (num: number, locale: Locale): string => {
  return new Intl.NumberFormat(localeToIntl(locale)).format(num);
};

// Split a text into an array of characters for text animations
export const splitText = (text: string): string[] => {
  return text.split('');
};

// Convert language code to language name
export const localeToLanguageName = (locale: Locale): string => {
  const map: Record<Locale, string> = {
    en: 'English',
    ta: 'தமிழ்', // Tamil
    ar: 'العربية', // Arabic
  };
  return map[locale];
};

// Convert language code to short display name
export const localeToShortDisplay = (locale: Locale): string => {
  const map: Record<Locale, string> = {
    en: 'EN',
    ta: 'TA',
    ar: 'AR',
  };
  return map[locale];
};
