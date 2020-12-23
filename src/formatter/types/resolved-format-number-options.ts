import { NumerableFormatter } from '../../core/types/numerable-formatter';
import { ResolvedNumerableLocale } from '../../core/types/resolved-numerable-locale';

export interface ResolvedNumerableFormatNumberOptions {
    nullFormat: string;
    nanFormat?: string;
    zeroFormat?: string;
    defaultPattern: string;
    rounding: (scaledValueForRounding: number) => number;
    locale: ResolvedNumerableLocale;
    type: string | null;
    scalePercentBy100: boolean;
    formatters: NumerableFormatter[];
}
