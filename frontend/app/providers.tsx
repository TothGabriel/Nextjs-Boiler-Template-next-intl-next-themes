// app/providers.tsx
'use client';

import { useState, useEffect, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { lightTheme, darkTheme } from "@/app/config/theme";

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Évite le rendu côté client tant que le composant n'est pas monté
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeSync locale={locale} messages={messages}>
        {children}
      </ThemeSync>
    </NextThemesProvider>
  );
}

function ThemeSync({ children, locale, messages }: ProvidersProps) {
  const { theme } = useTheme();
  const appliedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </MuiThemeProvider>
  );
}
