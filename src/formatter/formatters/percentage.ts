import { NumerableFormatter } from '../../core/types/numerable-formatter';
import multiplyByPowerOfTen from '../../core/utils/multiply-by-power-of-ten';
import { patternIncludes, patternReplace } from '../utils/pattern-regexp-utils';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const percentageFormatter: NumerableFormatter = {
    name: 'percentage',
    regexps: {
        format: /%!?/,
        unformat: /%/,
    },
    format: (number, pattern, options) => {
        const hasNotScalePercentageSymbolInPattern = patternIncludes(pattern, '%!');
        const scaledValue = options.scalePercentage && !hasNotScalePercentageSymbolInPattern ? multiplyByPowerOfTen(number, 2) : number;
        const patternWithEscapedPercentage = patternReplace(pattern, /%!?/, `'ɵ%ɵ'`);
        const formatResult = numberToFormattedNumber(scaledValue, patternWithEscapedPercentage, options);
        return formatResult.replace('ɵ%ɵ', '%');
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(/\s?%/, ''), options);
        return number && options.scalePercentage ? multiplyByPowerOfTen(number, -2) : number;
    },
};

export default percentageFormatter;
