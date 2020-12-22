/**
 * numerable.js locale configuration
 * code: en-in
 * language: English
 * region: India
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'en-in',
    delimiters: {
        thousands: ',',
        decimal: '.',
    },
    abbreviations: '|||T||L||Cr|||TCr||LCr',
    digitGroupingStyle: [3, 2],
};

export default locale;
