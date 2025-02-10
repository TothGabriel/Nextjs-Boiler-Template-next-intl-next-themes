import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/app/config/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Exclure les fichiers statiques et les images des flags
  if (
    pathname.startsWith('/_next') || // Fichiers de Next.js
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/static') || // Fichiers statiques
    pathname.startsWith('/flags') || // Drapeaux dans `public/flags/`
    pathname.endsWith('.png') || // Exclure les images PNG (peut être généralisé à d'autres formats)
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // Récupérer la locale depuis l'URL (premier segment)
  const segments = pathname.split('/');
  const locale = segments[1];

  // Vérifier si la locale est supportée
  if (!SUPPORTED_LOCALES.includes(locale)) {
    // Redirige vers la locale par défaut
    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

// ✅ Mise à jour du `matcher` pour exclure les fichiers statiques
export const config = {
  matcher: [
    '/', // Redirige la home sans locale
    '/((?!_next|api|static|flags|favicon.ico).*)' // Exclut les fichiers statiques, API et flags
  ]
};
