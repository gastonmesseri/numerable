import { formatNumber } from '../../index';
import parse from '../../src/formatter/parse/parse';

describe('format: percentage', () => {
    describe('format', () => {
        it('should format to percentages with 100 upscale default', () => {
            const tests = [
                [0, '0%', '0%'],
                [null, '0 %', ''],
                [1, '0%', '100%'],
                [0.974878234, '0.000%', '97.488%'],
                [-0.43, '0 %', '-43 %'],
                [0.43, '(0.00#%)', '43.00%'],
            ] as const;

            tests.forEach(([value, pattern, expectedResult]) => {
                expect([value, pattern, formatNumber(value, pattern)]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should format to percentages with 100 upscale enforced', () => {
            const tests = [
                [0, '0%', '0%'],
                [null, '0 %', ''],
                [1, '0%', '100%'],
                [0.974878234, '0.000%', '97.488%'],
                [-0.43, '0 %', '-43 %'],
                [0.43, '(0.00#%)', '43.00%'],
                [-8.9, '-0.00%', '-890.00%'],
                [8.9, '+0.00%', '+890.00%'],
                [8.9, '0.00+%', '890.00+%'],
                [-8.9, '0.00+%', '890.00-%'],
                [-8.9, '0.00-%', '890.00-%'],
                [-8.9, '0.00- %', '890.00- %'],
                [8.9, '0.00+ %', '890.00+ %'],
                [43, '(0.00# %)', '4300.00 %'],
                [-43, '(0.00# %)', '(4300.00 %)'],
                [8.9, '(0.00%)', '890.00%'],
                [-8.9, '(0.00%)', '(890.00%)'],
            ] as const;

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = formatNumber(value, pattern, { scalePercentBy100: true });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });
        it('should format to percentages without 100 upscale', () => {
            const tests = [
                [0, '0%', '0%'],
                [null, '0 %', ''],
                [1, '0%', '1%'],
                [97.4878234, '0.000%', '97.488%'],
                [-43.0, '0 %', '-43 %'],
                [43, '(0.00# %)', '43.00 %'],
                [-43, '(0.00# %)', '(43.00 %)'],
                [8.9, '(0.00%)', '8.90%'],
                [-8.9, '(0.00%)', '(8.90%)'],
            ] as const;

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = formatNumber(value, pattern, { scalePercentBy100: false });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });
    });

    describe('unformat', () => {
        it('should unformat to percentages with 100 downscale default', () => {
            const tests = [
                ['0%', 0],
                ['100%', 1],
                ['97.488%', 0.97488],
                ['-43 %', -0.43],
                ['43.00%', 0.43],
                ['(43.00%)', -0.43],
                ['43.00- %', -0.43],
                ['43.00+ %', 0.43],
                ['+43.00 %', 0.43],
                ['-43.00 %', -0.43],
                ['-43.00%', -0.43],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });

        it('should unformat to percentages without 100 downscale', () => {
            const tests = [
                ['0%', 0],
                ['100%', 100.0],
                ['97.488%', 97.488],
                ['-43 %', -43.0],
                ['43.00%', 43.0],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString, { scalePercentBy100: false })])
                    .toEqual([formattedString, expectedResult]);
            });
        });

        it('should unformat to percentages with 100 downscale enforced', () => {
            const tests = [
                ['0%', 0],
                ['100%', 1],
                ['97.488%', 0.97488],
                ['-43 %', -0.43],
                ['43.00%', 0.43]
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString, { scalePercentBy100: true })])
                    .toEqual([formattedString, expectedResult]);
            });
        });
    });
});
