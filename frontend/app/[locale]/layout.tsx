import { Providers } from "@/app/providers";
import { DEFAULT_LOCALE } from "@/app/config/i18n";
import { ReactNode } from "react";
import fs from "fs/promises";
import path from "path";
import {Navbar}  from '@/app/components/common/Navbar';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string; page?: string }>; // ✅ `params` est maintenant une `Promise`
}

/**
 * Charge le fichier de traduction pour un namespace donné (async).
 */
async function loadNamespaceMessages(locale: string, namespace: string) {
  try {
    const filePath = path.join(process.cwd(), `public/locales/${locale}/${namespace}.json`);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn(`⚠️ Fichier de traduction manquant: ${namespace}.json`);
    return {};
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // ✅ Attendre `params` car c'est une `Promise`
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || DEFAULT_LOCALE;
  const pageNamespace = resolvedParams?.page || "home";

  // ✅ Charger les traductions de manière asynchrone
  const globalMessages = await loadNamespaceMessages(locale, "global");
  const pageMessages = await loadNamespaceMessages(locale, pageNamespace);

  const messages = {
    global: globalMessages,
    [pageNamespace]: pageMessages,
  };

  console.log(`✅ Traductions chargées pour "${locale}" - Global et "${pageNamespace}":`, messages);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Mon Application</title>
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
            <Navbar locale={locale}/>
          {children}
        </Providers>
      </body>
    </html>
  );
}

/**
 * Génère les routes statiques en fonction des langues et des pages.
 */
export async function generateStaticParams() {
  const locales = ["en", "fr"];
  const pages = ["home", "about", "contact"]; // ✅ Détection automatique possible ici
  return locales.flatMap((locale) => pages.map((page) => ({ locale, page })));
}
