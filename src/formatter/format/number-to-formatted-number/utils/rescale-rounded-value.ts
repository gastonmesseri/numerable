import { NumberFormatRules } from '../../../../core/types/rules';
import { ResolvedNumerableFormatNumberOptions } from '../../../types/resolved-format-number-options';
import createUnitScaleFromLocaleAbbreviations from '../../../utils/create-unit-scale-from-locale-abbreviations';

/**
 * This process only is applied for automatic abbreviation ('a'), and only in the rounding
 * bubbling cases where the scale has to be recomputed.
 * E.g. 
 *     formatNumber(999960, 0.0a') // Would return '1000.0k' instead of '1.0m' without this rescaling-fix
 * 
 * It only applies rescaling if the absolute value of 'the already scaled and rounded value' (1.87, 'k') is greater or 
 * equal to 1000, and the abbreviation is not greater or equal to trillion.
 * 
 * <i> After initial scaling, value shouldn't be greater than 1000, unless it is a trillion.
 * <i> The resulting decimal part, will be always 0, as this will be executed only on the corner cases, 
 *     that results from rounding bubbling. This is why decimal part is ignored.
 */
const rescaleRoundedValue = (
    value: number,
    currentAbbreviationScale: string | null,
    patternRules: NumberFormatRules,
    options: ResolvedNumerableFormatNumberOptions,
): [scaledValue: number, abbreviationUnit: string | null] => {
    const { compact, compactAuto } = patternRules;
    const { abbreviations } = options.locale;

    if (!compact || !compactAuto) {
        return [value, currentAbbreviationScale];
    }

    const scale = createUnitScaleFromLocaleAbbreviations(abbreviations);
    const [newScaledValue, newScaledValueUnit] = scale.toBest(value, currentAbbreviationScale || '');
    return [newScaledValue, newScaledValueUnit];
};

export default rescaleRoundedValue;
