/**
 * BPS format - http://www.investopedia.com/terms/b/basispoint.asp
 */
import stringIncludes from '../../core/utils/string-includes';
import isFiniteNumber from '../../core/utils/is-finite-number';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import multiplyByPowerOfTen from '../../core/utils/multiply-by-power-of-ten';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../format/number-to-formatted-number/number-to-formatted-number';

const bpsFormatter: NumerableFormatter = {
    name: 'bps',
    regexps: {
        format: /(BPS)/,
        unformat: /(BPS)/,
    },
    format: (number, pattern, options) => {
        const bpsSpace = stringIncludes(pattern, ' BPS') ? ' ' : '';
        const scaledValue = multiplyByPowerOfTen(number || 0, 4);
        const patternWithoutBPS = pattern.replace(/\s?BPS/, '');
        const formatResult = numberToFormattedNumber(scaledValue, patternWithoutBPS, options);

        if (stringIncludes(formatResult, ')')) {
            const outputAsArray = formatResult.split('');
            outputAsArray.splice(-1, 0, `${bpsSpace}BPS`);
            return outputAsArray.join('');
        } else {
            return formatResult + `${bpsSpace}BPS`;
        }
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(/\s?BPS/, ''), options);
        return isFiniteNumber(number) ? multiplyByPowerOfTen(number, -4) : number;
    },
};

export default bpsFormatter;
