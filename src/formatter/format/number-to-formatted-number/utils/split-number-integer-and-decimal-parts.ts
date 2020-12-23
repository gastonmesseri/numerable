import { NumberFormatRules } from '../../../../core/types/rules';
import splitStringInTwoParts from '../../../../core/utils/split-string-in-two-parts';

/**
 * Splits the given number (as string) in the integer and decimal parts.
 * Returns: 
 *     [integerPart: string, decimalPart: string]
 * <i> The integer part can potentially contain the number sign (-) if it wasn't removed previously.
 * <i> It should always return [string, string]
 */
const splitNumberIntegerAndDecimalParts = (valueAsString: string, patternRules: NumberFormatRules) => {
    const { optionalFractionDigits } = patternRules;

    const [integerPart, decimalPart] = splitStringInTwoParts(valueAsString, '.');

    // Checks whether optionalDecimalPlaces [.] is enabled and the value is an integer (no decimals)
    if (optionalFractionDigits && Number(decimalPart) === 0) {
        return [integerPart, ''];
    }

    return [integerPart, decimalPart];
};

export default splitNumberIntegerAndDecimalParts;
