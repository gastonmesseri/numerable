import signRule from './rules/sign-rule';
import memoize from '../../../core/utils/memoize';
import isString from '../../../core/utils/is-string';
import abbreviationRule from './rules/abbreviation-rule';
import decimalPlacesRule from './rules/decimal-places-rule';
import { NumberFormatRules } from '../../../core/types/rules';
import stringIncludes from '../../../core/utils/string-includes';
import optionalDecimalPlacesRule from './rules/optional-decimal-places-rule';
import { patternRemoveEscapedText, patternReplace } from '../../utils/pattern-regexp-utils';

/**
 * <i> The regExp tests for:
 *     - 0.00##X
 *     - 0,0.00##X
 *     - #.00##X (without leading zeros)
 *     - #,#.00##X (without leading zeros)
 */
const numberPositionRule = (patternMask: string) => {
    const numberPartRegExp = /((((0|#)+,)?(0|#)+(\.([0#X]|\[0+\])+)?){1}|\.([0#X]|\[0+\])+)/;
    return patternReplace(patternMask, numberPartRegExp, `'#n'`);
};

/**
 * Minimum leading integer digits rule
 * This will define the minimum amount of digits on the integer part (left-most grouped zeroes).
 *     - (12.34, '0000.0') =>  '0012.3'
 *     - (12.34, '0000,0.0')  =>  '0,012.3'
 *     - (0.34, '#.0') => '.3'
 *     - (1.34, '#.0') => '1.3'
 * 
 * <i> It always pick the left-most amount of zeros, so:
 *     - If pattern has NO thousands separator ('000.0'), then the amount at the left of the DOT is used.
 *     - If pattern HAS thousands separator ('00,0.0'), then the amount at the left of the COMMA is used.
 * <i> This will remove the integer zero for numbers between 1 and -1 (e.g. 0.23 or -0.5)
 *     - If pattern integer part is option (0.24, '#.00') => '.24'
 */
const minimumIntegerDigitsRule = (patternMask: string) => {
    const patternMaskWithoutEscapedText = patternRemoveEscapedText(patternMask);
    const patternMaskIntegerPart = patternMaskWithoutEscapedText.split('.')[0].split(',')[0];

    // If it has '#' in the integer part, sets the minimumIntegerDigits to 0
    if (/#/g.test(patternMaskIntegerPart)) {
        return 0;
    }

    return (patternMaskIntegerPart.match(/0/g) || []).length;
};

// If sign is not included, put sign at the left of the number
const addSignPositionIfItDoesNotExists = (patternMask: string) => {
    if (stringIncludes(patternMask, `'#s'`) || stringIncludes(patternMask, `'#nps'`)) return patternMask;
    return patternMask.replace(`'#n'`, _ => `'#s''#n'`);
};

const baseParsePattern = (inputPattern: string | null | undefined): NumberFormatRules => {
    const resolvedInputPattern = isString(inputPattern) && inputPattern || '0,0.##########';

    const [patternMaskAfterSignRule, signRules] = signRule(resolvedInputPattern);
    const [patternMaskAfterAbbreviationRule, abbreviationRules] = abbreviationRule(patternMaskAfterSignRule);
    const [patternMaskAfterOptionalDecimalPlacesRule, optionalDecimalPlacesRules] = optionalDecimalPlacesRule(patternMaskAfterAbbreviationRule);

    const outputPatternMask = patternMaskAfterOptionalDecimalPlacesRule;
    const outputPatternMaskWithoutEscapedText = patternRemoveEscapedText(outputPatternMask);
    const decimalPlacesRules = decimalPlacesRule(outputPatternMask);
    const minimumIntegerDigits = minimumIntegerDigitsRule(outputPatternMask);
    const grouping = outputPatternMaskWithoutEscapedText.indexOf(',') > -1;

    const patternMaskAfterHandlingNumberPosition = numberPositionRule(outputPatternMask);
    const patternMaskWithEnsuredSignPosition = addSignPositionIfItDoesNotExists(patternMaskAfterHandlingNumberPosition);
    const patternMask = patternMaskWithEnsuredSignPosition;

    return {
        ...signRules,
        ...abbreviationRules,
        ...optionalDecimalPlacesRules,
        ...decimalPlacesRules,
        grouping,
        minimumIntegerDigits,
        patternMask,
    };
};

const parsePattern = memoize(baseParsePattern);

export default parsePattern;
