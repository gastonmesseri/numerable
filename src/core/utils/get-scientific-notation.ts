import isFiniteNumber from './is-finite-number';
import splitStringInTwoParts from './split-string-in-two-parts';

/**
 * Returns the significand and exponent (in scientific notation) of the provided number.
 * Returns [significand: number, exponent: number]
 */
export default (number: number): [significand: number, exponent: number] => {
    if (!isFiniteNumber(number)) return [NaN, NaN];
    const [significand, exponent] = splitStringInTwoParts('' + number, 'e');
    return [+significand, +exponent];
};
