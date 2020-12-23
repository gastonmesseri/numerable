/**
 * numerable.js locale configuration
 * code: fr
 * language: French
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'fr',
    delimiters: {
        thousands: ' ',
        decimal: ',',
    },
    abbreviations: '|||k|||M|||Md|||Bn',
    ordinal: number => number === 1 ? 'er' : 'e',
};

export default locale;
