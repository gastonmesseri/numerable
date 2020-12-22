import isNil from '../../core/utils/is-nil';
import BUILT_IN_FORMATS from '../../formats';
import isFunction from '../../core/utils/is-function';
import isNanNumber from '../../core/utils/is-nan-number';
import resolveFormatOptions from '../utils/resolve-format-options';
import formattedStringToNumber from './utils/formatted-string-to-number';
import { NumerableFormatNumberOptions, ResolvedNumerableFormatNumberOptions } from '../types/format-number-options';

const getUnformatFunctionIfMatch = (input: string, resolvedOptions: ResolvedNumerableFormatNumberOptions) => {
    for (const formatDefinition of BUILT_IN_FORMATS) {
        const matcher = formatDefinition.regexps.unformat;
        if (!matcher) continue;
        const matcherResult = isFunction(matcher) ? matcher(input, resolvedOptions) : input.match(matcher);
        if (matcherResult) return formatDefinition.unformat;
    }
};

const parse = (input: string | number, options?: NumerableFormatNumberOptions) => {
    const resolvedOptions = resolveFormatOptions(options);

    let value;

    if (isNil(input) || isNanNumber(input)) {
        value = null;
    } else if (typeof input === 'number') {
        // Handles negative zero
        value = input === 0 ? 0 : input;
    } else if (typeof input === 'string') {
        if (resolvedOptions.zeroFormat && input === resolvedOptions.zeroFormat) {
            value = 0;
        } else if (resolvedOptions.nullFormat && input === resolvedOptions.nullFormat) {
            value = null;
        } else {
            const unformatFunctionFromFormats = getUnformatFunctionIfMatch(input, resolvedOptions);
            const unformatFunction = unformatFunctionFromFormats || formattedStringToNumber;
            value = unformatFunction(input, resolvedOptions);
        }
    } else {
        const result = +input;
        value = result === 0 ? result : (result || null);
    }

    return value;
};

export default parse;
