import { NumberFormatRules } from '../../../../core/types/rules';
import numberToFixed from '../../../../core/utils/number-to-fixed';
import { ResolvedNumerableFormatNumberOptions } from '../../../types/resolved-format-number-options';

const roundValueAndAddTrailingZeros = (value: number, patternRules: NumberFormatRules, options: ResolvedNumerableFormatNumberOptions) => {
    const { rounding } = options;
    const { minimumFractionDigits, maximumFractionDigits } = patternRules;
    const resolvedRoundingFunction = rounding || Math.round;

    const shouldIncludeDecimalPlaces = minimumFractionDigits > 0 || maximumFractionDigits > 0;

    if (shouldIncludeDecimalPlaces) {
        const optionalDecimalDigitsCount = maximumFractionDigits - minimumFractionDigits;
        return numberToFixed(value, maximumFractionDigits, resolvedRoundingFunction, optionalDecimalDigitsCount);
    } else {
        return numberToFixed(value, 0, resolvedRoundingFunction);
    }
};

export default roundValueAndAddTrailingZeros;
