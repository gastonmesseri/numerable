import multiplyByPowerOfTen from '../../src/core/utils/multiply-by-power-of-ten';

describe('multiplyByPowerOfTen', () => {
    const notFiniteNumbersTests = [
        '',
        'a',
        Infinity,
        -Infinity,
        null,
        undefined,
        NaN,
        {},
        [],
        true,
        false,
    ];

    it('should return NaN for non valid input (not a finite number)', () => {
        notFiniteNumbersTests.forEach((input) => {
            expect([input, 0, multiplyByPowerOfTen(input as any, 0)]).toEqual([input, 0, NaN]);
        });
    });

    it('should properly scale the number', () => {
        const tests = [
            [99, 1, 990],
            [-99, 1, -990],
            [9950, 2, 995000],
            [-9950, 2, -995000],
            [12345, 3, 12345000],
            [-12345, 3, -12345000],
            [12345, 10, 123450000000000],
            [-12345, 10, -123450000000000],
            [1, 15, 1000000000000000],
            [-1, 15, -1000000000000000],
            [1, 200, 1e+200],
            [-1, 200, -1e+200],
            [100, 250, 1e+252],
            [-100, 250, -1e+252],
            [10, -2, 0.1],
            [-10, -2, -0.1],
            [1234, -2, 12.34],
            [-1234, -2, -12.34],
            [99, -1, 9.9],
            [-99, -1, -9.9],
            [9950, -2, 99.5],
            [-9950, -2, -99.5],
            [12345, -3, 12.345],
            [-12345, -3, -12.345],
            [12345, -10, 0.0000012345],
            [-12345, -10, -0.0000012345],
            [1, -200, 1e-200],
            [-1, -200, -1e-200],
            [100, -250, 1e-248],
            [-100, -250, -1e-248],
        ];
        tests.forEach(([value, addedExponent, expectedResult]) => {
            expect([value, addedExponent, multiplyByPowerOfTen(value, addedExponent)]).toEqual([value, addedExponent, expectedResult]);
        });
    });

    it('should properly scale numbers that can only be represented with an exponent', () => {
        const tests = [
            [99e+50, 1, 99e+51],
            [-99e+50, 1, -99e+51],
            [99e+50, 50, 99e+100],
            [-99e+50, 50, -99e+100],
            [99e+100, -7, 99e+93],
            [-99e+100, -7, -99e+93],
            [1.234e-100, 1, 1.234e-99],
            [-1.234e-100, 1, -1.234e-99],
            [1.234e-100, 50, 1.234e-50],
            [-1.234e-100, 50, -1.234e-50],
            [1.234e-100, -50, 1.234e-150],
            [-1.234e-100, -50, -1.234e-150],
        ];
        tests.forEach(([value, addedExponent, expectedResult]) => {
            expect([value, addedExponent, multiplyByPowerOfTen(value, addedExponent)]).toEqual([value, addedExponent, expectedResult]);
        });
    });
});
