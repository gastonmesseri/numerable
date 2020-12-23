import { NumberFormatRules } from '../../../core/types/rules';
import { ResolvedNumerableFormatNumberOptions } from '../../../formatter/types/resolved-format-number-options';

const addThousandsSeparatorToValueIntegerPart = (
    valueIntegerPartWithLeadingZerosAndWithoutSign: string,
    patternRules: NumberFormatRules,
    options: ResolvedNumerableFormatNumberOptions,
): string => {
    const { delimiters, digitGroupingStyle } = options.locale;
    const { grouping } = patternRules;

    if (!grouping || !delimiters.thousands) {
        return valueIntegerPartWithLeadingZerosAndWithoutSign;
    }

    const valueAsString = valueIntegerPartWithLeadingZerosAndWithoutSign;
    const thousandsSeparator = delimiters.thousands;
    const digitGrouping = !!digitGroupingStyle?.length ? digitGroupingStyle : [3];

    const restDigitGrouping = [...digitGrouping];
    let output = '';
    let groupingSubIteration = 1;
    for (let i = valueAsString.length - 1; i >= 0; i--) {
        if (groupingSubIteration === restDigitGrouping[0] && i !== 0) {
            output = thousandsSeparator + valueAsString[i] + output;
            if (restDigitGrouping.length > 1) restDigitGrouping.shift();
            groupingSubIteration = 1;
        } else {
            output = valueAsString[i] + output;
            groupingSubIteration += 1;
        }
    }

    return output;
};

export default addThousandsSeparatorToValueIntegerPart;
