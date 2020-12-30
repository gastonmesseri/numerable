/**
 * Applies the localized abbreviation unit to the pattern mask
 * <i> If the localized unit is empty (''), it will remove the space between the number and the abbreviation.
 * <i> Replaces the single quotes from the abbreviation, to prevent collision with patternMask escaped text.
 */
const applyAbbreviationLocalizedUnitToPatternMask = (
    patternMask: string,
    abbreviationLocalizedUnit: string | null,
    hasAbbreviationInPatternMask: boolean,
) => {
    if (!hasAbbreviationInPatternMask) return patternMask;


    if (abbreviationLocalizedUnit) {
        /**
         * If it has abbreviation in the rules, and has a valid unit (e.g. K | M | B | T, or 
         * other localized one), escapes the single quotes in the localized abbreviation unit and appends to the mask.
         */
        return patternMask.replace(`'#a'`, _ => `'${abbreviationLocalizedUnit.replace(/'/g, _ => "\\'")}'`);
    } else {
        // If it has abbreviation in the rules, but it has no unit, removes the space between abbreviation and number
        return patternMask.match(/'#n'\s*'#a'/)
            // If abbreviation is before
            ? patternMask.replace(/\s*'#a'/, '')
            // If abbreviation is after
            : patternMask.replace(/'#a'\s*/, '');
    }
};

export default applyAbbreviationLocalizedUnitToPatternMask;
