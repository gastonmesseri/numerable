import merge from '../core/utils/merge';
import isObject from '../core/utils/is-object';
import isString from '../core/utils/is-string';
import isFunction from '../core/utils/is-function';
import { NumerableLocale } from '../locale/types/numerable-locale';
import formatFunctionFromSourceCode from '../formatter/format/format';
import { NumerableFormatNumberOptions } from '../formatter/types/format-number-options';

/**
 * @example
 * ```javascript
 * format(0.58, '0.0 %') 
 * //=> '58.0 %'
 * format(1000.582, '0,0.00', { locale: fr }) 
 * //=> '1 000,58'
 * format(1000.58, '0.0 a', { locale: de }) 
 * //=> '1,0 k'
 * ```
 * Format the given number applying the provided pattern and options.
 * 
 * options:
 * ```typescript
 * {
 *   nullFormat?: string;
 *   nanFormat?: string;
 *   zeroFormat?: string;
 *   defaultPattern?: string;
 *   rounding?: 'truncate' | 'ceil' | 'floor' | 'round' | ((scaledValueForRounding: number) => number);
 *   locale?: NumerableLocale;
 *   type?: string;
 *   scalePercentBy100?: boolean;
 *   formatters?: NumerableFormatter[] | ((builtInFormatters: NumerableFormatter[]) => NumerableFormatter[]);
 * }
 * ```
 *
 * @param number number: The number to format (e.g. **10.23**)
 * @param pattern pattern: The formatting pattern (e.g. **'0,0.00 %'**)
 * @param options options: The options used to format the number
 *     ```typescript
 *     {
 *        nullFormat?: string;
 *        nanFormat?: string;
 *        zeroFormat?: string;
 *        defaultPattern?: string;
 *        rounding?: 'truncate' | 'ceil' | 'floor' | 'round' | ((scaledValueForRounding: number) => number);
 *        locale?: NumerableLocale;
 *        type?: string;
 *        scalePercentBy100?: boolean;
 *        formatters?: NumerableFormatter[] | ((builtInFormatters: NumerableFormatter[]) => NumerableFormatter[]);
 *     }
 *     ```
 */
function format(number: number | string | null | undefined, pattern: string | null | undefined, options?: NumerableFormatNumberOptions): string;
function format(number: number | string | null | undefined, options: NumerableFormatNumberOptions): string;
function format(number: number | string | null | undefined): string;
function format(
    number: number | string | null | undefined,
    arg2?: string | null | undefined | NumerableFormatNumberOptions,
    arg3?: string | NumerableFormatNumberOptions,
): string {
    const pattern = isString(arg2) ? arg2 : null;
    const options = isObject(arg2) ? arg2 : (isObject(arg3) ? arg3 : {});
    return formatFunctionFromSourceCode(number, pattern, options);
}

interface NumerableFormatNumberWithOptionsOptions extends Omit<NumerableFormatNumberOptions, 'locale'> {
    locale?: NumerableLocale | (() => NumerableLocale);
}

export const createFormatFunction = (options: NumerableFormatNumberWithOptionsOptions): typeof format => {
    const baseOptions = merge(options, {
        locale: isFunction(options.locale) ? options.locale() : options.locale,
    });
    return ((
        value: number | string | null | undefined,
        arg2?: string | null | undefined | NumerableFormatNumberOptions,
        arg3?: string | NumerableFormatNumberOptions,
    ) => {
        const pattern = isString(arg2) ? arg2 : null;
        const optionsFromArguments = isObject(arg2) ? arg2 : (isObject(arg3) ? arg3 : {});
        return formatFunctionFromSourceCode(value, pattern, merge(baseOptions, optionsFromArguments));
    }) as any;
};

format.withOptions = createFormatFunction;

export default format;
