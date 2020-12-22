import multiplyByPowerOfTen from './multiply-by-power-of-ten';
import splitStringInTwoParts from './split-string-in-two-parts';
import numberToNonExponentialString from './number-to-non-exponential-string';

export default (x: number, y: number) => {
    const xDecimalPartAsString = splitStringInTwoParts(numberToNonExponentialString(x), '.')[1];
    const yDecimalPartAsString = splitStringInTwoParts(numberToNonExponentialString(y), '.')[1];
    const correctionFactorAsPowerOf10Exponent = Math.max(xDecimalPartAsString.length, yDecimalPartAsString.length);
    const scaledMultiplication = multiplyByPowerOfTen(x, correctionFactorAsPowerOf10Exponent) * multiplyByPowerOfTen(y, correctionFactorAsPowerOf10Exponent);
    return multiplyByPowerOfTen(scaledMultiplication, -(correctionFactorAsPowerOf10Exponent + correctionFactorAsPowerOf10Exponent));
};
