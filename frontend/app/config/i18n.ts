// app/config/i18n.ts
export const DEFAULT_LOCALE = 'en' as const;
export const SUPPORTED_LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
