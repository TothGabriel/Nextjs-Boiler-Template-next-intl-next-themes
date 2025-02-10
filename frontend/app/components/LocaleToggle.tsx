'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LocaleToggle() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: string) => {
    // Le premier segment de l'URL correspond à la locale
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>Français</button>
    </div>
  );
}
