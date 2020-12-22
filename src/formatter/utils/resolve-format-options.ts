import isObject from '../../core/utils/is-object';
import isString from '../../core/utils/is-string';
import isFunction from '../../core/utils/is-function';
import truncateNumber from '../../core/utils/truncate-number';
import DEFAULT_FORMAT_OPTIONS from '../constants/default-format-options';
import { NumerableLocale, ResolvedNumerableLocale } from '../../core/types/numerable-locale';
import { NumerableFormatNumberOptions, ResolvedNumerableFormatNumberOptions } from '../types/format-number-options';

const areDelimitersValid = (delimiters: NumerableLocale['delimiters']): delimiters is NonNullable<typeof delimiters>  => {
    return !!delimiters?.decimal
        && isString(delimiters?.thousands)
        && delimiters.decimal !== delimiters.thousands;
};

const resolveOptionsLocale = (optionsLocale: NumerableLocale | undefined): ResolvedNumerableLocale => {
    const defaultLocale = DEFAULT_FORMAT_OPTIONS.locale as ResolvedNumerableLocale;
    if (!isObject(optionsLocale)) return defaultLocale;

    return {
        ...optionsLocale,
        delimiters: areDelimitersValid(optionsLocale.delimiters) ? optionsLocale.delimiters : defaultLocale.delimiters,
        abbreviations: optionsLocale.abbreviations || defaultLocale.abbreviations,
        ordinal: optionsLocale.ordinal || defaultLocale.ordinal,
    };
};

const resolveRoundingOption = (roundingOption: NumerableFormatNumberOptions['rounding']): ((value: number) => number) => {
    switch (roundingOption) {
        case 'ceil': return Math.ceil;
        case 'floor': return Math.floor;
        case 'truncate': return truncateNumber;
        case 'round': return Math.round;
        default: return isFunction(roundingOption) ? roundingOption : DEFAULT_FORMAT_OPTIONS.rounding;
    }
};

const resolveFormatOptions = (options: NumerableFormatNumberOptions | undefined): ResolvedNumerableFormatNumberOptions => {
    const resolvedPattern = options?.defaultPattern || DEFAULT_FORMAT_OPTIONS.defaultPattern || '0,0.##########';
    const resolvedOptions = { ...DEFAULT_FORMAT_OPTIONS, ...options };
    const resolvedRoundingFunction = resolveRoundingOption(resolvedOptions.rounding);
    const resolvedLocale = resolveOptionsLocale(resolvedOptions.locale);
    return {
        ...resolvedOptions,
        defaultPattern: resolvedPattern,
        rounding: resolvedRoundingFunction,
        locale: resolvedLocale,
    };
};

export default resolveFormatOptions;
