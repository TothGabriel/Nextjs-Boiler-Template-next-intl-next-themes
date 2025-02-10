// global.d.ts
import { SUPPORTED_LOCALES } from "@/app/config/i18n";

type Locales = (typeof SUPPORTED_LOCALES)[number];

declare global {
  type Locale = Locales; // Plus besoin d'importer `Locale` ailleurs
}

export {}; // Nécessaire pour éviter les erreurs TypeScript
