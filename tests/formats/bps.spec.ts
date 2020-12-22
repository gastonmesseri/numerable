import { format } from '../../src';
import parse from '../../src/formatter/parse/parse';

describe('format: BPS', () => {
    describe('format', () => {
        it('should format to bps', () => {
            const tests = [
                [0, '0 BPS', '0 BPS'],
                [0.0001, '0 BPS', '1 BPS'],
                [0.0056, '0 BPS', '56 BPS'],
                [0.000001, '0.00 BPS', '0.01 BPS'],
                [10, '0.00 BPS', '100000.00 BPS'],
                [0.99, '0.00 BPS', '9900.00 BPS'],
                [0, '0BPS', '0BPS'],
                [0.25, '0BPS', '2500BPS'],
                [0.0078, '0BPS', '78BPS'],
                [0.000002, '0.00BPS', '0.02BPS'],
                [0.000002, '+0.00BPS', '+0.02BPS'],
                [0.000002, '0.00+BPS', '0.02+BPS'],
                [-0.000002, '0.00-BPS', '0.02-BPS'],
                [43, '(0.00# BPS)', '430000.00 BPS'],
                [-43, '(0.00# BPS)', '(430000.00 BPS)'],
                [8.9, '(0.00BPS)', '89000.00BPS'],
                [-8.9, '(0.00BPS)', '(89000.00BPS)'],
            ] as const;

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });
    });

    describe('unformat', () => {
        it('should unformat to number', () => {
            const tests = [
                ['0 BPS', 0],
                ['1 BPS', 0.0001],
                ['56 BPS', .0056],
                ['2500BPS', .25],
                ['0.01 BPS', .000001],
                ['(15 BPS)', -0.0015],
                ['+14 BPS', 0.0014],
                ['-153 BPS', -0.0153],
                ['52- BPS', -0.0052],
                ['52+ BPS', 0.0052],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });
    });
});
