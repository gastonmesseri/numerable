import { NumberFormatRules } from '../../../../core/types/rules';
import { patternReplace } from '../../../utils/pattern-regexp-utils';

const addSignInfoToFullFormattedNumber = (
    fullFormattedValueWithoutSign: string,
    isValueNegative: boolean,
    patternRules: NumberFormatRules,
): string => {
    const { negativeParentheses, forceSign } = patternRules;

    let output = fullFormattedValueWithoutSign;

    if (negativeParentheses && isValueNegative) {
        let outputWithParentheses = output;
        outputWithParentheses = patternReplace(outputWithParentheses, `'$nps'`, '(');
        outputWithParentheses = patternReplace(outputWithParentheses, `'$npe'`, ')');
        output = outputWithParentheses;
    } else if (forceSign) {
        const sign = isValueNegative ? '-' : '+';
        output = patternReplace(output, `'$s'`, sign);
    } else if (isValueNegative) {
        output = patternReplace(output, `'$s'`, '-');
    }

    let cleanOutput = output;
    cleanOutput = patternReplace(cleanOutput, `'$nps'`, '', 'g');
    cleanOutput = patternReplace(cleanOutput, `'$npe'`, '', 'g');
    cleanOutput = patternReplace(cleanOutput, `'$s'`, '', 'g');

    return cleanOutput;
};

export default addSignInfoToFullFormattedNumber;
