import stringIncludes from '../../../../core/utils/string-includes';
import { patternRemoveEscapedText, patternReplace } from '../../../utils/pattern-regexp-utils';

/**
 * What does it look for in the pattern?
 *     '(' | '+' | '-'
 * What does it remove from the pattern?
 *     '(' | ')' | '+' | '-'
 * What options does it provide?
 *     - negativeParentheses (if negative value should be wrapped between parentheses)
 *     - forceSign (is positive values should have a + sign)
 * How will it transform the output?
 *     - Parentheses:
 *         '-23.58' & '(0.00)'  =>  '(23.58)'
 *         '-23.58' & '( 0.00 )'  =>  '( 23.58 )'
 *         '-23.58' & '(  0.00 ) '  =>  ' (  23.58 )'
 *     - Sign:
 *         '12.34' & '+0.0'  =>  '+12.34'
 *         '-12.34' & '+0.0'  =>  '-12.34'
 * 
 * <i> If '+' is somewhere in the pattern, it will set the '+' sign for positive numbers
 *     and same for negative numbers.
 * <i> If '-' is somewhere in the pattern, it will place the negative sign in the defined position.
 *     But it won't still set the sign for positive numbers.
 * <i> Checks if we should use parentheses for negative number or if we should prefix with a sign.
 *     If both are present we default to parentheses.
 */
const signRule = (pattern: string) => {
    const patternWithoutEscapedText = patternRemoveEscapedText(pattern);

    const negativeParentheses = stringIncludes(patternWithoutEscapedText, '(') && stringIncludes(patternWithoutEscapedText, ')');
    const forceSign = !negativeParentheses && stringIncludes(patternWithoutEscapedText, '+');

    let outputPatternMask = pattern;
    outputPatternMask = patternReplace(outputPatternMask, '(', `'#nps'`);
    outputPatternMask = patternReplace(outputPatternMask, ')', `'#npe'`);
    outputPatternMask = patternReplace(outputPatternMask, /(-|\+)/, `'#s'`);

    return [outputPatternMask, { negativeParentheses, forceSign }] as const;
};

export default signRule;
