/**
 * Applies the localized abbreviation unit to the pattern mask
 * <i> If the localized unit is empty (''), it will remove the space between the number and the abbreviation.
 * <i> Replaces the single quotes from the abbreviation, to prevent collision with patternMask escaped text.
 */
const applyAbbreviationLocalizedUnitToPatternMask = (
    patternMask: string,
    abbreviationLocalizedUnit: string,
    hasAbbreviationInPatternMask: boolean,
) => {
    if (!hasAbbreviationInPatternMask) return patternMask;

    const safeAbbreviationLocalizedUnit = abbreviationLocalizedUnit.replace(/'/g, '#ɵ');
    return !!safeAbbreviationLocalizedUnit
        ? patternMask.replace(`'#a'`, safeAbbreviationLocalizedUnit)
        // If has abbreviation but it is empty
        : patternMask.match(/'#n'\s*'#a'/)
            // If abbreviation is before
            ? patternMask.replace(/\s*'#a'/, safeAbbreviationLocalizedUnit)
            // If abbreviation is after
            : patternMask.replace(/'#a'\s*/, safeAbbreviationLocalizedUnit);
};

export default applyAbbreviationLocalizedUnitToPatternMask;
