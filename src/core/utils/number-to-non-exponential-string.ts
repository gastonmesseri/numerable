import stringRepeat from './string-repeat';
import splitStringInTwoParts from './split-string-in-two-parts';

/**
 * Like Number.prototype.toString() but excluding the exponential info for small and big numbers.
 * e.g. 
 *     Small numbers:
 *         value: 0.0000000000001234 (1.234e-13)
 *         toString() => "1.234e-13"
 *         numberToStringWithoutExponent() => "0.0000000000001234"
 *     Big numbers:
 *         value: 1234123412341230000000 (1.234123412341234e+21)
 *         toString() => "1.234123412341234e+21"
 *         numberToStringWithoutExponent() => "1234123412341230000000"
 */
export default (value: number) => {
    const valueAsString = (value || 0).toString();

    // Do it here all the process
    const valueAsStringHasExponentialInfo = valueAsString.indexOf('e') >= 0;

    if (!valueAsStringHasExponentialInfo) return valueAsString;

    // If the toString returns an exponential number
    const [significand, exponent] = splitStringInTwoParts(valueAsString, 'e');
    const exponentAsNumber = +exponent;
    let output = valueAsString;

    if (exponentAsNumber >= 0) {
        // Positive exponents (big numbers)
        output = formatPositiveExponentResult(output);
    } else {
        // Negative exponents (small numbers) only equal or smaller than -1
        const negativeExponentAbsoluteValue = Math.abs(exponentAsNumber);
        const [integerPartOfSignificand, fractionalPartOfSignificand] = splitStringInTwoParts(significand, '.');
        const absoluteIntegerPartOfSignificand = integerPartOfSignificand[0] === '-' ? integerPartOfSignificand.slice(1) : integerPartOfSignificand;
        let outputIntegerPartOfSignificand = absoluteIntegerPartOfSignificand;
        let outputFractionalPartOfSignificand = fractionalPartOfSignificand;
        for (let i = 0; i < negativeExponentAbsoluteValue; i += 1) {
            // Consider using array.shift
            const firstCharInIntegerPart = outputIntegerPartOfSignificand[0] || '';
            outputIntegerPartOfSignificand = outputIntegerPartOfSignificand.slice(0, outputIntegerPartOfSignificand.length - 1);
            outputFractionalPartOfSignificand = (firstCharInIntegerPart || '0') + outputFractionalPartOfSignificand;
        }
        output = `${value < 0 ? '-' : ''}${outputIntegerPartOfSignificand || 0}.${outputFractionalPartOfSignificand}`;
    }

    return output;
};

/**
 * The result from toFixed can contain an exponent for big numbers (e.g. 1.12345671234567e+50).
 * So far, only for positive exponents.
 * <!> Only handles positive exponents.
 */
const formatPositiveExponentResult = (valueAsString: string) => {
    const [significand, exponent] = splitStringInTwoParts(valueAsString, 'e');
    const exponentAsNumber = +exponent;
    if (exponentAsNumber < 0) return valueAsString;

    const [integerPartOfSignificand, fractionalPartOfSignificand] = splitStringInTwoParts(significand, '.');
    const numberOfZerosToAdd = exponentAsNumber - fractionalPartOfSignificand.length;
    return `${integerPartOfSignificand}${fractionalPartOfSignificand}${stringRepeat('0', numberOfZerosToAdd)}`;
};
