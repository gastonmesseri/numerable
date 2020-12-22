import { NumberFormatRules } from '../../../core/types/rules';

const addSignInfoToFullFormattedNumber = (
    fullFormattedValueWithoutSign: string,
    isValueNegative: boolean,
    abbreviationSuffix: string,
    patternRules: NumberFormatRules,
): string => {
    const { negativeParentheses, signPosition, forceSign } = patternRules;

    let output = fullFormattedValueWithoutSign;

    if (negativeParentheses) {
        output = isValueNegative ? `(${output})` : output;
    } else {
        const sign = isValueNegative ? '-' : '+';

        if (signPosition === 'start') {
            if (forceSign) {
                output = sign + output;
            } else if (isValueNegative) {
                output = '-' + output;
            }
        } else {
            const numberPart = abbreviationSuffix ? output.replace(abbreviationSuffix, '') : output;
            if (forceSign) {
                output = numberPart + sign + abbreviationSuffix;
            } else if (isValueNegative) {
                output = numberPart + '-' + abbreviationSuffix;
            }
        }
    }

    return output;
};

export default addSignInfoToFullFormattedNumber;
