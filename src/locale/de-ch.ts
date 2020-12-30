/**
 * numerable.js locale configuration
 * code: de-ch
 * language: German
 * region: Switzerland
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'de-ch',
    delimiters: {
        thousands: '’',
        decimal: '.',
    },
    abbreviations: '||||||Mio.|||Mrd.|||Bio.',
    ordinal: _ => '.',
};

export default locale;
