/**
 * numerable.js locale configuration
 * code: ru
 * language: Russian
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'ru',
    delimiters: {
        thousands: ' ',
        decimal: ',',
    },
    abbreviations: '|||тыс.|||млн.|||млрд.|||трлн.',
    ordinal: () => '.',
};

export default locale;
