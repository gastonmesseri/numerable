import isNil from '../../core/utils/is-nil';
import isObject from '../../core/utils/is-object';
import isString from '../../core/utils/is-string';
import isFunction from '../../core/utils/is-function';
import isNaNNumber from '../../core/utils/is-nan-number';
import { NumerableLocale } from '../../locale/types/numerable-locale';
import resolveFormatOptions from '../../formatter/utils/resolve-format-options';
import { NumerableFormatNumberOptions } from '../../formatter/types/format-number-options';
import numberToFormattedNumber from './number-to-formatted-number/number-to-formatted-number';
import { ResolvedNumerableFormatNumberOptions } from '../../formatter/types/resolved-format-number-options';

const getFormatFunctionIfMatch = (pattern: string, resolvedOptions: ResolvedNumerableFormatNumberOptions) => {
    for (const formatter of resolvedOptions.formatters) {
        const matcher = formatter.regexps.format;
        if (!matcher) continue;
        const matcherResult = isFunction(matcher) ? matcher(pattern, resolvedOptions) : pattern.match(matcher);
        if (matcherResult) return formatter.format;
    }
};

export const format = (value: number | string | null | undefined, pattern: string | null, options: NumerableFormatNumberOptions): string => {
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

/**
 * This function only resolves the arguments overload
 */
function formatNumber(value: number | string | null | undefined, pattern: string | null | undefined, options?: NumerableFormatNumberOptions): string;
function formatNumber(value: number | string | null | undefined, options: NumerableFormatNumberOptions): string;
function formatNumber(value: number | string | null | undefined): string;
function formatNumber(
    value: number | string | null | undefined,
    arg2?: string | null | undefined | NumerableFormatNumberOptions,
    arg3?: string | NumerableFormatNumberOptions,
): string {
    const pattern = isString(arg2) ? arg2 : null;
    const options = isObject(arg2) ? arg2 : (isObject(arg3) ? arg3 : {});

    return format(value, pattern, options);
}

export default formatNumber;

interface NumerableFormatNumberWithOptionsOptions extends Omit<NumerableFormatNumberOptions, 'locale'> {
    locale?: NumerableLocale | (() => NumerableLocale);
}

export const createFormatFunction = (options: NumerableFormatNumberWithOptionsOptions): typeof formatNumber => {
    return ((
        value: number | string | null | undefined,
        arg2?: string | null | undefined | NumerableFormatNumberOptions,
        arg3?: string | NumerableFormatNumberOptions,
    ) => {
        const pattern = isString(arg2) ? arg2 : null;
        const optionsFromArguments = isObject(arg2) ? arg2 : (isObject(arg3) ? arg3 : {});

        return format(value, pattern, {
            ...options,
            locale: isFunction(options.locale) ? options.locale() : options.locale,
            ...optionsFromArguments,
        });
    }) as any;
};

formatNumber.withOptions = createFormatFunction;
