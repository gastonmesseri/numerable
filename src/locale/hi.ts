/**
 * numerable.js locale configuration
 * code: hi
 * language: Hindi
 * numeral system: Devanagari [deva]
 */
import { NumerableLocale } from '../core/types/numerable-locale';

const locale: NumerableLocale = {
    code: 'hi',
    delimiters: {
        thousands: ',',
        decimal: '.',
    },
    abbreviations: '|||हज़ार||लाख||क॰||अ॰||ख॰||नील',
    ordinal: () => '.',
    digitGroupingStyle: [3, 2],
    numeralSystem: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
};

export default locale;
