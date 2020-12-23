import merge from '../../core/utils/merge';
import BUILT_IN_FORMATTERS from '../formatters';
import isObject from '../../core/utils/is-object';
import isString from '../../core/utils/is-string';
import isFunction from '../../core/utils/is-function';
import truncateNumber from '../../core/utils/truncate-number';
import { NumerableLocale } from '../../locale/types/numerable-locale';
import DEFAULT_FORMAT_OPTIONS from '../constants/default-format-options';
import { NumerableFormatNumberOptions } from '../types/format-number-options';
import { ResolvedNumerableLocale } from '../../core/types/resolved-numerable-locale';
import { ResolvedNumerableFormatNumberOptions } from '../types/resolved-format-number-options';

const areDelimitersValid = (delimiters: NumerableLocale['delimiters']): delimiters is NonNullable<typeof delimiters>  => {
    return !!delimiters?.decimal
        && isString(delimiters?.thousands)
        && delimiters.decimal !== delimiters.thousands;
};

const resolveOptionsLocale = (optionsLocale: NumerableLocale | undefined): ResolvedNumerableLocale => {
    const defaultLocale = DEFAULT_FORMAT_OPTIONS.locale as ResolvedNumerableLocale;
    if (!isObject(optionsLocale)) return defaultLocale;

    return merge(optionsLocale, {
        delimiters: areDelimitersValid(optionsLocale.delimiters) ? optionsLocale.delimiters : defaultLocale.delimiters,
        abbreviations: optionsLocale.abbreviations || defaultLocale.abbreviations,
        ordinal: optionsLocale.ordinal || defaultLocale.ordinal,
    });
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

const resolveOptionsFormatters = (optionsFormatters: NumerableFormatNumberOptions['formatters']) => {
    if (!optionsFormatters) return BUILT_IN_FORMATTERS;
    return isFunction(optionsFormatters)
        ? optionsFormatters(BUILT_IN_FORMATTERS)
        : [...BUILT_IN_FORMATTERS, ...optionsFormatters];
};

const resolveFormatOptions = (options: NumerableFormatNumberOptions | undefined): ResolvedNumerableFormatNumberOptions => {
    const optionsWithDefaults = merge(DEFAULT_FORMAT_OPTIONS, options) as ResolvedNumerableFormatNumberOptions;
    const resolvedPattern = optionsWithDefaults.defaultPattern || '0,0.##########';
    const resolvedRoundingFunction = resolveRoundingOption(optionsWithDefaults.rounding);
    const resolvedLocale = resolveOptionsLocale(optionsWithDefaults.locale);
    const resolvedFormatters = resolveOptionsFormatters(options?.formatters);

    return merge(optionsWithDefaults, {
        defaultPattern: resolvedPattern,
        rounding: resolvedRoundingFunction,
        locale: resolvedLocale,
        formatters: resolvedFormatters,
    });
};

export default resolveFormatOptions;
