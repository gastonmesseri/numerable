import parseFunctionFromSourceCode from '../formatter/parse/parse';
import { NumerableFormatNumberOptions } from '../formatter/types/format-number-options';

/**
 * @example
 * ```javascript
 * parse('1,250.48') 
 * //=> 1250.48
 * parse('10 %') 
 * //=> 0.1
 * parse('1 000,582', { locale: fr }) 
 * //=> 1000.582
 * ```
 * Parse the given numeric-string applying the provided options.
 * 
 * options:
 * ```typescript
 * {
 * nullFormat?: string;
 * nanFormat?: string;
 * zeroFormat?: string;
 * defaultPattern?: string;
 * rounding?: 'truncate' | 'ceil' | 'floor' | 'round' | ((scaledValueForRounding: number) => number);
 * locale?: NumerableLocale;
 * type?: string;
 * scalePercentBy100?: boolean;
 * formatters?: NumerableFormatter[] | ((builtInFormatters: NumerableFormatter[]) => NumerableFormatter[]);
 * }
 * ```
 *
 * @param string string: The numeric-string to parse (e.g. **'10 %'**)
 * @param options options: The options used to parse the numeric-string
 * ```typescript
 * {
 * nullFormat?: string;
 * nanFormat?: string;
 * zeroFormat?: string;
 * defaultPattern?: string;
 * rounding?: 'truncate' | 'ceil' | 'floor' | 'round' | ((scaledValueForRounding: number) => number);
 * locale?: NumerableLocale;
 * type?: string;
 * scalePercentBy100?: boolean;
 * formatters?: NumerableFormatter[] | ((builtInFormatters: NumerableFormatter[]) => NumerableFormatter[]);
 * }
 * ```
 */
const parse = (string: string | number, options?: NumerableFormatNumberOptions): number | null => {
    return parseFunctionFromSourceCode(string, options);
};

export default parse;
