// app/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en' as const,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
