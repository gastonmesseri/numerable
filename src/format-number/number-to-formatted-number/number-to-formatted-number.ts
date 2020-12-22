import parsePattern from '../parse-pattern/parse-pattern';
import isFiniteNumber from '../../core/utils/is-finite-number';
import removeSignIfExists from './utils/remove-sign-if-exists';
import rescaleRoundedValue from './utils/rescale-rounded-value';
import addLeadingZerosToValue from './utils/add-leading-zeros-to-value';
import scaleValueWithAbbreviation from './utils/scale-value-with-abbreviation';
import getAbbreviationScaleSuffix from './utils/get-abbreviation-scale-suffix';
import roundValueAndAddTrailingZeros from './utils/round-value-and-add-trailing-zeros';
import replaceDigitsWithNumeralSystem from './utils/replace-digits-with-numeral-system';
import addSignInfoToFullFormattedNumber from './utils/add-sign-info-to-full-formatted-number';
import splitNumberIntegerAndDecimalParts from './utils/split-number-integer-and-decimal-parts';
import { ResolvedNumerableFormatNumberOptions } from '../../formatter/types/format-number-options';
import addThousandsSeparatorToValueIntegerPart from './utils/add-thousands-separator-to-value-integer-part';

const numberToFormattedNumber = (number: number, pattern: string, options: ResolvedNumerableFormatNumberOptions): string => {
    const patternRules = parsePattern(pattern);

    // Ensure always uses a number or default number
    const resolvedValue = isFiniteNumber(number) ? number : 0;

    // Scaling and rounding
    const [scaledValue, scaledValueUnit] = scaleValueWithAbbreviation(resolvedValue, patternRules, options);
    const roundedScaledValue = +roundValueAndAddTrailingZeros(scaledValue, patternRules, options);
    const [rescaledValue, rescaledValueUnit] = rescaleRoundedValue(+roundedScaledValue, scaledValueUnit, patternRules, options);
    const roundedRescaledValueAsStringWithTrailingZeros = roundValueAndAddTrailingZeros(rescaledValue, patternRules, options);

    const valueAsString = roundedRescaledValueAsStringWithTrailingZeros;
    const isValueNegative = +valueAsString < 0;
    const valueAsStringWithoutSign = removeSignIfExists(valueAsString);
    const [integerPart, decimalPart] = splitNumberIntegerAndDecimalParts(valueAsStringWithoutSign, patternRules);
    const valueIntegerPartWithLeadingZeros = addLeadingZerosToValue(integerPart, patternRules);
    const valueIntegerPartWithThousandsSeparator = addThousandsSeparatorToValueIntegerPart(valueIntegerPartWithLeadingZeros, patternRules, options);
    const valueIntegerPartAfterHandlingOmitInteger = patternRules.omitInteger ? '' : valueIntegerPartWithThousandsSeparator;
    const abbreviationSuffix = getAbbreviationScaleSuffix(rescaledValueUnit, patternRules);

    const numeralSystemFromLocale = options.locale.numeralSystem;
    const integerPartWithNumeralSystem = replaceDigitsWithNumeralSystem(valueIntegerPartAfterHandlingOmitInteger, numeralSystemFromLocale);
    const decimalPartWithNumeralSystem = replaceDigitsWithNumeralSystem(decimalPart, numeralSystemFromLocale);
    const fullNumberWithNumeralSystem = (
        integerPartWithNumeralSystem
        + (!!decimalPartWithNumeralSystem ? (options.locale.delimiters?.decimal || '.') + decimalPartWithNumeralSystem : '')
    );

    const fullFormattedValueWithoutSign = fullNumberWithNumeralSystem + abbreviationSuffix;
    const fullFormattedValueWithSignInfo = addSignInfoToFullFormattedNumber(fullFormattedValueWithoutSign, isValueNegative, abbreviationSuffix, patternRules);

    // Prevents potentially wrong formatting coming from this function
    if (fullFormattedValueWithSignInfo === 'NaN') {
        return '';
    }

    return fullFormattedValueWithSignInfo;
};

export default numberToFormattedNumber;
