import isFiniteNumber from './is-finite-number';

/**
 * Optimized for performance
 */
const multiplyByPowerOfTen = (number: number, powerOfTenExponent: number) => {
    if (!isFiniteNumber(number)) return NaN;

    const numAsString = '' + number;
    const indexOfE = numAsString.indexOf('e');
    if (indexOfE === -1) {
        return +(numAsString + 'e' + powerOfTenExponent);
    } else {
        return +(numAsString.slice(0, indexOfE) + 'e' + (+numAsString.slice(indexOfE + 1) + powerOfTenExponent));
    }
};

export default multiplyByPowerOfTen;
