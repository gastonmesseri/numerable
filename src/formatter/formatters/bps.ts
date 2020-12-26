/**
 * Basis point format (BPS) 
 * <i> See https://en.wikipedia.org/wiki/Basis_point
 */
import isFiniteNumber from '../../core/utils/is-finite-number';
import { patternReplace } from '../utils/pattern-regexp-utils';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import multiplyByPowerOfTen from '../../core/utils/multiply-by-power-of-ten';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const bpsFormatter: NumerableFormatter = {
    name: 'bps',
    regexps: {
        format: /BPS/,
        unformat: /BPS/,
    },
    format: (number, pattern, options) => {
        const scaledValue = multiplyByPowerOfTen(number || 0, 4);
        const patternWithEscapedBPS = patternReplace(pattern, /BPS/, `'#BPS#'`);
        const formatResult = numberToFormattedNumber(scaledValue, patternWithEscapedBPS, options);
        return formatResult.replace('#BPS#', 'BPS');
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(/\s?BPS/, ''), options);
        return isFiniteNumber(number) ? multiplyByPowerOfTen(number, -4) : number;
    },
};

export default bpsFormatter;
