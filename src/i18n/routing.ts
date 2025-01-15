import { defineRouting } from 'next-intl/routing';
import { supportedLocales, defaultLocale, localePrefixs } from '@/i18n';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: supportedLocales,
    defaultLocale,
    localePrefix: {
        mode: 'as-needed',
        prefixes: localePrefixs
    },
    localeCookie: false,
});

export function isValidLocaleRoute(locale: unknown): locale is SupportedLocale {
    return typeof locale === 'string' && routing.locales.some(item => item === locale)
}

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);