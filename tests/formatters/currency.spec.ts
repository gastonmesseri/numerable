import parse from '../../src/api/parse';
import format from '../../src/api/format';

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
                ['USD', -1000.234, '$0.00', '$-1000.23'],
                ['USD', -1000.234, '$ 0.00', '$ -1000.23'],
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
                ['USD', -1000.234, '$ 0,0-', '$ 1,000-'],
                ['USD', -1000.234, '0,0- $', '1,000- $'],
                ['USD', -1000.234, '0,0+ $', '1,000- $'],
                ['USD', 1000.234, '0,0+ $', '1,000+ $'],
                ['USD', -1000.234, '-0,0 $', '-1,000 $'],
                ['USD', 1000.234, '+0,0 $', '+1,000 $'],
                ['USD', -1000.234, '(0,0 $)', '(1,000 $)'],
                ['USD', -1000.234, '-$0,0', '-$1,000'],
            ];

            tests.forEach(([currency, value, pattern, expectedResult]) => {
                expect([value, pattern, format(value, pattern, { currency })]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should transform the symbol of built-in currencies', () => {
            const tests: [string, number | null, string, string][] = [
                ['USD', 1500, '$0.00', '$1500.00'],
                ['USD', -1500, '$0.00', '$-1500.00'],
                ['EUR', 1500, '$0.00', '€1500.00'],
                ['XCD', 1500, '$0.00', 'EC$1500.00'],
                ['AUD', 1500, '$0.00', 'A$1500.00'],
                ['INR', 1500, '$0.00', '₹1500.00'],
                ['BRL', 1500, '$0.00', 'R$1500.00'],
                ['CAD', 1500, '$0.00', 'CA$1500.00'],
                ['XAF', 1500, '$0.00', 'FCFA1500.00'],
                ['CNY', 1500, '$0.00', 'CN¥1500.00'],
                ['NZD', 1500, '$0.00', 'NZ$1500.00'],
                ['XPF', 1500, '$0.00', 'CFPF1500.00'],
                ['GBP', 1500, '$0.00', '£1500.00'],
                ['HKD', 1500, '$0.00', 'HK$1500.00'],
                ['ILS', 1500, '$0.00', '₪1500.00'],
                ['JPY', 1500, '$0.00', '¥1500.00'],
                ['KRW', 1500, '$0.00', '₩1500.00'],
                ['XOF', 1500, '$0.00', 'CFA1500.00'],
                ['MXN', 1500, '$0.00', 'MX$1500.00'],
                ['TWD', 1500, '$0.00', 'NT$1500.00'],
                ['VND', 1500, '$0.00', '₫1500.00'],
            ];

            tests.forEach(([currency, value, pattern, expectedResult]) => {
                expect([value, pattern, format(value, pattern, { currency })]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should use the currency string passed in the options if not found in the currency map', () => {
            const tests: [string, number | null, string, string][] = [
                ['TEST', 1500, '$0.00', 'TEST1500.00'],
                ['HKNMO', 1500, '$0.00', 'HKNMO1500.00'],
                ['O', 1500, '$0.00', 'O1500.00'],
                ['YT', 1500, '$0.00', 'YT1500.00'],
                ['HRT', 1500, '$0.00', 'HRT1500.00'],
            ];

            tests.forEach(([currency, value, pattern, expectedResult]) => {
                expect([value, pattern, format(value, pattern, { currency })]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should return empty currency if currency is empty string', () => {
            expect(format(1500, '$0.00', { currency: '' })).toBe('1500.00');
        });

        it('should return empty currency if currency is not string (null, undefined, nan)', () => {
            expect(format(1500, '$0.00', { currency: null as any})).toBe('1500.00');
            expect(format(1500, '$0.00', { currency: undefined })).toBe('1500.00');
        });
    });

    describe('unformat', () => {
        it('should parse a currency', () => {
            const tests: [string, number | null][] = [
                ['$0.00', 0],
                ['$0.99', 0.99],
                ['$1,000.23', 1000.23],
                ['1,000.23 $', 1000.23],
                ['($1,000)', -1000],
                ['-1,000$', -1000],
                ['$1.23 M', 1230000],
            ];

            tests.forEach(([string, expectedResult]) => {
                expect([string, parse(string)]).toEqual([string, expectedResult]);
            });
        });
    });
});
