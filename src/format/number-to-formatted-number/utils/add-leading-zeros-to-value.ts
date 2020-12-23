import stringRepeat from '../../../core/utils/string-repeat';
import { NumberFormatRules } from '../../../core/types/rules';

/**
 * <i> Adds leading zeros
 * Expects: a value integer part as string, without the minus sign. And nothing else but a number at the start.
 * Returns:
 *     - The value with the added leading zeros
 */
const addLeadingZerosToValue = (valueIntegerPartWithoutSign: string, patternRules: NumberFormatRules): string => {
    const { minimumIntegerDigits } = patternRules;

    return valueIntegerPartWithoutSign.length >= minimumIntegerDigits
        ? valueIntegerPartWithoutSign
        : `${stringRepeat('0', minimumIntegerDigits - valueIntegerPartWithoutSign.length)}${valueIntegerPartWithoutSign}`;
};

export default addLeadingZerosToValue;
