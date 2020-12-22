import { format } from '../../src';
import parse from '../../src/formatter/parse/parse';

describe('format: bytes', () => {
    describe('format', () => {
        it('should format to bytes', () => {
            const decimal = 1000;
            const binary = 1024;
            const tests: [number | null, string, string][] = [
                [0, '0b', '0B'],
                [null, '0 b', ''],
                [100, '0b', '100B'],
                [1048, '0 ib', '1 KiB'],
                [-1048, '0 ib', '-1 KiB'],
                [-1048, '-0 ib', '-1 KiB'],
                [1048, '+0 ib', '+1 KiB'],
                [1048, '0- ib', '1 KiB'],
                [-1048, '0- ib', '1- KiB'],
                [1048, '0+ ib', '1+ KiB'],
                [-1048, '0+ ib', '1- KiB'],
                [1048, '(0 ib)', '1 KiB'],
                // TODO: Handle this case
                // [-1048, '(0 ib)', '(1 KiB)'],
                [binary * 2, '0 ib', '2 KiB'],
                [Math.pow(binary, 2) * 5, '0ib', '5MiB'],
                [Math.pow(binary, 3) * 7.343, '0.# ib', '7.3 GiB'],
                [Math.pow(binary, 4) * 3.1536544, '0.000ib', '3.154TiB'],
                [Math.pow(binary, 5) * 2.953454534534, '0ib', '3PiB'],
                [decimal * 2, '0 b', '2 KB'],
                [Math.pow(decimal, 2) * 5, '0b', '5MB'],
                [Math.pow(decimal, 3) * 7.343, '0.# b', '7.3 GB'],
                [Math.pow(decimal, 4) * 3.1536544, '0.000b', '3.154TB'],
                [Math.pow(decimal, 5) * 2.953454534534, '0b', '3PB'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });
    });

    describe('unformat', () => {
        it('should unformat to number', () => {
            const decimal = 1000;
            const binary = 1024;
            const tests = [
                ['0B', 0],
                ['0 B', 0],
                ['100B', 100],
                ['2 KiB', binary * 2],
                ['5MiB', Math.pow(binary, 2) * 5],
                ['7.3 GiB', Math.pow(binary, 3) * 7.3],
                ['3.154TiB', Math.pow(binary, 4) * 3.154],
                ['3PiB', Math.pow(binary, 5) * 3],
                ['2 KB', 2000],
                ['2- KB', -2000],
                ['-2 KB', -2000],
                ['+2 KB', 2000],
                ['2+ KB', 2000],
                ['(2 KB)', -2000],
                ['5MB', Math.pow(decimal, 2) * 5],
                ['7.3 GB', Math.pow(decimal, 3) * 7.3],
                ['-7.3 GB', -(Math.pow(decimal, 3) * 7.3)],
                ['3.154TB', Math.pow(decimal, 4) * 3.154],
                ['-3.154TB', -(Math.pow(decimal, 4) * 3.154)],
                ['3PB', Math.pow(decimal, 5) * 3],
                ['-3PB', -(Math.pow(decimal, 5) * 3)],
            ];

            tests.forEach(([string, expectedResult]) => {
                expect([string, parse(string, { type: 'bytes' })]).toEqual([string, expectedResult]);
            });
        });
    });
});
