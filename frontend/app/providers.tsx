'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextIntlClientProvider } from 'next-intl';
import { lightThemeOptions, darkThemeOptions } from './config/theme';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <ProvidersInner locale={locale} messages={messages}>
        {children}
      </ProvidersInner>
    </NextThemesProvider>
  );
}

function ProvidersInner({ children, locale, messages }: ProvidersProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const muiTheme = useMemo(
    () => createTheme(resolvedTheme === 'dark' ? darkThemeOptions : lightThemeOptions),
    [resolvedTheme]
  );

  // Pour éviter un flash ou une incohérence lors du rendu initial
  if (!mounted) return <div style={{ visibility: 'hidden' }}>{children}</div>;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </MuiThemeProvider>
  );
}
