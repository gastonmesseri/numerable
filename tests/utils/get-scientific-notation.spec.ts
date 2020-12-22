import getScientificNotation from '../../src/core/utils/get-scientific-notation';

describe('getScientificNotation', () => {
    it('should return NaN significand and exponent for non valid input (not a finite number)', () => {
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
        notFiniteNumbersTests.forEach((input) => {
            expect([input, getScientificNotation(input as any)]).toEqual([input, [NaN, NaN]]);
        });
    });

    it('should properly split the number', () => {
        const tests = [
            [2, [2, 0]],
            [2.77, [2.77, 0]],
            [1000.12345e-50, [1.00012345, -47]],
            [1000.12345e+50, [1.00012345, 53]],
            [23e+100, [2.3, 101]],
            [23e-100, [2.3, -99]],
        ];
        tests.forEach(([value, expectedResult]) => {
            expect([value, 0, getScientificNotation(value as any)]).toEqual([value, 0, expectedResult]);
        });
    });
});
