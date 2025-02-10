// app/[locale]/page.tsx
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/app/config/i18n";

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await Promise.resolve(params);
  const tGlobal = await getTranslations({ locale, namespace: "global" });
  const tPage = await getTranslations({ locale, namespace: "home" });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{tGlobal("welcome", { defaultValue: "Bienvenue sur mon application!" })}</h1>
      <h2>{tPage("title", { defaultValue: "Home Page" })}</h2>
      <p>{tPage("description", { defaultValue: "This is the home page" })}</p>
    </main>
  );
}
