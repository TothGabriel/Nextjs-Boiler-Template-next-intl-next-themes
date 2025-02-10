// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function HomePage() {
  // Pour la page "home", on utilise le namespace 'home'
  const tPage = useTranslations('home');
  const tGlobal = useTranslations('global');

  // useEffect(() => {
  //   console.log('🔍 Traductions globales :', tGlobal);
  //   console.log('🔍 Traductions pour la page "home" :', tPage);
  //   console.log("🔍 tGlobal('welcome') renvoie :", tGlobal('welcome', { defaultValue: 'Test Global' }));
  //   console.log("🔍 tPage('title') renvoie :", tPage('title', { defaultValue: 'Test Home Title' }));
  // }, [tGlobal, tPage]);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{tGlobal('welcome', { defaultValue: 'Bienvenue sur mon application!' })}</h1>
      <h2>{tPage('title', { defaultValue: 'Home Page' })}</h2>
      <p>{tPage('description', { defaultValue: 'This is the home page' })}</p>
    </main>
  );
}
