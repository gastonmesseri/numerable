import isNil from '../../core/utils/is-nil';
import isString from '../../core/utils/is-string';
import isFunction from '../../core/utils/is-function';
import isNaNNumber from '../../core/utils/is-nan-number';
import { patternRemoveEscapedText } from '../utils/pattern-regexp-utils';
import resolveFormatOptions from '../../formatter/utils/resolve-format-options';
import { NumerableFormatNumberOptions } from '../../formatter/types/format-number-options';
import numberToFormattedNumber from './number-to-formatted-number/number-to-formatted-number';
import { ResolvedNumerableFormatNumberOptions } from '../../formatter/types/resolved-format-number-options';

const getFormatFunctionIfMatch = (pattern: string, resolvedOptions: ResolvedNumerableFormatNumberOptions) => {
    const patternWithoutEscapedText = patternRemoveEscapedText(pattern);
    for (const formatter of resolvedOptions.formatters) {
        const matcher = formatter.regexps.format;
        if (!matcher) continue;
        const matcherResult: boolean = isFunction(matcher) ? matcher(pattern, resolvedOptions) : !!patternWithoutEscapedText.match(matcher);
        if (matcherResult) return formatter.format;
    }
};

const format = (value: number | string | null | undefined, pattern: string | null, options: NumerableFormatNumberOptions): string => {
    try {
        const resolvedValue = isString(value) ? parseFloat(value) : value;
        const resolvedOptions = resolveFormatOptions(options);
        const resolvedPattern = pattern || resolvedOptions.defaultPattern;

        let output: string;

        if (resolvedValue === Infinity || resolvedValue === -Infinity) {
            output = resolvedValue > 0 ? '∞' : '-∞';
        } else if (isNaNNumber(resolvedValue)) {
            return isString(resolvedOptions.nanFormat)
                ? resolvedOptions.nanFormat
                : (isString(resolvedOptions.nullFormat) ? resolvedOptions.nullFormat : '');
        } else if (isNil(resolvedValue)) {
            output = isString(resolvedOptions.nullFormat) ? resolvedOptions.nullFormat : '';
        } else if (resolvedValue === 0 && isString(resolvedOptions.zeroFormat)) {
            output = resolvedOptions.zeroFormat;
        } else {
            // <!> Here value should always be a number
            const resolvedValueAsNumber = resolvedValue || 0;

            const formatFunctionFromFormatters = getFormatFunctionIfMatch(resolvedPattern, resolvedOptions);
            const resolvedFormatFunction = formatFunctionFromFormatters || numberToFormattedNumber;
            output = resolvedFormatFunction(resolvedValueAsNumber, resolvedPattern, resolvedOptions);
        }

        // Ensures that it always returns an string
        return isString(output) ? output : '';
    } catch (_error) {
        return (options as any)?._errorFormat || '';
    }
};

export default format;
