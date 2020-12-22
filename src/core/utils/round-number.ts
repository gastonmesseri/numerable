import multiplyByPowerOfTen from './multiply-by-power-of-ten';

export default (number: number, precision?: number, roundingFunction?: (value: number) => number) => {
    const resolvedPrecision = precision || 0;
    const resolvedRoundingFunction = roundingFunction || Math.round;
    const scaledValueForRounding = multiplyByPowerOfTen(number, resolvedPrecision);
    const roundedScaledValue = resolvedRoundingFunction(scaledValueForRounding);
    const roundedValue = multiplyByPowerOfTen(roundedScaledValue, -resolvedPrecision);
    return roundedValue;
};
