/**
 * numerable.js locale configuration
 * code: ja
 * language: Japanese
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'ja',
    delimiters: {
        thousands: ',',
        decimal: '.',
    },
    abbreviations: '||||万||||億||||兆',
    ordinal: () => '.',
    digitGroupingStyle: [4],
};

export default locale;
