// app/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  // Chargez les messages pour "global" et "home"
  const globalMessages = (await import(`@/public/locales/${locale}/global.json`)).default;
  const homeMessages = (await import(`@/public/locales/${locale}/home.json`)).default;
  // Retournez un objet avec les namespaces en tant que clés
  const messages = { global: globalMessages, home: homeMessages };
  return {
    locale,
    messages,
  };
});
