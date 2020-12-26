import stringIncludes from '../../../../core/utils/string-includes';
import { patternReplace } from '../../../utils/pattern-regexp-utils';

/**
 * What does it look for in the pattern?
 *     '(' | '+' | '-'
 * What does it remove from the pattern?
 *     '(' | ')' | '+' | '-'
 * What options does it provide?
 *     - outputPattern
 *     - shouldWrapNegativeWithinParentheses
 *     - signedPosition
 * How will it transform the output? (respect spaces/positions?)
 *     - Parentheses:
 *         '-23.58' & '(0.00)'  =>  '(23.58)'
 *         '-23.58' & '( 0.00 )'  =>  '( 23.58 )'
 *         '-23.58' & '(  0.00 ) '  =>  ' (  23.58 )'
 * 
 *         Caveats:
 *         '-23.58' & '(0.00'  =>  '(23.58)' (only 1 parenthesys)
 *     - Sign:
 *         '12.34' & '+0.0'  =>  '+12.34'
 *         '-12.34' & '+0.0'  =>  '-12.34'
 * 
 *         Caveats:
 *         <i> At the beggining only if position is exactly 0 (no padding even)
 *         '12.34' & ' +0.0'  =>  '12.34+'  (at the end if position is greater than 0)
 *         '12.34' & '0.+0'  =>  '12.34+'  (at the end if position is greater than 0)
 * 
 * <i> If '+' is somewhere in the pattern, it will set the positive sign for positive numbers (at the start or at the end)
 *     and same for negative numbers.
 * <i> If '-' is somewhere in the pattern but not in the first position, it will only set the negative sign at the end
 *     of the value. But it won't still set the positive for positives.
 * 
 * <i> Checks if we should use parentheses for negative number or if we should prefix with a sign.
 *     If both are present we default to parentheses.
 * 
 * Improvements potential:
 *     Change current signedPosition to null | 'start' | 'end'
 *     Exact position of signs
 *     Exact position of parentheses
 */
export const signRule = (pattern: string) => {
    let negativeParentheses = false;
    let forceSign = false;

    if (stringIncludes(pattern, '(')) {
        negativeParentheses = true;
    } else if (stringIncludes(pattern, '+') || stringIncludes(pattern, '-')) {
        forceSign = pattern.includes('+');
    }

    let outputPatternMask = pattern;
    outputPatternMask = patternReplace(outputPatternMask, '(', `'$nps'`);
    outputPatternMask = patternReplace(outputPatternMask, ')', `'$npe'`);
    outputPatternMask = patternReplace(outputPatternMask, /(-|\+)/, `'$s'`);

    return [outputPatternMask, { negativeParentheses, forceSign }] as const;
};
