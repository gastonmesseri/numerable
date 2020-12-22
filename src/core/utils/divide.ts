import multiplyByPowerOfTen from './multiply-by-power-of-ten';

const getNumberDigitsLength = (number: number) => (''+number).toString().length;

const divide = (x: number, y: number) => {
    if (y === 0) return x / y; // For Infinity and -Infinity results

    const ATTEMPTS = 10;
    const results: number[] = [];
    for (let i = 0; i < ATTEMPTS; i++) {
        const result = multiplyByPowerOfTen(multiplyByPowerOfTen(x, i) / y, -i);
        results.push(result);
    }

    return results.sort((a, b) => getNumberDigitsLength(a) - getNumberDigitsLength(b))[0];
};

export default divide;
