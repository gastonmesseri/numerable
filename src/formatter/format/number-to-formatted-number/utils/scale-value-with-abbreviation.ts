import { NumberFormatRules } from '../../../../core/types/rules';
import { AbbreviationScale } from '../../../../core/types/abbreviation-scale';
import multiplyByPowerOfTen from '../../../../core/utils/multiply-by-power-of-ten';
import { ResolvedNumerableFormatNumberOptions } from '../../../types/resolved-format-number-options';
import createUnitScaleFromLocaleAbbreviations from '../../../utils/create-unit-scale-from-locale-abbreviations';

/**
 * If abbreviation is forced, looks for the closest (in terms of power of ten) abbreviation in the current locale
 *     k === 10 ** 3
 *     m === 10 ** 6
 *     b === 10 ** 9
 *     t === 10 ** 12
 */
const resolveForcedAbbreviationUnit = (
    forcedAbbreviationUnit: AbbreviationScale,
    abbreviationsFromLocale: string | undefined,
    value: number,
): [scaledValue: number, abbreviationUnit: string | null] => {
    // Record<AbbreviationSymbol, PowerOfTenExponent>
    const forcedScaleMap = { k: 3, m: 6, b: 9, t: 12 };
    const targetPowerOfTenExponent = forcedScaleMap[forcedAbbreviationUnit];
    const scaleDefinitionFromLocale = abbreviationsFromLocale?.split('|') || [];

    let closestPowerOfTenWithAvailableAbbreviation = null;
    for (let distanceFromTarget = 0; distanceFromTarget < scaleDefinitionFromLocale.length; distanceFromTarget++) {
        if (!scaleDefinitionFromLocale[targetPowerOfTenExponent - distanceFromTarget]) continue;
        closestPowerOfTenWithAvailableAbbreviation = targetPowerOfTenExponent - distanceFromTarget;
        break;
    }

    if (closestPowerOfTenWithAvailableAbbreviation === null) {
        return [value, null];
    }

    return [
        multiplyByPowerOfTen(value, -closestPowerOfTenWithAvailableAbbreviation),
        scaleDefinitionFromLocale[closestPowerOfTenWithAvailableAbbreviation],
    ];
};

const scaleValueWithAbbreviation = (
    value: number,
    patternRules: NumberFormatRules,
    options: ResolvedNumerableFormatNumberOptions,
): [scaledValue: number, abbreviationUnit: string | null] => {
    const { compact, compactUnit } = patternRules;
    const { abbreviations } = options.locale;

    if (!compact) return [value, null];

    if (!!compactUnit) {
        return resolveForcedAbbreviationUnit(compactUnit, abbreviations, value);
    }

    /**
     * If abbreviation is automatic, resolves the abbreviation to the best (where the value has 
     * the fewest numbers before the decimal point, but is still higher than 1).
     */
    const scale = createUnitScaleFromLocaleAbbreviations(abbreviations);
    const [scaledValue, localizedUnit] = scale.toBest(value, '');
    return [scaledValue, localizedUnit || null];
};

export default scaleValueWithAbbreviation;
