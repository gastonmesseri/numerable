import { signRule } from './rules/sign-rule';
import memoize from '../../../core/utils/memoize';
import isString from '../../../core/utils/is-string';
import { abbreviationRule } from './rules/abbreviation-rule';
import { NumberFormatRules } from '../../../core/types/rules';
import { decimalPlacesRule } from './rules/decimal-places-rule';
import stringIncludes from '../../../core/utils/string-includes';
import { optionalDecimalPlacesRule } from './rules/optional-decimal-places-rule';
import { patternRemoveEscapedText, patternReplace } from '../../utils/pattern-regexp-utils';

const numberPositionRule = (patternMask: string) => {
    const numberPartRegExp = /(((0+,)?0+(\.([0#X]|\[0+\])+)?){1}|\.([0#X]|\[0+\])+)/;
    return patternReplace(patternMask, numberPartRegExp, `'#n'`);
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
    const decimalPlacesRules = decimalPlacesRule(patternMaskAfterOptionalDecimalPlacesRule);

    const outputPatternMask = patternMaskAfterOptionalDecimalPlacesRule;
    const outputPatternMaskWithoutEscapedText = patternRemoveEscapedText(outputPatternMask);
    const grouping = outputPatternMaskWithoutEscapedText.indexOf(',') > -1;
    const omitInteger = outputPatternMaskWithoutEscapedText.indexOf('.') === 0;

    /**
     * Leading integer digits rule
     * This will define the minimum amount of digits on the integer part (left-most grouped zeroes).
     *     - 12.34 & '0000.0'    =>  '0012.3'
     *     - 12.34 & '0000,0.0'  =>  '0,012.3'
     * 
     * <i> It always pick the left-most amount of zeros, so:
     *     - If pattern has NO thousands separator ('000.0'), then the amount at the left of the DOT is used.
     *     - If pattern HAS thousands separator ('00,0.0'), then the amount at the left of the COMMA is used.
     * 
     * <i> This could be a rule
     */
    const minimumIntegerDigits = (outputPatternMaskWithoutEscapedText.split('.')[0].split(',')[0].match(/0/g) || []).length;

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
        omitInteger,
        patternMask,
    };
};

const parsePattern = memoize(baseParsePattern);

export default parsePattern;
