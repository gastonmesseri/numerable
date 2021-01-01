/**
 * numerable.js locale configuration
 * code: it
 * language: Italian
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'it',
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: '||||||Mio|||Mrd|||Bln',
    ordinal: _ => 'º',
};

export default locale;
