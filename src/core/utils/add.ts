import multiplyByPowerOfTen from './multiply-by-power-of-ten';
import splitStringInTwoParts from './split-string-in-two-parts';
import numberToNonExponentialString from './number-to-non-exponential-string';

export default (x: number, y: number) => {
    const correctionFactorAsPowerOf10Exponent = Math.max(
        ...[x,y].map(number => splitStringInTwoParts(numberToNonExponentialString(number), '.')[1].length)
    );
    const scaledAddition = multiplyByPowerOfTen(x, correctionFactorAsPowerOf10Exponent) + multiplyByPowerOfTen(y, correctionFactorAsPowerOf10Exponent);
    return multiplyByPowerOfTen(scaledAddition, -correctionFactorAsPowerOf10Exponent);
};
