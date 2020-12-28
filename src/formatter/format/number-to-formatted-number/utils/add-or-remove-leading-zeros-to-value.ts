import stringRepeat from '../../../../core/utils/string-repeat';
import { NumberFormatRules } from '../../../../core/types/rules';

/**
 * <i> Add or remove leading zeros
 * Expects: a value integer part as string, without the minus sign. And nothing else but a number at the start.
 * Returns:
 *     - The value with the added or removed leading zeros
 */
const addOrRemoveLeadingZerosToValue = (valueIntegerPartWithoutSign: string, patternRules: NumberFormatRules): string => {
    const { minimumIntegerDigits } = patternRules;

    if (minimumIntegerDigits === 0 && +valueIntegerPartWithoutSign < 1 && +valueIntegerPartWithoutSign > -1) {
        return '';
    }

    return valueIntegerPartWithoutSign.length >= minimumIntegerDigits
        ? valueIntegerPartWithoutSign
        : `${stringRepeat('0', minimumIntegerDigits - valueIntegerPartWithoutSign.length)}${valueIntegerPartWithoutSign}`;
};

export default addOrRemoveLeadingZerosToValue;
