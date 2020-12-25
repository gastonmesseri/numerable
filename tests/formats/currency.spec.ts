import format from './../../src/api/format';

describe('format: currency', () => {
    describe('format', () => {
        it('should format to currency when a currency is passed in the options', () => {
            const tests: [string, number | null, string, string][] = [
                ['USD', 0, '$0.00', '$0.00'],
                ['USD', null, '$0.00', ''],
                ['USD', 0.99, '$0,0.00', '$0.99'],
                ['USD', 1000.234, '$0,0.00', '$1,000.23'],
                ['USD', 1001, '$ 0,0.[00]', '$ 1,001'],
                ['USD', 1000.234, '0,0.00 $', '1,000.23 $'],
                ['USD', -1000.234, '0,0.00 $', '-1,000.23 $'],
                ['USD', -1000.234, '($0,0)', '($1,000)'],
                ['USD', -1000.234, '(0,0$)', '(1,000$)'],
                ['USD', -1000.234, '(0,0 $)', '(1,000 $)'],
                ['USD', -1000.234, '$0.00', '-$1000.23'],
                ['USD', -1000.234, '$ 0.00', '-$ 1000.23'],
                ['USD', 1230974, '($0.00 a)', '$1.23 M'],
                ['USD', -1000.234, '$ (0,0)', '$ (1,000)'],
                ['USD', -1000.234, '$(0,0)', '$(1,000)'],
                ['USD', -1000.234, '$ (0,0.00)', '$ (1,000.23)'],
                ['USD', -1000.234, '$(0,0.00)', '$(1,000.23)'],
                ['USD', -1000.238, '$(0,0.00)', '$(1,000.24)'],
                ['USD', -1000.234, '$-0,0', '$-1,000'],
                ['USD', -1000.234, '$ -0,0', '$ -1,000'],
                ['USD', 1000.234, '$ (0,0)', '$ 1,000'],
                ['USD', 1000.234, '$(0,0)', '$1,000'],
                ['USD', 1000.234, '$ (0,0.00)', '$ 1,000.23'],
                ['USD', 1000.234, '$(0,0.00)', '$1,000.23'],
                ['USD', 1000.238, '$(0,0.00)', '$1,000.24'],
                ['USD', 1000.234, '$-0,0', '$1,000'],
                ['USD', 1000.234, '$ -0,0', '$ 1,000'],
                ['USD', 1000.234, '$ +0,0', '$ +1,000'],
                ['USD', 1000.234, '$ 0,0-', '$ 1,000'],
                ['USD', 1000.234, '$ 0,0+', '$ 1,000+'],
                ['USD', 999999, '($ 0a)', '$ 1M'],
                ['USD', -999999, '($ 0a)', '($ 1M)'],
                ['USD', 999999, '($ 0 a)', '$ 1 M'],
                ['USD', -999999, '($ 0 a)', '($ 1 M)'],
                // Not passing
                ['USD', -1000.234, '$ 0,0-', '$ 1,000-'],

                // ['USD', -1000.234, '0,0- $', '$ 1,000-'],
                // ['USD', -1000.234, '0,0+ $', '$ 1,000-'],
                // ['USD', -1000.234, '-0,0 $', '$ 1,000-'],
                // ['USD', -1000.234, '+0,0 $', '$ 1,000-'],
                // ['USD', -1000.234, '(0,0 $)', '$ 1,000-'],
            ];

            tests.forEach(([currency, value, pattern, expectedResult]) => {
                expect([value, pattern, format(value, pattern, { currency })]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should transform the symbol of built-in currencies', () => {

        });

        it('should use the currency passed in the options', () => {

        });

        it('should return empty currency if currency is not found', () => {

        });

        it('should return empty currency if currency is not string (null, undefined, nan)', () => {

        });

        // it('should unformat to currency', function() {
        //     var tests = [
        //             ['$0.00', 0],
        //             ['$0.99', 0.99],
        //             ['$1,000.23', 1000.23],
        //             ['1,000.23 $', 1000.23],
        //             ['($1,000)', -1000],
        //             ['-1,000$', -1000],
        //             ['$1.23 m', 1230000],
        //         ],
        //         i;

        //     for (i = 0; i < tests.length; i++) {
        //         expect(numeral(tests[i][0]).value()).to.equal(tests[i][1]);
        //     }
        // });
    });
});
