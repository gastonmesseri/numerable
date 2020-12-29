import en from '../../locale/en';
import merge from '../../core/utils/merge';
import isObject from '../../core/utils/is-object';
import isString from '../../core/utils/is-string';
import isFunction from '../../core/utils/is-function';
import truncateNumber from '../../core/utils/truncate-number';
import BUILT_IN_FORMATTERS from '../constants/built-in-formatters';
import { NumerableLocale } from '../../locale/types/numerable-locale';
import { NumerableFormatNumberOptions } from '../types/format-number-options';
import { ResolvedNumerableLocale } from '../../core/types/resolved-numerable-locale';
import { ResolvedNumerableFormatNumberOptions } from '../types/resolved-format-number-options';

const areDelimitersValid = (delimiters: NumerableLocale['delimiters']): delimiters is NonNullable<typeof delimiters>  => {
    return !!delimiters?.decimal
        && isString(delimiters?.thousands)
        && delimiters.decimal !== delimiters.thousands;
};

const resolveOptionsLocale = (optionsLocale: NumerableLocale | undefined): ResolvedNumerableLocale => {
    const defaultLocale = en as ResolvedNumerableLocale;

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
        default: return isFunction(roundingOption) ? roundingOption : Math.round;
    }
};

const resolveOptionsFormatters = (optionsFormatters: NumerableFormatNumberOptions['formatters']) => {
    if (!optionsFormatters) return BUILT_IN_FORMATTERS;
    return isFunction(optionsFormatters)
        ? optionsFormatters(BUILT_IN_FORMATTERS)
        : [...optionsFormatters, ...BUILT_IN_FORMATTERS];
};

const resolveFormatOptions = (options: NumerableFormatNumberOptions | undefined): ResolvedNumerableFormatNumberOptions => {
    const resolvedRoundingFunction = resolveRoundingOption(options?.rounding);
    const resolvedLocale = resolveOptionsLocale(options?.locale);
    const resolvedFormatters = resolveOptionsFormatters(options?.formatters);

    return {
        defaultPattern: options?.defaultPattern || '0,0.##########',
        nullFormat: options?.nullFormat || '',
        nanFormat: options?.nanFormat,
        zeroFormat: options?.zeroFormat,
        locale: resolvedLocale,
        rounding: resolvedRoundingFunction,
        type: options?.type || null,
        scalePercentage: options?.scalePercentage ?? true,
        trim: options?.trim ?? true,
        formatters: resolvedFormatters,
        currency: options?.currency,
    };
};


export default resolveFormatOptions;
