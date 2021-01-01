import parse from '../../src/parse';
import format from '../../src/format';

describe('format: exponential', () => {
    describe('format', () => {
        it('should format to exponential notation', () => {
            const tests: [number | null, string, string][] = [
                [0, '0e+0', '0e+0'],
                [null, '0e+0', ''],
                [1, '0e+0', '1e+0'],
                [77.1234, '0.0e+0', '7.7e+1'],
                [0.000000771234, '0.0e-0', '7.7e-7'],
                [-0.000000771234, '0.00e-0', '-7.71e-7'],
                [77.1234, '0.000e+0', '7.712e+1'],
                [-1000830298, '0.0###e+0', '-1.0008e+9'],
                [1, '0E+0', '1e+0'],
                [1, '0E-0', '1e+0'],
                [1, '0 E-0', '1 e+0'],
                [1, '0   E-0', '1   e+0'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });
    });

    describe('unformat', () => {
        it('should unformat to exponential notation', () => {
            const tests = [
                ['0e+0', 0],
                ['1e+0', 1],
                ['7.712e+1', 77.12],
                ['7.7e-7', 0.00000077],
                ['-7.71e-6', -0.00000771],
                ['-1.0008e+9', -1000800000],
                ['(6.6e-6)', -0.0000066],
                ['-6.6e-6', -0.0000066],
                ['6.6e-6-', -0.0000066],
                ['6.6e-6+', 0.0000066],
                ['6.6e-300', 6.6e-300],
                ['6.6e+300', 6.6e+300],
                ['6.6E+300', 6.6e+300],
                ['6.6E-300', 6.6e-300],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });
    });
});
