import { getRequestConfig } from 'next-intl/server';
import { routing, isValidLocaleRoute } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!isValidLocaleRoute(locale)) {
        locale = routing.defaultLocale;
    }


    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});