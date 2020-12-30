/**
 * numerable.js locale configuration
 * code: it-ch
 * language: Italian
 * region: Switzerland
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'it-ch',
    delimiters: {
        thousands: '’',
        decimal: '.',
    },
    abbreviations: '||||||Mio|||Mrd|||Bln',
    ordinal: _ => 'º',
};

export default locale;
