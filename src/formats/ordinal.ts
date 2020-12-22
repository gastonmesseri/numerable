import stringIncludes from '../core/utils/string-includes';
import { NumerableFormatType } from '../core/types/numerable-format-type';
import numberToFormattedNumber from '../format-number/number-to-formatted-number/number-to-formatted-number';

const ordinalFormat: NumerableFormatType = {
    name: 'ordinal',
    regexps: {
        format: /(o)/,
    },
    format: (number, pattern, options) => {
        const resolvedValue = number || 0;
        const patternWithoutOrdinal = pattern.replace(/\s?o/, '');
        const ordinalSpace = stringIncludes(pattern, ' o') ? ' ' : '';
        const ordinal = options.locale.ordinal?.(resolvedValue) || '';
        const formatResult = numberToFormattedNumber(resolvedValue, patternWithoutOrdinal, options);
        return formatResult + (!!ordinal ? ordinalSpace + ordinal : '');
    }
};

export default ordinalFormat;
