'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const flagIcons: Record<string, string> = {
  en: '/flags/en.png', // Assurez-vous que ces fichiers existent dans public/flags/
  fr: '/flags/fr.png'
};

export default function LocaleToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const t = useTranslations('global.locale'); // ✅ Récupération des traductions

  // Extraction de la locale depuis l'URL (premier segment)
  const segments = pathname.split('/');
  const currentLocale = segments[1] || 'en';
  const [locale, setLocale] = useState(currentLocale);

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
    setLocale(newLocale);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="locale-select-label">{t('languageLabel')}</InputLabel>
      <Select
        labelId="locale-select-label"
        value={locale}
        label={t('languageLabel')}
        onChange={(event) => switchLocale(event.target.value)}
        sx={{
          bgcolor: resolvedTheme === 'dark' ? '#333' : '#fff',
          color: resolvedTheme === 'dark' ? '#fff' : '#000',
          borderRadius: 2
        }}
      >
        {Object.entries(flagIcons).map(([lang, flagSrc]) => (
          <MenuItem key={lang} value={lang}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={flagSrc} alt={`${lang} flag`} width={24} height={16} />
              <Typography>{lang === 'en' ? t('english') : t('french')}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
