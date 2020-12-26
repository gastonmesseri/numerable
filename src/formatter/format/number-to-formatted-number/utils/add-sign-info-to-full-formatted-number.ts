import { NumberFormatRules } from '../../../../core/types/rules';

const addSignInfoToFullFormattedNumber = (
    fullFormattedValueWithoutSign: string,
    isValueNegative: boolean,
    patternRules: NumberFormatRules,
): string => {
    const { negativeParentheses, forceSign } = patternRules;

    let output = fullFormattedValueWithoutSign;

    if (negativeParentheses && isValueNegative) {
        output = output.replace(/'#(nps|npe)'/g, match => match === `'#nps'` ? '(' : ')');
    } else if (forceSign) {
        output = output.replace(`'#s'`, isValueNegative ? '-' : '+');
    } else if (isValueNegative) {
        output = output.replace(`'#s'`, '-');
    }

    const cleanOutput = output.replace(/'#(nps|npe|s)'/g, '');

    return cleanOutput;
};

export default addSignInfoToFullFormattedNumber;
