import stringIncludes from '../../core/utils/string-includes';
import { patternReplace } from '../utils/pattern-regexp-utils';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import multiplyByPowerOfTen from '../../core/utils/multiply-by-power-of-ten';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const percentageFormatter: NumerableFormatter = {
    name: 'percentage',
    regexps: {
        format: /%!?/,
        unformat: /%/,
    },
    format: (number, pattern, options) => {
        const resolvedValue = number || 0;
        const hasNotScalePercentageSymbolInPattern = stringIncludes(pattern, '%!');
        const scaledValue = options.scalePercentage && !hasNotScalePercentageSymbolInPattern
            ? multiplyByPowerOfTen(resolvedValue, 2)
            : resolvedValue;
        const patternWithEscapedPercentage = patternReplace(pattern, /%!?/, `'#%#'`);
        const formatResult = numberToFormattedNumber(scaledValue, patternWithEscapedPercentage, options);
        return formatResult.replace('#%#', '%');
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(/\s?%/, ''), options);
        return number && options.scalePercentage ? multiplyByPowerOfTen(number, -2) : number;
    },
};

export default percentageFormatter;
