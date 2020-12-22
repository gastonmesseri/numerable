import numberToNonExponentialString from '../../src/core/utils/number-to-non-exponential-string';

describe('numberToNonExponentialString', () => {
    it('should handle non exponential numbers (normal numbers)', () => {
        const tests = [
            [100.25, '100.25'],
            [100555999.88, '100555999.88'],
            [999.123, '999.123'],
            [100222333, '100222333'],
            [0.0000000025, '0.0000000025'],
        ] as const;

        tests.forEach(([value, expectedResult]) => {
            const result = numberToNonExponentialString(value);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });

    it('should handle small numbers', () => {
        const tests = [
            [0.0000000000001234, '0.0000000000001234'],
            [0.00000000000001234, '0.00000000000001234'],
            [0.000000000000002345, '0.000000000000002345'],
            [0.0000000000000003456, '0.0000000000000003456'],
            [0.00000000000000000004567, '0.00000000000000000004567'],
            [0.0000000000000000000000056781234, '0.0000000000000000000000056781234'],
            [0.0000000000000000000000000000000000000000000000056781234, '0.0000000000000000000000000000000000000000000000056781234'],
        ] as const;

        tests.forEach(([value, expectedResult]) => {
            const result = numberToNonExponentialString(value);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });

    it('should handle big numbers', () => {
        const tests: any[] = [
            [1234123412341230000000, '1234123412341230000000'],
            [12341234123412300000000, '12341234123412300000000'],
            [123412341234123000000000, '123412341234123000000000'],
            [9934123412341230000000000, '9934123412341230000000000'],
            [99341234123412300000000000000, '99341234123412300000000000000'],
            [993412341234123000000000000000000, '993412341234123000000000000000000'],
            [99341234123412300000000000000000000000000, '99341234123412300000000000000000000000000'],
            [993412341234123000000000000000000000000000000000000000000, '993412341234123000000000000000000000000000000000000000000'],
            [553412341234123000000000000000000000000000000000000000000, '553412341234123000000000000000000000000000000000000000000'],
            [229912341234123000000000000000000000000000000000000000000, '229912341234123000000000000000000000000000000000000000000'],
        ];

        tests.forEach(([value, expectedResult]) => {
            const result = numberToNonExponentialString(value);
            expect([value, result]).toEqual([value, expectedResult]);
            expect(typeof result).toBe('string');
        });
    });
});
