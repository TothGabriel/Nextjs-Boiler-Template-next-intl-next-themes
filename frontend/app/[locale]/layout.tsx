// app/[locale]/layout.tsx
import { Providers } from "@/app/providers";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/common/Navbar";
import { routing } from "@/app/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import type { Locale } from "@/app/config/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Attendez explicitement les params avant de déstructurer
  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Définit la locale pour la requête (ici, on passe seulement la locale en string)
  setRequestLocale(locale);

  // Récupère les messages configurés via i18n/request.ts
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>Mon Application</title>
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          <Navbar locale={locale} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
