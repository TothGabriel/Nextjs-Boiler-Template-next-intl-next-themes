import Providers from './providers';
import { DEFAULT_LOCALE } from './config/i18n';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  let messages;
  try {
    messages = (await import(`../public/locales/${locale}/common.json`)).default;
  } catch (error) {
    messages = (await import(`../public/locales/${DEFAULT_LOCALE}/common.json`)).default;
  }

  return (
    <html lang={locale}>
      <head>
        <title>Mon App</title>
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// Pour générer statiquement les pages selon les locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}
