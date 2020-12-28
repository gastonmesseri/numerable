import stringIncludes from '../../../../core/utils/string-includes';
import splitStringInTwoParts from '../../../../core/utils/split-string-in-two-parts';
import { patternRemoveEscapedText } from '../../../utils/pattern-regexp-utils';

const countChars = (string: string, char: string) => {
    return !string ? 0 : string.split('').filter(stringChar => stringChar === char).length;
};

/**
 * Fraction digits (decimals) count rule (optional and forced)
 * 
 * <i> Optional fraction digits would go always after the forced ones
 */
const decimalPlacesRule = (patternMask: string) => {
    const patternWithoutEscapedText = patternRemoveEscapedText(patternMask);
    const patternPrecisionPart = splitStringInTwoParts(patternWithoutEscapedText, '.')[1];

    let minimumFractionDigits: number = 0;
    let maximumFractionDigits: number = 0;

    if (!!patternPrecisionPart) {
        const trimmedPatternPrecisionPart = patternPrecisionPart.trim();
        if (stringIncludes(trimmedPatternPrecisionPart, '[')) {
            // If it contains optional fraction digits
            const patternPrecisionPartWithoutClosingBracket = trimmedPatternPrecisionPart.replace(']', '');

            // Isolates forced (left) vs optional (right) decimals
            const precisionSplitted = splitStringInTwoParts(patternPrecisionPartWithoutClosingBracket, '[');

            minimumFractionDigits = countChars(precisionSplitted[0], '0');
            maximumFractionDigits = minimumFractionDigits + countChars(precisionSplitted[1], '0');
        } else if (stringIncludes(trimmedPatternPrecisionPart, '#')) {
            // If it contains optional fraction digits marked with '#'
            minimumFractionDigits = countChars(trimmedPatternPrecisionPart.split('#')[0], '0');
            maximumFractionDigits = trimmedPatternPrecisionPart.length;
        } else if (stringIncludes(trimmedPatternPrecisionPart, 'X')) {
            // If it contains no-maximum fraction digits marked with 'X'
            minimumFractionDigits = countChars(trimmedPatternPrecisionPart.split('X')[0], '0');
            maximumFractionDigits = 500;
        } else {
            minimumFractionDigits = countChars(trimmedPatternPrecisionPart.split(' ')[0], '0');
            maximumFractionDigits = countChars(trimmedPatternPrecisionPart.split(' ')[0], '0');
        }
    }

    return { minimumFractionDigits, maximumFractionDigits } as const;
};

export default decimalPlacesRule;
