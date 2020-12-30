import parsePattern from '../parse-pattern/parse-pattern';
import { NumberFormatRules } from '../../../core/types/rules';
import removeSignIfExists from './utils/remove-sign-if-exists';
import rescaleRoundedValue from './utils/rescale-rounded-value';
import isFiniteNumber from '../../../core/utils/is-finite-number';
import { patternStripPlaceholders } from '../../utils/pattern-regexp-utils';
import scaleValueWithAbbreviation from './utils/scale-value-with-abbreviation';
import roundValueAndAddTrailingZeros from './utils/round-value-and-add-trailing-zeros';
import replaceDigitsWithNumeralSystem from './utils/replace-digits-with-numeral-system';
import addOrRemoveLeadingZerosToValue from './utils/add-or-remove-leading-zeros-to-value';
import addSignInfoToFullFormattedNumber from './utils/add-sign-info-to-full-formatted-number';
import splitNumberIntegerAndDecimalParts from './utils/split-number-integer-and-decimal-parts';
import addThousandsSeparatorToValueIntegerPart from './utils/add-thousands-separator-to-value-integer-part';
import { ResolvedNumerableFormatNumberOptions } from '../../../formatter/types/resolved-format-number-options';
import applyAbbreviationLocalizedUnitToPatternMask from './utils/apply-abbreviation-localized-unit-to-pattern-mask';

const scaleAndRoundValue = (number: number, patternRules: NumberFormatRules, options: ResolvedNumerableFormatNumberOptions): [string, string | null] => {
    // If it doesn't have abbreviation, just round the value and add trailing zeros
    if (!patternRules.compact) {
        const roundedValueAsString = roundValueAndAddTrailingZeros(number, patternRules, options);
        return [roundedValueAsString, null];
    }

    // If it has abbreviation, scales the value
    const [scaledValue, scaledValueLocalizedUnit] = scaleValueWithAbbreviation(number, patternRules, options);
    const roundedScaledValue = +roundValueAndAddTrailingZeros(scaledValue, patternRules, options);
    const [rescaledValue, rescaledValueLocalizedUnit] = rescaleRoundedValue(+roundedScaledValue, scaledValueLocalizedUnit, patternRules, options);
    const roundedRescaledValueAsStringWithTrailingZeros = roundValueAndAddTrailingZeros(rescaledValue, patternRules, options);
    return [roundedRescaledValueAsStringWithTrailingZeros, rescaledValueLocalizedUnit];
};

const numberToFormattedNumber = (number: number, pattern: string, options: ResolvedNumerableFormatNumberOptions): string => {
    const patternRules = parsePattern(pattern);

    // Ensure always uses a number or default number
    const resolvedValue = isFiniteNumber(number) ? number : 0;

    const [valueAsString, localizedAbbreviationUnit] = scaleAndRoundValue(resolvedValue, patternRules, options);

    // Prevents potentially wrong formatting coming from this function
    if (valueAsString === 'NaN') return '';

    const isValueNegative = +valueAsString < 0;
    const valueAsStringWithoutSign = removeSignIfExists(valueAsString);
    const [integerPart, decimalPart] = splitNumberIntegerAndDecimalParts(valueAsStringWithoutSign, patternRules);
    const valueIntegerPartWithLeadingZeros = addOrRemoveLeadingZerosToValue(integerPart, patternRules);
    const valueIntegerPartWithThousandsSeparator = addThousandsSeparatorToValueIntegerPart(valueIntegerPartWithLeadingZeros, patternRules, options);
    const numeralSystemFromLocale = options.locale.numeralSystem;
    const integerPartWithNumeralSystem = replaceDigitsWithNumeralSystem(valueIntegerPartWithThousandsSeparator, numeralSystemFromLocale);
    const decimalPartWithNumeralSystem = replaceDigitsWithNumeralSystem(decimalPart, numeralSystemFromLocale);
    const fullNumberWithNumeralSystem = (
        integerPartWithNumeralSystem
        + (!!decimalPartWithNumeralSystem ? (options.locale.delimiters?.decimal || '.') + decimalPartWithNumeralSystem : '')
    );

    // Assembling
    const patternMaskWithAbbreviation = applyAbbreviationLocalizedUnitToPatternMask(patternRules.patternMask, localizedAbbreviationUnit, patternRules.compact);
    const fullNumberWithReplacedSingleQuotes = fullNumberWithNumeralSystem.replace(/'/g, _ => '#ɵ#');
    const patternMaskWithNumber = patternMaskWithAbbreviation.replace(`'#n'`, _ => fullNumberWithReplacedSingleQuotes);
    const patternMaskWithSignInfo = addSignInfoToFullFormattedNumber(patternMaskWithNumber, isValueNegative, patternRules);
    const fullFormattedValueWithStrippedPlaceholders = patternStripPlaceholders(patternMaskWithSignInfo);
    const patternMaskWithUnescapedSingleQuotes = fullFormattedValueWithStrippedPlaceholders.replace(/#ɵ#/g, _ => '\'');

    return patternMaskWithUnescapedSingleQuotes;
};

export default numberToFormattedNumber;
