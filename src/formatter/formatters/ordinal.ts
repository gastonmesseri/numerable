import { patternReplace } from '../utils/pattern-regexp-utils';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const ordinalFormatter: NumerableFormatter = {
    name: 'ordinal',
    regexps: {
        format: /(o)/,
    },
    format: (number, pattern, options) => {
        const resolvedValue = number || 0;
        const localizedOrdinal = options.locale.ordinal?.(resolvedValue) || '';
        const patternWithEscapedOrdinal = patternReplace(pattern, /o/, `'#o#'`);
        const formatResult = numberToFormattedNumber(resolvedValue, patternWithEscapedOrdinal, options);
        return formatResult.replace('#o#', localizedOrdinal);
    }
};

export default ordinalFormatter;
