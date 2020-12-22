import { Nil } from '../../core/types/nil';
import { signRule } from './rules/sign-rule';
import memoize from '../../core/utils/memoize';
import isString from '../../core/utils/is-string';
import { NumberFormatRules } from '../../core/types/rules';
import { abbreviationRule } from './rules/abbreviation-rule';
import { decimalPlacesRule } from './rules/decimal-places-rule';
import { optionalDecimalPlacesRule } from './rules/optional-decimal-places-rule';

/**
 * This function should be pure (it is memoized)
 */
const parsePattern = (inputPattern: string | Nil): NumberFormatRules => {
    const resolvedInputPattern = isString(inputPattern) && inputPattern || '0,0.##########';

    const [patternAfterSignRule, signRules] = signRule(resolvedInputPattern);
    const [patternAfterAbbreviationRule, abbreviationRules] = abbreviationRule(patternAfterSignRule);
    const [patternAfterDecimalPlacesRules, optionalDecimalPlacesRules] = optionalDecimalPlacesRule(patternAfterAbbreviationRule);
    const outputPattern = patternAfterDecimalPlacesRules;
    const decimalPlacesRules = decimalPlacesRule(outputPattern);
    const grouping = outputPattern.indexOf(',') > -1;
    const omitInteger = outputPattern.indexOf('.') === 0;

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
    const minimumIntegerDigits = (outputPattern.split('.')[0].split(',')[0].match(/0/g) || []).length;

    return {
        ...signRules,
        ...abbreviationRules,
        ...optionalDecimalPlacesRules,
        ...decimalPlacesRules,
        grouping,
        minimumIntegerDigits,
        omitInteger,
    };
};

export default memoize(parsePattern);
