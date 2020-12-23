import stringIncludes from '../../../../core/utils/string-includes';
import { AbbreviationScale } from '../../../../core/types/abbreviation-scale';

/**
 * Checks if abbreviation is wanted
 * <i> Applied only when 'a' is present.
 * <i> If 'a' is followed by 'k' | 'm' | 'b' | 't', then, it will force the abbreviation to be the specified
 *     measure. (e.g. 123456.78 & '0,0.00am  =>  '0.12m')
 */
export const abbreviationRule = (pattern: string) => {
    let outputPattern = pattern;
    let compactUnit: AbbreviationScale | null = null; // force abbreviation
    let compact = false;
    let compactSpace = false;

    // If it includes 'a' means it should be abbreviated (only if at least includes 'a')
    if (stringIncludes(pattern, 'a')) {
        compact = true;

        const abbreviationRegExpResult = pattern.match(/a(k|m|b|t)?/);

        compactUnit = !!abbreviationRegExpResult ? abbreviationRegExpResult[1] as AbbreviationScale : null;

        let abbreviationSuffix: string = '';

        // check for space before abbreviation
        if (stringIncludes(pattern, ' a')) {
            compactSpace = true;
            abbreviationSuffix = ' ';
        }

        outputPattern = pattern.replace(new RegExp(abbreviationSuffix + 'a[kmbt]?'), '');
    }

    return [outputPattern, { compact, compactSpace, compactUnit, compactAuto: compact && !compactUnit }] as const;
};
