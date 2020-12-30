import { AbbreviationScale } from '../../../../core/types/abbreviation-scale';
import { patternIncludes, patternRemoveEscapedText, patternReplace } from '../../../utils/pattern-regexp-utils';

/**
 * Checks if abbreviation is wanted
 * <i> Applied only when 'a' is present.
 * <i> If 'a' is followed by 'k' | 'm' | 'b' | 't', then, it will force the abbreviation to be the specified
 *     unit. (e.g. (123456.78, '0,0.00am')  =>  '0.12M')
 */
const abbreviationRule = (patternMask: string) => {
    let compactUnit: AbbreviationScale | null = null; // force abbreviation
    let compact = false;

    // If it includes 'a' means it should be abbreviated (only if at least includes 'a')
    if (patternIncludes(patternMask, 'a')) {
        compact = true;
        const patternWithoutEscapedText = patternRemoveEscapedText(patternMask);
        const abbreviationRegExpResult = patternWithoutEscapedText.match(/a(k|m|b|t)?/);
        compactUnit = !!abbreviationRegExpResult ? abbreviationRegExpResult[1] as AbbreviationScale : null;
    }

    let outputPatternMask = patternMask;
    outputPatternMask = patternReplace(outputPatternMask, /a(k|m|b|t)?/, `'ɵa'`);

    return [outputPatternMask, { compact, compactUnit, compactAuto: compact && !compactUnit }] as const;
};

export default abbreviationRule;
