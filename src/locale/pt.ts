/**
 * numerable.js locale configuration
 * code: pt
 * language: Portuguese
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'pt',
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: '|||mil|||mi|||bi|||tri',
    ordinal: () => 'º',
};

export default locale;
