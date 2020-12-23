/**
 * numerable.js locale configuration
 * code: id
 * language: Indonesian
 */
import { NumerableLocale } from './types/numerable-locale';

const locale: NumerableLocale = {
    code: 'id',
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: '|||rb|||jt|||M|||T',
    ordinal: () => '.',
};

export default locale;
