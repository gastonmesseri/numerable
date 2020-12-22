import isNil from './is-nil';
import roundNumber from './round-number';
import stringRepeat from './string-repeat';
import splitStringInTwoParts from './split-string-in-two-parts';
import numberToNonExponentialString from './number-to-non-exponential-string';

const addTrailingZerosInFractionalPart = (valueAsString: string, minimumFractionDigits: number) => {
    const [integerPart, fractionalPart] = splitStringInTwoParts(valueAsString, '.');
    return `${integerPart}.${fractionalPart + stringRepeat('0', minimumFractionDigits - fractionalPart.length)}`;
};

/**
 * Implementation of Number.prototype.toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 * 
 * <!> This function should only receive a finite number, never NaN, Infinity or -Infinity
 * <i> This function should return always a JS string representation of a number, but without exponent.
 * <i> optionalFractionDigits means: from the fractionDigits amount, the ones that are optional.
 */
export default (
    finiteNumber: number,
    fractionDigits: number,
    roundingFunction: (num: number) => number,
    optionalFractionDigits?: number,
): string => {
    const valueAsString = numberToNonExponentialString(finiteNumber);
    const minimumFractionDigits = fractionDigits - (optionalFractionDigits || 0);
    const fractionalPartOfValueAsString = splitStringInTwoParts(valueAsString, '.')[1];
    const targetFractionDigitsAmount = !!fractionalPartOfValueAsString
        ? Math.min(Math.max(fractionalPartOfValueAsString.length, minimumFractionDigits), fractionDigits)
        : minimumFractionDigits;

    const roundedValue = roundNumber(finiteNumber, targetFractionDigitsAmount, roundingFunction);

    let output = numberToNonExponentialString(roundedValue);

    // Add trailing zeros if needed
    if (!!minimumFractionDigits) {
        output = addTrailingZerosInFractionalPart(output, minimumFractionDigits);
    }

    if (!isNil(optionalFractionDigits) && optionalFractionDigits > fractionDigits - targetFractionDigitsAmount) {
        const optionalsRegExp = new RegExp('\\.?0{1,' + (optionalFractionDigits - (fractionDigits - targetFractionDigitsAmount)) + '}$');
        output = output.replace(optionalsRegExp, '');
    }

    return output;
};
