import getLocaleFromPlatformFromSourceCode from './formatter/utils/get-locale-from-platform';

/**
 * Given a language tag (e.g. '**zh**' | '**es**' | '**fr**' | '**en-IN**' | '**zh-Hans**'), returns a NumerableLocale
 * object extracted from the platform Intl.NumberFormat behavior.
 * 
 * This locale object can be used in the numerable functions that support i18n (*format* and *parse*).
 * Example:
 * ```javascript
 * format(12345, '0,0.00', { locale: getLocaleFromPlatform('fr') })
 * ```
 * 
 * <i> Take into account that the returned locale is not complete, and some features like 
 *     'ordinal formatting' won't work. Use this feature only for simple applications that don't require
 *     full support from numeral, and don't target legacy browsers.
 */
const getLocaleFromPlatform = (languageTag: string) => {
    return getLocaleFromPlatformFromSourceCode(languageTag);
};

export default getLocaleFromPlatform;
