import { ResolvedNumerableFormatNumberOptions } from '../../formatter/types/resolved-format-number-options';

export interface NumerableFormatter {
    name: string;
    regexps: {
        format: RegExp | ((pattern: string, options: ResolvedNumerableFormatNumberOptions) => boolean);
        unformat?: RegExp | ((pattern: string, options: ResolvedNumerableFormatNumberOptions) => boolean);
    };
    format: (value: number | null | undefined, pattern: string, formatOptions: ResolvedNumerableFormatNumberOptions) => string;
    unformat?: (numberAsString: string, formatOptions: ResolvedNumerableFormatNumberOptions) => number | null;
}
