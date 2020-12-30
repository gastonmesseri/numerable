import { NumerableLocale } from '../../locale/types/numerable-locale';
import { NumerableFormatter } from '../../core/types/numerable-formatter';

export interface NumerableFormatNumberOptions {
    nullFormat?: string;
    nanFormat?: string;
    zeroFormat?: string;
    /** 
     * The fallback pattern used in case that the pattern is null | undefined | ''
     * Example:
     * 
     *     formatNumber(1234.56, null, { defaultPattern: '0.0' }) // Returns "1234.6"
     */
    defaultPattern?: string;
    rounding?: 'truncate' | 'ceil' | 'floor' | 'round' | ((scaledValueForRounding: number) => number);
    locale?: NumerableLocale;
    type?: string;
    scalePercentage?: boolean;
    formatters?: NumerableFormatter[] | ((builtInFormatters: NumerableFormatter[]) => NumerableFormatter[]);
    currency?: string;
    trim?: boolean;
    negativeZero?: boolean;
}
