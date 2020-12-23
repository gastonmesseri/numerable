import log10 from '../../../core/utils/log-10';
import toObject from '../../../core/utils/to-object';
import escapeRegexString from '../../../core/utils/escape-regex-string';
import multiplyByPowerOfTen from '../../../core/utils/multiply-by-power-of-ten';
import { ResolvedNumerableFormatNumberOptions } from '../../types/resolved-format-number-options';
import createUnitScaleFromLocaleAbbreviations from '../../utils/create-unit-scale-from-locale-abbreviations';

const replaceNumeralSystemWithLatinNumbers = (numericStringWithExtraInfo: string, numeralSystemMap: string[] | undefined) => {
    if (!numeralSystemMap || numeralSystemMap.length !== 10) return numericStringWithExtraInfo;

    const numericStringLength = numericStringWithExtraInfo.length;
    const numeralSystemToLatinSystemMap = toObject(numeralSystemMap, (digit, digitIndex) => [
        digit.replace(/\u200e/g, ''),
        '' + digitIndex,
    ]);
    let output = '';
    for (let numericStringIndex = 0; numericStringIndex < numericStringLength; numericStringIndex++) {
        const char = numericStringWithExtraInfo[numericStringIndex];
        output += numeralSystemToLatinSystemMap[char] || char;
    }
    return output;
};

const getScalingFactorFromAbbreviations = (stringOriginal: string, options: ResolvedNumerableFormatNumberOptions) => {
    const scale = createUnitScaleFromLocaleAbbreviations(options.locale?.abbreviations);
    const abbreviationsSortedByLengthDesc = Object.keys(scale.scaleDefinition.scale).sort((a, b) => b.length - a.length);

    let abbreviationScalingFactor = 1;
    for (const abbreviation of abbreviationsSortedByLengthDesc) {
        const scapedAbbreviationForRegex = escapeRegexString(abbreviation);
        const regexp = new RegExp(
            '[^a-zA-Z]'
            + `(${scapedAbbreviationForRegex})|(${scapedAbbreviationForRegex.replace(/\u200e/g, '')})`
            + '(?:\\)|(\\' + 'CURRENCY' + ')?(?:\\))?)?$'
        );

        if (stringOriginal.match(regexp)) {
            abbreviationScalingFactor = scale.toBase(abbreviationScalingFactor, abbreviation);
            break;
        }
    }
    return abbreviationScalingFactor;
};

// unformats numbers separators, decimals places, signs, abbreviations
const formattedStringToNumber = (inputString: string, options: ResolvedNumerableFormatNumberOptions) => {
    const locale = options.locale;
    const stringOriginal = inputString;

    let value: number | null;

    // Replace special digits with latin digits
    const stringWithLatinDigits = replaceNumeralSystemWithLatinNumbers(inputString, options.locale?.numeralSystem);

    if (options.zeroFormat && stringWithLatinDigits === options.zeroFormat) {
        value = 0;
    } else if (options.nullFormat && stringWithLatinDigits === options.nullFormat || !stringWithLatinDigits.replace(/[^0-9]+/g, '').length) {
        value = null;
    } else {
        // Replaces the locale decimal delimiter with a dot (.)
        const decimalDelimiterFromLocale = locale.delimiters.decimal;
        const stringWithDotDecimalDelimiter = decimalDelimiterFromLocale === '.'
            ? stringWithLatinDigits
            : stringWithLatinDigits.replace(/\./g, '').replace(decimalDelimiterFromLocale, '.');

        // Determines the scaling factor from the abbreviations (if has abbreviations)
        const abbreviationScalingFactor: 1 | number = getScalingFactorFromAbbreviations(stringOriginal, options);

        // Check for negative number
        const negativeFactor: 1 | -1 = (
            stringWithDotDecimalDelimiter.split('-').length
            + Math.min(stringWithDotDecimalDelimiter.split('(').length - 1, stringWithDotDecimalDelimiter.split(')').length - 1)
        ) % 2 ? 1 : -1;

        // Remove non numbers
        const numberAsString = stringWithDotDecimalDelimiter.replace(/[^0-9.]+/g, '');

        value = negativeFactor * multiplyByPowerOfTen(+numberAsString, log10(abbreviationScalingFactor));
    }

    return value;
};

export default formattedStringToNumber;
