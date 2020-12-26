import parsePattern from '../parse-pattern/parse-pattern';
import removeSignIfExists from './utils/remove-sign-if-exists';
import rescaleRoundedValue from './utils/rescale-rounded-value';
import isFiniteNumber from '../../../core/utils/is-finite-number';
import addLeadingZerosToValue from './utils/add-leading-zeros-to-value';
import { patternStripPlaceholders } from '../../utils/pattern-regexp-utils';
import scaleValueWithAbbreviation from './utils/scale-value-with-abbreviation';
import roundValueAndAddTrailingZeros from './utils/round-value-and-add-trailing-zeros';
import replaceDigitsWithNumeralSystem from './utils/replace-digits-with-numeral-system';
import addSignInfoToFullFormattedNumber from './utils/add-sign-info-to-full-formatted-number';
import splitNumberIntegerAndDecimalParts from './utils/split-number-integer-and-decimal-parts';
import addThousandsSeparatorToValueIntegerPart from './utils/add-thousands-separator-to-value-integer-part';
import { ResolvedNumerableFormatNumberOptions } from '../../../formatter/types/resolved-format-number-options';
import applyAbbreviationLocalizedUnitToPatternMask from './utils/apply-abbreviation-localized-unit-to-pattern-mask';

const numberToFormattedNumber = (number: number, pattern: string, options: ResolvedNumerableFormatNumberOptions): string => {
    const patternRules = parsePattern(pattern);

    // Ensure always uses a number or default number
    const resolvedValue = isFiniteNumber(number) ? number : 0;

    // 1. Scaling and rounding
    const [scaledValue, scaledValueUnit] = scaleValueWithAbbreviation(resolvedValue, patternRules, options);
    const roundedScaledValue = +roundValueAndAddTrailingZeros(scaledValue, patternRules, options);
    const [rescaledValue, rescaledValueUnit] = rescaleRoundedValue(+roundedScaledValue, scaledValueUnit, patternRules, options);
    const roundedRescaledValueAsStringWithTrailingZeros = roundValueAndAddTrailingZeros(rescaledValue, patternRules, options);

    // 2. Apply locale
    const valueAsString = roundedRescaledValueAsStringWithTrailingZeros;
    const isValueNegative = +valueAsString < 0;
    const valueAsStringWithoutSign = removeSignIfExists(valueAsString);
    const [integerPart, decimalPart] = splitNumberIntegerAndDecimalParts(valueAsStringWithoutSign, patternRules);
    const valueIntegerPartWithLeadingZeros = addLeadingZerosToValue(integerPart, patternRules);
    const valueIntegerPartWithThousandsSeparator = addThousandsSeparatorToValueIntegerPart(valueIntegerPartWithLeadingZeros, patternRules, options);
    const valueIntegerPartAfterHandlingOmitInteger = patternRules.omitInteger ? '' : valueIntegerPartWithThousandsSeparator;
    const abbreviationLocalizedUnit = rescaledValueUnit || '';

    const numeralSystemFromLocale = options.locale.numeralSystem;
    const integerPartWithNumeralSystem = replaceDigitsWithNumeralSystem(valueIntegerPartAfterHandlingOmitInteger, numeralSystemFromLocale);
    const decimalPartWithNumeralSystem = replaceDigitsWithNumeralSystem(decimalPart, numeralSystemFromLocale);
    const fullNumberWithNumeralSystem = (
        integerPartWithNumeralSystem
        + (!!decimalPartWithNumeralSystem ? (options.locale.delimiters?.decimal || '.') + decimalPartWithNumeralSystem : '')
    );

    // 3. Assembling
    const patternMaskWithAbbreviation = applyAbbreviationLocalizedUnitToPatternMask(patternRules.patternMask, abbreviationLocalizedUnit, patternRules.compact);
    const fullNumberWithReplacedSingleQuotes = fullNumberWithNumeralSystem.replace(/'/g, '$ɵ');
    const patternMaskWithNumber = patternMaskWithAbbreviation.replace(`'$n'`, fullNumberWithReplacedSingleQuotes);
    const patternMaskWithSignInfo = addSignInfoToFullFormattedNumber(patternMaskWithNumber, isValueNegative, patternRules);
    const fullFormattedValueWithStrippedPlaceholders = patternStripPlaceholders(patternMaskWithSignInfo);
    const patternMaskWithUnescapedSingleQuotes = fullFormattedValueWithStrippedPlaceholders.replace(/\$ɵ/g, `'`);

    // <!> This should be moved after the scaling and rounding
    // Prevents potentially wrong formatting coming from this function
    if (patternMaskWithUnescapedSingleQuotes === 'NaN') {
        return '';
    }

    return patternMaskWithUnescapedSingleQuotes;
};

export default numberToFormattedNumber;
