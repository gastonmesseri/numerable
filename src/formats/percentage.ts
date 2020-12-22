import stringIncludes from '../core/utils/string-includes';
import { NumerableFormatType } from '../core/types/numerable-format-type';
import multiplyByPowerOfTen from '../core/utils/multiply-by-power-of-ten';
import formattedStringToNumber from '../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../format-number/number-to-formatted-number/number-to-formatted-number';

const percentageFormat: NumerableFormatType = {
    name: 'percentage',
    regexps: {
        format: /(%)/,
        unformat: /(%)/,
    },
    format: (number, pattern, options) => {
        const percentageSpace = stringIncludes(pattern, ' %') ? ' ' : '';
        const resolvedValue = number || 0;
        const scaledValue = options.scalePercentBy100 ? multiplyByPowerOfTen(resolvedValue, 2) : resolvedValue;
        const patternWithoutPercentage = pattern.replace(/\s?%/, '');
        const formatResult = numberToFormattedNumber(scaledValue, patternWithoutPercentage, options);

        if (stringIncludes(formatResult, ')')) {
            const outputAsArray = formatResult.split('');
            outputAsArray.splice(-1, 0, `${percentageSpace}%`);
            return outputAsArray.join('');
        } else {
            return formatResult + `${percentageSpace}%`;
        }
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(/\s?%/, ''), options);
        return number && options.scalePercentBy100 ? multiplyByPowerOfTen(number, -2) : number;
    },
};

export default percentageFormat;
