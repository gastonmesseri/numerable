import { NumerableFormatter } from '../../core/types/numerable-formatter';
import { ResolvedNumerableLocale } from '../../core/types/resolved-numerable-locale';

export interface ResolvedNumerableFormatNumberOptions {
    nullFormat: string;
    nanFormat: string | undefined;
    zeroFormat: string | undefined;
    defaultPattern: string;
    rounding: (scaledValueForRounding: number) => number;
    locale: ResolvedNumerableLocale;
    type: string | undefined;
    scalePercentage: boolean;
    formatters: NumerableFormatter[];
    currency: string | undefined;
    trim: boolean;
    signedZero: boolean;
}
