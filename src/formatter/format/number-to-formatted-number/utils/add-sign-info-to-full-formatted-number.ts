import { NumberFormatRules } from '../../../../core/types/rules';

const addSignInfoToFullFormattedNumber = (
    fullFormattedValueWithoutSign: string,
    isValueNegative: boolean,
    isValueZero: boolean,
    patternRules: NumberFormatRules,
): string => {
    const { negativeParentheses, forceSign } = patternRules;

    let output = fullFormattedValueWithoutSign;

    if (negativeParentheses && isValueNegative) {
        output = output.replace(/'ɵ(nps|npe)'/g, match => match === `'ɵnps'` ? '(' : ')');
    } else if (forceSign) {
        output = output.replace(`'ɵs'`, isValueNegative ? '-' : isValueZero ? '' : '+');
    } else if (isValueNegative) {
        output = output.replace(`'ɵs'`, '-');
    }

    return output;
};

export default addSignInfoToFullFormattedNumber;
