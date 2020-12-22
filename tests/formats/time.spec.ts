import { formatNumber } from '../../index';
import parse from '../../src/formatter/parse/parse';

describe('format: time', () => {
    describe('format', () => {
        it('should format to time', () => {
            const tests: [number | null, string, string][] = [
                [0, '00:00:00', '0:00:00'],
                [null, '00:00:00', ''],
                [25, '00:00:00', '0:00:25'],
                [238, '00:00:00', '0:03:58'],
                [63846, '00:00:00', '17:44:06'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = formatNumber(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should unformat to time', function() {
            const tests = [
                ['00:25', 25],
                ['01:25', 85],
                ['10:25', 625],
                ['0:00:00', 0],
                ['0:00:25', 25],
                ['0:03:58', 238],
                ['17:44:06', 63846],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });
    });
});
