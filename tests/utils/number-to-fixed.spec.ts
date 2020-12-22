import chance from 'chance';
import numberToFixed from '../../src/core/utils/number-to-fixed';
import truncateNumber from '../../src/core/utils/truncate-number';

describe('numberToFixed', () => {
    it('should round 5 properly (ceiling, both positive and negative, with Math.round)', () => {
        const tests = [
            [0.615, 2, '0.62'],
            [0.6151, 2, '0.62'],
            [0.6149, 2, '0.61'],
            [-0.615, 2, '-0.61'],
            [-0.6151, 2, '-0.62'],
            [-0.6149, 2, '-0.61'],
        ] as const;

        tests.forEach(([value, fractionDigits, expectedResult]) => {
            const result = numberToFixed(value, fractionDigits, Math.round);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });

    it('should add trailing zeros if required', () => {
        const tests = [
            [0.615, 10, '0.6150000000'],
            [-0.615, 10, '-0.6150000000'],
            [10300500.615, 8, '10300500.61500000'],
            [-10300500.615, 8, '-10300500.61500000'],
            [10999999, 3, '10999999.000'],
            [-10999999, 3, '-10999999.000'],
        ] as const;

        tests.forEach(([value, fractionDigits, expectedResult]) => {
            const result = numberToFixed(value, fractionDigits, Math.round);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });

    it('should apply the different passed rounding functions', () => {
        const tests = [
            [0.615, 2, Math.round, '0.62'],
            [0.615, 2, Math.ceil, '0.62'],
            [0.615, 2, Math.floor, '0.61'],
            [0.615, 2, truncateNumber, '0.61'],
            [-0.615, 2, Math.round, '-0.61'],
            [-0.615, 2, Math.ceil, '-0.61'],
            [-0.615, 2, Math.floor, '-0.62'],
            [-0.615, 2, truncateNumber, '-0.61'],
        ] as const;

        tests.forEach(([value, fractionDigits, roundingFunction, expectedResult]) => {
            const result = numberToFixed(value, fractionDigits, roundingFunction);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });

    it('should not change the value of the original number if enough fractionDigits are available', () => {
        [...Array(100)].forEach(() => {
            const randomNumber = chance().floating({ min: 0, max: 100000, fixed: 5 });
            const result = numberToFixed(randomNumber, 6, Math.round);
            const resultAsNumber = Number(result);
            expect([resultAsNumber]).toEqual([randomNumber]);
            expect(typeof result).toBe('string');
        });
    });

    it('should handle optional decimals', () => {
        // Implement
    });


    // it('should properly format small exponential numbers with fixed decimals', () => {
    //     const tests: any[] = [
    //         [0.000000012345, '0.00000000', '0.00000001'],
    //         [0.000000012345, '0.000000000', '0.000000012'],
    //         [0.000000012345, '0.0000000000', '0.0000000123'],
    //         [0.000000012345, '0.00000000000', '0.00000001235'], // Rounding up
    //         [0.000000012345, '0.000000000000', '0.000000012345'],
    //         [0.000000012345, '0.0000000000000', '0.0000000123450'],
    //         [0.000000012345, '0.00000000000000', '0.00000001234500'],
    //         [0.000000012345, '0.000000000000000', '0.000000012345000'],
    //         [0.000000012345, '0.0000000000000000', '0.0000000123450000'],
    //         [0.000000012345, '0.00000000000000000', '0.00000001234500000'],
    //     ];

    //     tests.forEach(([value, pattern, expectedResult]) => {
    //         const result = formatNumber(value, pattern);
    //         expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
    //         expect(typeof result).toBe('string');
    //     });
    // });

    // it('should properly format small exponential numbers with optional decimals', () => {
    //     // Implement
    // });

    // it('should properly format small exponential numbers with BOTH fixed and optional decimals', () => {
    //     // Implement
    // });

    //     it('should properly format big exponential numbers with BOTH fixed and optional decimals', () => {
    //         // Implement
    //     });
});
