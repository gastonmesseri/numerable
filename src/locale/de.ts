/**
 * numerable.js locale configuration
 * code: de
 * language: German
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'de',
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: '||||||Mio.|||Mrd.|||Bio.',
    ordinal: () => '.',
};

export default locale;
