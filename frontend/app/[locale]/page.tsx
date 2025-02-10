'use client';

import { useTranslations } from 'next-intl';
import LocaleToggle from '@/app/components/LocaleToggle';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{t('welcome', { defaultValue: 'Bienvenue sur mon app!' })}</h1>
      <LocaleToggle />
      <ThemeToggle />
    </main>
  );
}
