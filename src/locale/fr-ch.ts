/**
 * numerable.js locale configuration
 * code: fr-ch
 * language: French
 * region: Switzerland
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'fr-ch',
    delimiters: {
        thousands: ' ',
        decimal: ',',
    },
    abbreviations: '|||k|||M|||Md|||Bn',
    ordinal: number => number === 1 ? 'er' : 'e',
};

export default locale;
