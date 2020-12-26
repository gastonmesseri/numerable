import isNaNNumber from '../../core/utils/is-nan-number';
import isFiniteNumber from '../../core/utils/is-finite-number';
import { patternReplace } from '../utils/pattern-regexp-utils';
import multiplyByPowerOfTen from '../../core/utils/multiply-by-power-of-ten';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import splitStringInTwoParts from '../../core/utils/split-string-in-two-parts';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const exponentialFormatter: NumerableFormatter = {
    name: 'exponential',
    regexps: {
        format: /[eE][+-][0-9]+/,
        unformat: /[eE][+-][0-9]+/,
    },
    format: (number, pattern, options) => {
        const exponential = typeof number === 'number' && !isNaNNumber(number) ? number.toExponential() : '0e+0';
        const parts = splitStringInTwoParts(exponential, 'e');
        const patternWithoutExponential = patternReplace(pattern, /e[+|-]{1}0/i, '');
        const formatResult = numberToFormattedNumber(+parts[0], patternWithoutExponential, options);
        return formatResult + 'e' + parts[1];
    },
    unformat: (string, options) => {
        const value = formattedStringToNumber(string.replace(/e[+-]{1}[0-9]{1,3}/i, ''), options);
        const powerOfTenExponent = +(string.match(/e([+-]{1}[0-9]{1,3})/i)?.[1] || '0');
        return isFiniteNumber(value) ? multiplyByPowerOfTen(value, powerOfTenExponent) : value;
    },
};

export default exponentialFormatter;
