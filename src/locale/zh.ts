/**
 * numerable.js locale configuration
 * code: zh
 * language: Chinese
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'zh',
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: '||||万||||亿||||万亿',
    ordinal: () => '.',
    digitGroupingStyle: [4],
};

export default locale;
