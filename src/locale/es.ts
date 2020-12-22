/**
 * numerable.js locale configuration
 * code: es
 * language: Spanish
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'es',
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: '|||mil|||M|||mil M|||B',
    ordinal: () => 'º',
};

export default locale;
