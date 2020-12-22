import stringIncludes from '../../../core/utils/string-includes';
import splitStringInTwoParts from '../../../core/utils/split-string-in-two-parts';

// const countChars = (string: string, char: string) => {
//     return string.split('').filter(stringChar => stringChar === char).length;
// };

/**
 * Fraction digits (decimals) count rule (optional and forced)
 * 
 * <i> Optional fraction digits would go always after the forced ones
 */
export const decimalPlacesRule = (pattern: string) => {
    const patternPrecisionPart = splitStringInTwoParts(pattern, '.')[1];
    let minimumFractionDigits: number = 0;
    let maximumFractionDigits: number = 0;

    if (!!patternPrecisionPart) {
        const trimmedPatternPrecisionPart = patternPrecisionPart.trim();
        if (stringIncludes(trimmedPatternPrecisionPart, '[')) {
            // If it contains optional fraction digits
            const patternPrecisionPartWithoutClosingBracket = trimmedPatternPrecisionPart.replace(']', '');

            // Isolates forced (left) vs optional (right) decimals
            const precisionSplitted = splitStringInTwoParts(patternPrecisionPartWithoutClosingBracket, '[');

            minimumFractionDigits = precisionSplitted[0].length;
            maximumFractionDigits = minimumFractionDigits + precisionSplitted[1].length;
        } else if (stringIncludes(trimmedPatternPrecisionPart, '#')) {
            // If it contains optional fraction digits marked with '#'
            minimumFractionDigits = trimmedPatternPrecisionPart.split('#')[0].length;
            maximumFractionDigits = trimmedPatternPrecisionPart.length;
        } else if (stringIncludes(trimmedPatternPrecisionPart, 'X')) {
            // If it contains no-maximum fraction digits marked with 'X'
            minimumFractionDigits = trimmedPatternPrecisionPart.split('X')[0].length;
            maximumFractionDigits = 500;
        } else {
            minimumFractionDigits = trimmedPatternPrecisionPart.length;
            maximumFractionDigits = trimmedPatternPrecisionPart.length;
        }
    }

    return { minimumFractionDigits, maximumFractionDigits } as const;
};
