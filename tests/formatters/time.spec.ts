import parse from '../../src/parse';
import format from '../../src/format';

describe('format: time', () => {
    describe('format', () => {
        it('should format to time', () => {
            const tests: [number | null, string, string][] = [
                [0, '00:00:00', '0:00:00'],
                [null, '00:00:00', ''],
                [25, '00:00:00', '0:00:25'],
                [-25, '00:00:00', '-0:00:25'],
                [238, '00:00:00', '0:03:58'],
                [-238, '00:00:00', '-0:03:58'],
                [63846, '00:00:00', '17:44:06'],
                [-63846, '00:00:00', '-17:44:06'],
                [37, '00:00:00', '0:00:37'],
                [-37, '00:00:00', '-0:00:37'],
                [520, '00:00', '0:08:40'],
                [-520, '00:00', '-0:08:40'],
                [48923, '00:00', '13:35:23'],
                [-48923, '00:00', '-13:35:23'],
                // Passing seconds (and decimal)
                [419.5, '00:00', '0:06:59'],
                [420.5, '00:00', '0:07:00'],
                [421.5, '00:00', '0:07:01'],
                // Passing negative seconds (and decimal)
                [-419.5, '00:00', '-0:06:59'],
                [-420.5, '00:00', '-0:07:00'],
                [-421.5, '00:00', '-0:07:01'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                expect([value, pattern, format(value, pattern)]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should unformat to time', function() {
            const tests = [
                ['00:25', 25],
                ['-00:25', -25],
                ['01:25', 85],
                ['-01:25', -85],
                ['10:25', 625],
                ['-10:25', -625],
                ['0:00:00', 0],
                ['-0:00:00', 0],
                ['0:00:25', 25],
                ['-0:00:25', -25],
                ['0:03:58', 238],
                ['-0:03:58', -238],
                ['17:44:06', 63846],
                ['-17:44:06', -63846],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });
    });
});
