/**
 * <i> Default locale
 * 
 * numerable.js locale configuration
 * code: en
 * language: English
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'en',
    delimiters: {
        thousands: ',',
        decimal: '.',
    },
    abbreviations: '|||K|||M|||B|||T',
    ordinal: (number) => {
        const b = number % 10;
        return (~~(number % 100 / 10) === 1)
            ? 'th'
            : (b === 1)
                ? 'st'
                : (b === 2)
                    ? 'nd'
                    : (b === 3)
                        ? 'rd'
                        : 'th';
    },
};

export default locale;
