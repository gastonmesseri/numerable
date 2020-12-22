import { ResolvedNumerableLocale, NumerableLocale } from '../../core/types/numerable-locale';

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
    scalePercentBy100?: boolean;
}

export interface ResolvedNumerableFormatNumberOptions {
    nullFormat: string;
    nanFormat?: string;
    zeroFormat?: string;
    defaultPattern: string;
    rounding: (scaledValueForRounding: number) => number;
    locale: ResolvedNumerableLocale;
    type: string | null;
    scalePercentBy100: boolean;
}
