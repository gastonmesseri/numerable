import chance from 'chance';

import { format } from '../../src/index';
import { en, fr } from '../../src/locale';
import truncateNumber from '../../src/core/utils/truncate-number';
import { NumerableLocale } from '../../src/locale/types/numerable-locale';
import { NumerableFormatter } from '../../src/core/types/numerable-formatter';
import DEFAULT_FORMAT_OPTIONS from '../../src/formatter/constants/default-format-options';

describe('numerable', () => {
    const getOptionsWithDelimiters = (thousands: string, decimal: string) => {
        return { locale: { ...en, delimiters: { thousands: thousands, decimal: decimal } } };
    };
    describe('formatNumber', () => {
        it('should format to a number', () => {
            const tests = [
                [0, null, '0'],
                [0, '0.00', '0.00'],
                [null, null, ''],
                [null, '0.00', ''],
                [NaN, '0.0', ''],
                [1.23,'0,0','1'],
                [10000,'0,0.0000','10,000.0000'],
                [10000.23,'0,0','10,000'],
                [-10000,'0,0.0','-10,000.0'],
                [10000.1234,'0.000','10000.123'],
                [10000,'0[.]00','10000'],
                [10000.1,'0[.]00','10000.10'],
                [10000.123,'0[.]00','10000.12'],
                [10000.456,'0[.]00','10000.46'],
                [10000.001,'0[.]00','10000'],
                [10000.45,'0[.]00#','10000.45'],
                [10000.456,'0[.]00#','10000.456'],
                [10000,'(0,0.0000)','10,000.0000'],
                [-10000,'(0,0.0000)','(10,000.0000)'],
                [-12300,'+0,0.0000','-12,300.0000'],
                [1230,'+0,0','+1,230'],
                [1230,'-0,0','1,230'],
                [-1230,'-0,0','-1,230'],
                [-1230.4,'0,0.0+','1,230.4-'],
                [-1230.4,'0,0.0-','1,230.4-'],
                [1230.4,'0,0.0-','1,230.4'],
                [100.78, '0', '101'],
                [100.28, '0', '100'],
                [100, '0', '100'],
                [1.932,'0.0','1.9'],
                [1.9687,'0','2'],
                [1.9687,'0.0','2.0'],
                [-0.23,'.00','-.23'],
                [-0.23,'(.00)','(.23)'],
                [0.23,'0.00000','0.23000'],
                [0.67,'0.0####','0.67'],
                [3162.63,'0.0##############','3162.63'],
                [1.99,'0.#','2'],
                [1.0501,'0.00#','1.05'],
                [1.005,'0.00','1.01'],
                // leading zero
                [0, '00.0', '00.0'],
                [0.23, '000.##', '000.23'],
                [4, '000', '004'],
                [10, '00000', '00010'],
                [1000, '000,0', '1,000'],
                [1000, '00000,0', '01,000'],
                [1000, '0000000,0', '0,001,000'],
                // abbreviations
                [2000000000,'0.0a','2.0B'],
                [1230974,'0.0a','1.2M'],
                [1460,'0a','1K'],
                [-104000,'0 a','-104 K'],
                [999950,'0.0a','1.0M'],
                [999999999,'0a','1B'],
                // forced abbreviations
                [-5444333222111, '0,0 ak', '-5,444,333,222 K'],
                [5444333222111, '0,0 am', '5,444,333 M'],
                [-5444333222111, '0,0 ab', '-5,444 B'],
                [-5444333222111, '0,0 at', '-5 T'],
                [123456, '0.0# ak', '123.46 K'],
                [150,'0.0 ak','0.2 K'],
                // ====== New tests
                // Fix abbreviation with space
                [1000000000000000, '0.0 a', '1000.0 T'],
                [10000000000000000, '0.0 a', '10000.0 T'],
                [100000000000000000, '0.0 a', '100000.0 T'],
                [1000000000000000000, '0.0 a', '1000000.0 T'],
                // Same case as previous but without space
                [1000000000000000, '0.0a', '1000.0T'],
                [10000000000000000, '0.0a', '10000.0T'],
                [100000000000000000, '0.0a', '100000.0T'],
                [1000000000000000000, '0.0a', '1000000.0T'],
                // No trailing space should be in the formatted string, if abbreviation is not applied.
                [999, '0 a', '999'],
                [10.23, '0.00 a', '10.23'],
                [123.456, '0,0.000 a', '123.456'],
                // Negative sign at the right and abbreviation
                [-1230, '0,0.000- a', '1.230- K'],
                [-2000, '0.0- a', '2.0- K'],
                [-3400200, '0- a', '3- M'],
                [-3400200, '0.##- a', '3.4- M'],
                [-3400200, '0.X- a', '3.4002- M'],
            ] as const;
            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern as any);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::rounding-bubbling-fix', () => {
        /**
         * - Corner case
         * New thousands separator abbreviation after rounding (only with automatic abbreviation)
         * value: 999950, pattern '0.0a'
         * [k] 999.95 (5) [5 must be rounded to leave only one decimal]
         *     After rounding the 5, the resulting number is 1000, and therefore the number will have a new abbreviation,
         *     so a new abbreviation needs to be calculated.
         * <i> The number that is rounded is the one after the pattern, that is the one that is going to be removed.
         */
        it('should handle the "new thousands separator abbreviation after rounding" case', () => {
            const tests: any[] = [
                // Corner cases (positive)
                [999.99, '0.0a', '1.0K'],
                [999.999, '0.00a', '1.00K'],
                [999.9999, '0.000a', '1.000K'],
                [999950, '0.0a', '1.0M'],
                [999999, '0.0a', '1.0M'],
                [999999970, '0.0a', '1.0B'],
                [999999999995, '0.0a', '1.0T'],
                [999995, '0.00a', '1.00M'],
                [999999995, '0.00a', '1.00B'],
                [999999999995, '0.00a', '1.00T'],
                [999999.5, '0.000a', '1.000M'],
                [999999999.5, '0.000a', '1.000B'],
                [999999999999.5, '0.000a', '1.000T'],
                [999.999999999999999997, '0.00000000000000000a', '1.00000000000000000K'],
                [999.999999999999999997, '0.00000000000000###a', '1.00000000000000K'],
                // Corner cases (negative)
                [-999.99, '0.0a', '-1.0K'],
                [-999.999, '0.00a', '-1.00K'],
                [-999.9999, '0.000a', '-1.000K'],
                [-999960, '0.0a', '-1.0M'],
                [-999999, '0.0a', '-1.0M'],
                [-999999970, '0.0a', '-1.0B'],
                [-999999999996, '0.0a', '-1.0T'],
                [-999996, '0.00a', '-1.00M'],
                [-999999996, '0.00a', '-1.00B'],
                [-999999995.1, '0.00a', '-1.00B'],
                [-999999995.06, '0.00a', '-1.00B'],
                [-999999995.006, '0.00a', '-1.00B'],
                [-999999995.0000000005, '0.00a', '-1.00B'],
                [-999999999996, '0.00a', '-1.00T'],
                [-999999.6, '0.000a', '-1.000M'],
                [-999999999.5001, '0.000a', '-1.000B'],
                [-999999999999.9, '0.000a', '-1.000T'],

                // Safety cases
                // With '0.0a'
                [9999.99, '0.0a', '10.0K'],
                [99999.99, '0.0a', '100.0K'],
                [9999950, '0.0a', '10.0M'],
                [99999960, '0.0a', '100.0M'],
                [9999999980, '0.0a', '10.0B'],
                [99999999990, '0.0a', '100.0B'],
                [9999999999996, '0.0a', '10.0T'],
                [99999999999997, '0.0a', '100.0T'],
                [999999999999998, '0.0a', '1000.0T'],
                [9999999999999998, '0.0a', '10000.0T'],
                [99999999999999998, '0.0a', '100000.0T'],
                [999999999999999998, '0.0a', '1000000.0T'],
                [9999999999999999998, '0.0a', '10000000.0T'],
                [99999999999999999998, '0.0a', '100000000.0T'],
                [999999999999999999998, '0.0a', '1000000000.0T'],
                [9999999999999999999998, '0.0a', '10000000000.0T'],
                [99999999999999999999998, '0.0a', '100000000000.0T'],
                [999999999999999999999998, '0.0a', '1000000000000.0T'],
                // With 2 decimal places '0.00a'
                [9999995, '0.00a', '10.00M'],
                [99999995, '0.00a', '100.00M'],
                [999999999999995, '0.00a', '1000.00T'],
                // With 3 decimal places '0.000a'
                [9999999.5, '0.000a', '10.000M'],
                [99999999.5, '0.000a', '100.000M'],
                [999999999999999.5, '0.000a', '1000.000T'],
                // With 1 decimal place and forced scale '0.0ak'
                [999.99, '0.0ak', '1.0K'],
                [9999.99, '0.0ak', '10.0K'],
                [99999.99, '0.0ak', '100.0K'],
                [999999.99, '0.0ak', '1000.0K'],
                // With 1 decimal place and forced scale '0.0am'
                [999950, '0.0am', '1.0M'],
                [999999, '0.0am', '1.0M'],
                [9999950, '0.0am', '10.0M'],
                [99999960, '0.0am', '100.0M'],
                [999999970, '0.0am', '1000.0M'],
                [9999999980, '0.0am', '10000.0M'],
                [99999999990, '0.0am', '100000.0M'],
                [999999999999, '0.0am', '1000000.0M'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::randomized-tests', () => {
        it('should pass random tests for variable forced decimal places', () => {
            const minDecimalPlaces = 1;
            const maxDecimalPlaces = 12;
            const maxInteger = 1000;
            const maxDecimal = 1000000000;
            [...Array(100)].forEach(() => {
                const randomAmountOfDecimalPlaces = chance().natural({ min: minDecimalPlaces, max: maxDecimalPlaces });
                const integerPart = chance().natural({ min: 0, max: maxInteger });
                const decimalPart = chance().natural({ min: 0, max: maxDecimal });
                const pattern = `0.${'0'.repeat(randomAmountOfDecimalPlaces)}`;
                const value = +`${integerPart}.${decimalPart}`;
                const result = format(value, pattern, { rounding: truncateNumber });
                const expectedResult = `${integerPart}.${(decimalPart + '0000000000000').slice(0, randomAmountOfDecimalPlaces)}`;
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::locale-delimiters', () => {
        it('should handle locale specific separators in format options', () => {
            const tests: any[] = [
                [[`,`, '.'], 1234.4, '0,0.0', '1,234.4'],
                [[`.`, ','], 1234.4, '0,0.0', '1.234,4'],
                [[`'`, ','], 1234.34, '0,0.0', '1\'234,3'],
                [[`*`, '.'], 1299.34, '0,0.0', '1*299.3'],
                [[`TEST`, '+'], 12345.34, '0,0.0', '12TEST345+3'],
                [[` `, '_'], 12333.34, '0,0.0', '12 333_3'],
                [[` `, '_'], 12333444.34, '0,0.0', '12 333 444_3'],
                [[`<`, '>'], 12333567.34, '0,0.0', '12<333<567>3'],
                [[`  `, '--'], 12333567.3455, '0,0.0000', '12  333  567--3455'],
            ];
            tests.forEach(([[thousands, decimals], value, pattern, expectedResult]) => {
                const result = format(value, pattern, getOptionsWithDelimiters(thousands, decimals));
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should omit integer if omitInteger is enabled and the are no decimals, and decimal separator has more than one character', () => {
            const tests: any[] = [
                [[`,`, '__'], 1234, '0,0[.]00', '1,234'],
                [[`,`, '___'], 1234, '0,0[.]00', '1,234'],
                [[`,`, '--'], 1234567, '0,0[.]00', '1,234,567'],
                [[`,`, '----'], 1234567, '0,0[.]00', '1,234,567'],
                [[`,`, '--'], 1234567, '0,0[.]00', '1,234,567'],
                [[`,`, '----'], 1234567, '0,0[.]00', '1,234,567'],
                [[`,`, '----'], 1234567.999, '0,0[.]00', '1,234,568'],
                [[`,`, '----'], 1234567.99, '0,0[.]0', '1,234,568'],
            ];
            tests.forEach(([[thousands, decimals], value, pattern, expectedResult]) => {
                const result = format(value, pattern, getOptionsWithDelimiters(thousands, decimals));
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::nullFormat-option', () => {
        it('should return the specified nullFormat if value is null, undefined or NaN', () => {
            const tests: any[] = [
                ['', null, '0,0.00', ''],
                ['', undefined, '0,0.00', ''],
                ['', NaN, '0,0.00', ''],
                ['N/A', null, '0,0.00', 'N/A'],
                ['N/A', undefined, '0,0.00', 'N/A'],
                ['N/A', NaN, '0,0.00', 'N/A'],
                ['-', null, '0,0.##', '-'],
            ];

            tests.forEach(([nullFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nullFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should return empty string if the typeof nullFormat is not an string', () => {
            const tests: any[] = [
                [null, null, '0,0.00', ''],
                [undefined, null, '0,0.00', ''],
                [NaN, undefined, '0,0.00', ''],
                [0, null, '0,0.00', ''],
                [Infinity, null, '0,0.00', ''],
                [{}, null, '0,0.00', ''],
                [[], null, '0,0.00', ''],
                [true, null, '0,0.00', ''],
            ];

            tests.forEach(([nullFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nullFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should not apply nullFormat for NaN if nanFormat has been specified', () => {
            const tests: any[] = [
                ['-', 'NaN', NaN, '0,0.00', 'NaN'],
                ['N/A', 'THIS-IS-NANFORMAT', NaN, '0,0.00', 'THIS-IS-NANFORMAT'],
                [null, 'THIS-IS-NANFORMAT', NaN, '0,0.00', 'THIS-IS-NANFORMAT'],
            ];

            tests.forEach(([nullFormat, nanFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nullFormat, nanFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::nanFormat-option', () => {
        it('should return the specified nanFormat if value is NaN', () => {
            const tests: any[] = [
                ['', NaN, '0,0.00', ''],
                ['N/A', NaN, '0,0.00', 'N/A'],
                ['-', NaN, '0,0.##', '-'],
                ['TEST', NaN, '0,0.##', 'TEST'],
            ];

            tests.forEach(([nanFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nanFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should return an empty string if the typeof nanFormat is not an string', () => {
            const tests: any[] = [
                [null, NaN, '0,0.00', ''],
                [undefined, NaN, '0,0.00', ''],
                [NaN, NaN, '0,0.00', ''],
                [0, NaN, '0,0.00', ''],
                [Infinity, NaN, '0,0.00', ''],
                [{}, NaN, '0,0.00', ''],
                [[], NaN, '0,0.00', ''],
                [true, NaN, '0,0.00', ''],
            ];

            tests.forEach(([nanFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nanFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should not apply nanFormat over nullFormat if both has been specified, and the value is NaN', () => {
            const tests: any[] = [
                ['-', 'NaN', NaN, '0,0.00', 'NaN'],
                ['N/A', 'THIS-IS-NANFORMAT', NaN, '0,0.00', 'THIS-IS-NANFORMAT'],
                [null, 'THIS-IS-NANFORMAT', NaN, '0,0.00', 'THIS-IS-NANFORMAT'],
            ];

            tests.forEach(([nullFormat, nanFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { nullFormat, nanFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('number-pattern', () => {
        it('should apply the optional decimals (#) in the decimal places rule', () => {
            const tests: any[] = [
                // Alone
                [1.5, '0.#', '1.5'],
                [2.558, '0.#', '2.6'],
                [-0.5, '0.#', '-0.5'],
                [0.0000000000000000000000000001, '0.#', '0'],
                [0.0000000000000000000000000001, '0.############################', '0.0000000000000000000000000001'],
                [0.000000000000000000000000000000012345, '0.##################################', '0.0000000000000000000000000000000123'],
                [0.000000000000000000000000000000012345, '0.#######################################', '0.000000000000000000000000000000012345'],
                [-0.00000000000000000000000000000005432198, '0.####', '0'],
                [-0.00000000000000000000000000000005432198, '0.###########################################', '-0.00000000000000000000000000000005432198'],
                // With thousands separator in the pattern
                [12345.67, '0,0.#', '12,345.7'],
                [1.62, '0,0.#', '1.6'],
                [-9876.23, '0,0.##', '-9,876.23'],
                [-9876.23, '0,0.####', '-9,876.23'],
                // With minimum decimals in the pattern
                [12345, '0.0#', '12345.0'],
                [98765, '0.000#', '98765.000'],
                [98765.5, '0.000#', '98765.500'],
                [-98765.58, '0.000#', '-98765.580'],
                [98765.582, '0.000#', '98765.582'],
                [-98765.5822, '0.000#', '-98765.5822'],
                [98765.58222, '0.000##', '98765.58222'],
                [-98765.58222, '0.000#####', '-98765.58222'],
                [0.001, '0.0000#', '0.0010'],
                [0.0000001, '0.0000#', '0.0000'],
                [0.0000001, '0.0000###', '0.0000001'],
                [-0.0000001, '0.0000#############', '-0.0000001'],
                // With both thousands separator and minimum decimals
                [1234.5, '0,0.0000#', '1,234.5000'],
                [-1234.5, '0,0.0000#', '-1,234.5000'],
                [-1234, '0,0.0000#####', '-1,234.0000'],
                [123.5, '0,0.0000#', '123.5000'],
                [-123.5, '0,0.0000##############', '-123.5000'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should apply the no-decimals-limit (X) in the decimal places rule', () => {
            const tests: any[] = [
                // Alone
                [1.5, '0.X', '1.5'],
                [2.558, '0.X', '2.558'],
                [-0.5, '0.X', '-0.5'],
                [0.0000000000000000000000000001, '0.X', '0.0000000000000000000000000001'],
                [0.000000000000000000000000000000012345, '0.X', '0.000000000000000000000000000000012345'],
                [-0.00000000000000000000000000000005432198, '0.X', '-0.00000000000000000000000000000005432198'],
                // With thousands separator in the pattern
                [12345.67, '0,0.X', '12,345.67'],
                [1.67, '0,0.X', '1.67'],
                [-9876.23, '0,0.X', '-9,876.23'],
                // With minimum decimals in the pattern
                [12345, '0.0X', '12345.0'],
                [98765, '0.000X', '98765.000'],
                [98765.5, '0.000X', '98765.500'],
                [-98765.58, '0.000X', '-98765.580'],
                [98765.582, '0.000X', '98765.582'],
                [-98765.5822, '0.000X', '-98765.5822'],
                [98765.58222, '0.000X', '98765.58222'],
                [0.001, '0.0000X', '0.0010'],
                [0.0000001, '0.0000X', '0.0000001'],
                [-0.0000001, '0.0000X', '-0.0000001'],
                // With both thousands separator and minimum decimals
                [1234.5, '0,0.0000X', '1,234.5000'],
                [-1234.5, '0,0.0000X', '-1,234.5000'],
                [-1234, '0,0.0000X', '-1,234.0000'],
                [123.5, '0,0.0000X', '123.5000'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::zeroFormat-option', () => {
        it('should return the specified zeroFormat if value is 0', () => {
            const tests: any[] = [
                ['', 0, '0,0.00', ''],
                ['N/A', 0, '0,0.00', 'N/A'],
                ['-', 0, '0,0.##', '-'],
                ['TEST', 0, '0,0.##', 'TEST'],
            ];

            tests.forEach(([zeroFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { zeroFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should return the normally formatted 0 if the typeof zeroFormat is not an string and the value is 0', () => {
            const tests: any[] = [
                [null, 0, '0,0.00', '0.00'],
                [undefined, 0, '0,0.000##', '0.000'],
                [NaN, 0, '0,0', '0'],
                [0, 0, '0', '0'],
                [Infinity, 0, '0,0.00000000', '0.00000000'],
                [{}, 0, '0,0.00', '0.00'],
                [[], 0, '0,0.00', '0.00'],
                [true, 0, '0,0.00', '0.00'],
            ];

            tests.forEach(([zeroFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { zeroFormat });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::_errorFormat', () => {
        it('should return the hidden _errorFormat option if an error occurs during the format process', () => {
            const brokenRoundingFunction = () => { throw new Error(); };
            const tests: any[] = [
                ['', 123, '0,0.00', ''],
                ['N/A', 123, '0,0.00', 'N/A'],
                ['-', 123.23, '0,0.##', '-'],
                ['TEST', 3434.23, '0,0.##', 'TEST'],
            ];

            tests.forEach(([_errorFormat, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { rounding: brokenRoundingFunction, _errorFormat } as any);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should return an empty string if an error occurs during the format process', () => {
            const tests: any[] = [
                [123, '0,0.00', ''],
                [123, '0,0.00', ''],
                [123.23, '0,0.##', ''],
                [3434.23, '0,0.##', ''],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern, { rounding: () => { throw new Error(); } } as any);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::locale-option', () => {
        it('should use the passed locale object for formatting the number', () => {
            expect(format(12345.67, '0,0.000', { locale: fr })).toBe('12 345,670');
        });

        it('should fallback to "en" locale if the passed locale is not an object', () => {
            expect(format(12345.67, '0,0.000', { locale: null as any })).toBe('12,345.670');
            expect(format(12345.67, '0,0.000', { locale: '' as any })).toBe('12,345.670');
            expect(format(12345.67, '0,0.000', { locale: 0 as any })).toBe('12,345.670');
            expect(format(12345.67, '0,0.000', { locale: true as any })).toBe('12,345.670');
            expect(format(12345.67, '0,0.000', { locale: NaN as any })).toBe('12,345.670');
        });
    });

    describe('formatNumber::rounding', () => {
        it('should apply rounding function aliases on format options', () => {
            const tests: any[] = [
                ['truncate', 1234.158, '0,0.00', '1,234.15'],
                ['truncate', -1234.158, '0,0.00', '-1,234.15'],
                ['ceil', 1234.152, '0,0.00', '1,234.16'],
                ['ceil', -1234.158, '0,0.00', '-1,234.15'],
                ['floor', 1234.158, '0,0.00', '1,234.15'],
                ['floor', -1234.152, '0,0.00', '-1,234.16'],
                ['round', 1234.158, '0,0.00', '1,234.16'],
                ['round', 1234.152, '0,0.00', '1,234.15'],
                ['round', -1234.158, '0,0.00', '-1,234.16'],
                ['round', -1234.152, '0,0.00', '-1,234.15'],
            ];

            tests.forEach(([roundingFunctionAlias, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { rounding: roundingFunctionAlias });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should apply rounding function found in format options', () => {
            const tests: any[] = [
                [truncateNumber, 1234.158, '0,0.00', '1,234.15'],
                [Math.floor, 1234.158, '0,0.00', '1,234.15'],
                [Math.ceil, 1234.152, '0,0.00', '1,234.16'],
                [Math.round, 1234.152, '0,0.00', '1,234.15'],
                [() => 10, 1234.152, '0,0.00', '0.10'],
            ];

            tests.forEach(([roundingFunction, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { rounding: roundingFunction });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should fallback to Math.round if no valid rounding property is passed', () => {
            const tests: any[] = [
                // Apply Math.round as fallback
                ['', 1234.152, '0,0.00', '1,234.15'],
                [null, 1234.152, '0,0.00', '1,234.15'],
                [undefined, 1234.152, '0,0.00', '1,234.15'],
                ['unexisting-rounding-function-alias', 1234.152, '0,0.00', '1,234.15'], // Apply Math.round as fallback
            ];

            tests.forEach(([roundingFunction, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { rounding: roundingFunction });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatNumber::overload', () => {
        it('should handle 1 argument (value) and apply default pattern', () => {
            expect(format(1234.56)).toBe(format(1234.56, DEFAULT_FORMAT_OPTIONS.defaultPattern));
        });

        it('should handle 2 arguments (value, pattern) and apply given pattern', () => {
            expect(format(1234.56, '00000,0.0')).toBe('01,234.6');
        });

        it('should accept a number string (as JS number) as a "value" argument, and then apply apply given pattern', () => {
            expect(format('1234.56', '00000,0.0')).toBe('01,234.6');
        });

        it('should handle 2 arguments (value, options) and apply default pattern with given options', () => {
            const result = format(1234.56, getOptionsWithDelimiters('*', '_'));
            const expectedResult = format(1234.56, DEFAULT_FORMAT_OPTIONS.defaultPattern, getOptionsWithDelimiters('*', '_'));
            expect(result).toBe(expectedResult);
        });

        it('should handle 3 arguments (value, pattern, options) and apply pattern and options', () => {
            expect(format(1, '0000,0.00', getOptionsWithDelimiters('^', '"'))).toBe('0^001"00');
        });
    });

    // The value type of the 'value' argument passed to formatNumber
    describe('formatNumber::value-type-resolver', () => {
        it('should return "∞" or "-∞" for `Infinity` value types', () => {
            expect(format(Infinity, '0000,0.00')).toBe('∞');
            expect(format(-Infinity, '0000,0.00')).toBe('-∞');
        });

        it('should return empty string if `null` or `undefined` is passed', () => {
            expect(format(null, '0,0.00')).toBe('');
            expect(format(undefined, '0,0.00')).toBe('');
            expect(format(null, '0,0.00', { nullFormat: 'N/A' })).toBe('N/A');
            expect(format(undefined, '0,0.00', { nullFormat: 'N/A' })).toBe('N/A');
        });

        it('should return empty string if `NaN` is passed', () => {
            expect(format(NaN, '0,0.00')).toBe('');
            expect(format(NaN, '0,0.00', { nanFormat: 'N/A' })).toBe('N/A');
            expect(format(NaN, '0,0.00', { nullFormat: 'N/A' })).toBe('N/A');
            expect(format(NaN, '0,0.00', { nanFormat: 'nan-format', nullFormat: 'N/A' })).toBe('nan-format');
            expect(format('this-string-will-be-parsed-as-NaN', '0,0.00')).toBe('');
            expect(format('', '0,0.00')).toBe('');
        });

        it('should apply parseFloat to the value if the provided value type is string', () => {
            expect(format('123.45', '0000,0.00')).toBe('0,123.45');
            expect(format('1,23.45', '0000,0.00')).toBe('0,001.00');
            expect(format('12,3.45', '0000,0.00')).toBe('0,012.00');
            expect(format('123.45 %', '0000,0.00')).toBe('0,123.45');
            expect(format('1e+2', '0,0.00')).toBe('100.00');
            expect(format('1e-2', '0,0.00')).toBe('0.01');
            expect(format(' 1e-2', '0,0.00')).toBe('0.01');
            expect(format('   123', '0,0.00')).toBe('123.00');
            expect(format('234testTESTtestTEST', '0,0.00')).toBe('234.00');
            expect(format('', '0,0.00')).toBe('');
            expect(format('no-valid-string', '0,0.00')).toBe('');
            expect(format('this-should-be-same-as-passing-NaN', '0,0.00', { nanFormat: 'N/A' })).toBe('N/A');
            expect(format('this-should-be-same-as-passing-NaN', '0,0.00', { nullFormat: 'N/A' })).toBe('N/A');
            expect(format('this-should-be-same-as-passing-NaN', '0,0.00', { nanFormat: 'N-A-N', nullFormat: '-' })).toBe('N-A-N');
        });
    });

    describe('pattern type resolver', () => {
        // no valid pattern means '', null or undefined
        it('should format with DEFAULT_OPTIONS defaultPattern if no valid pattern is provided', () => {
            expect(format(1234.56, '')).toBe(format(1234.56, DEFAULT_FORMAT_OPTIONS.defaultPattern));
            expect(format(1234.56, undefined as any)).toBe(format(1234.56, DEFAULT_FORMAT_OPTIONS.defaultPattern));
            expect(format(1234.56, null as any)).toBe(format(1234.56, DEFAULT_FORMAT_OPTIONS.defaultPattern));
        });

        it('should format with "0,0.##########" if no valid pattern is provided, and no defaultPattern exists in global', () => {
            const previousDefaultPattern = DEFAULT_FORMAT_OPTIONS.defaultPattern;
            DEFAULT_FORMAT_OPTIONS.defaultPattern = undefined as any;

            expect(format(1234.56443322114, '')).toBe('1,234.5644332211');
            expect(format(1234.56443322114, undefined as any)).toBe('1,234.5644332211');
            expect(format(1234.56443322114, null as any)).toBe('1,234.5644332211');

            DEFAULT_FORMAT_OPTIONS.defaultPattern = previousDefaultPattern;
        });

        it('should format with the provided defaultPattern in options if no valid pattern is provided in the arguments', () => {
            expect(format(1234.503, null, { defaultPattern: '0.0' })).toBe('1234.5');
            expect(format(1234.503, undefined, { defaultPattern: '0.0' })).toBe('1234.5');
            expect(format(1234.503, '', { defaultPattern: '0.0' })).toBe('1234.5');
        });
    });

    describe('formatting exponential numbers', () => {
        it('should properly format small exponential numbers with fixed decimals', () => {
            const tests: any[] = [
                // Positive numbers
                [0.000000012345, '0.00000000', '0.00000001'],
                [0.000000012345, '0.000000000', '0.000000012'],
                [0.000000012345, '0.0000000000', '0.0000000123'],
                [0.000000012345, '0.00000000000', '0.00000001235'], // Rounding up
                [0.000000012345, '0.000000000000', '0.000000012345'],
                [0.000000012345, '0.0000000000000', '0.0000000123450'],
                [0.000000012345, '0.00000000000000', '0.00000001234500'],
                [0.000000012345, '0.000000000000000', '0.000000012345000'],
                [0.000000012345, '0.0000000000000000', '0.0000000123450000'],
                [0.000000012345, '0.00000000000000000', '0.00000001234500000'],
                // Negative numbers
                [-0.000000012345, '0.00000000', '-0.00000001'],
                [-0.000000012345, '0.000000000', '-0.000000012'],
                [-0.000000012345, '0.0000000000', '-0.0000000123'],
                [-0.000000012345, '0.00000000000', '-0.00000001234'], // Rounding up
                [-0.000000012345, '0.000000000000', '-0.000000012345'],
                [-0.000000012345, '0.0000000000000', '-0.0000000123450'],
                [-0.000000012345, '0.00000000000000', '-0.00000001234500'],
                [-0.000000012345, '0.000000000000000', '-0.000000012345000'],
                [-0.000000012345, '0.0000000000000000', '-0.0000000123450000'],
                [-0.000000012345, '0.00000000000000000', '-0.00000001234500000'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should properly format small exponential numbers with optional decimals', () => {
            const tests: any[] = [
                // Positive numbers
                [0.000000012345, '0.########', '0.00000001'],
                [0.000000012345, '0.#########', '0.000000012'],
                [0.000000012345, '0.##########', '0.0000000123'],
                [0.000000012345, '0.###########', '0.00000001235'],
                [0.000000012345, '0.############', '0.000000012345'],
                [0.000000012345, '0.#############', '0.000000012345'],
                [0.000000012345, '0.################', '0.000000012345'],
                [0.000000012345, '0.0000000#', '0.00000001'],
                [0.000000012345, '0.0000000##', '0.000000012'],
                [0.000000012345, '0.000000##', '0.00000001'],
                [0.000000012345, '0.000000####', '0.0000000123'],
                [0.000000012345, '0.000000#####', '0.00000001235'],
                [0.000000012345, '0.000000######', '0.000000012345'],
                [0.000000012345, '0.000000#######', '0.000000012345'],
                [0.000000012345, '0.000000###############', '0.000000012345'],
                [0.000000012345, '0.000000#######################', '0.000000012345'],
                // Negative numbers
                [-0.000000012345, '0.########', '-0.00000001'],
                [-0.000000012345, '0.#########', '-0.000000012'],
                [-0.000000012345, '0.##########', '-0.0000000123'],
                [-0.000000012345, '0.###########', '-0.00000001234'],
                [-0.000000012345, '0.############', '-0.000000012345'],
                [-0.000000012345, '0.#############', '-0.000000012345'],
                [-0.000000012345, '0.################', '-0.000000012345'],
                [-0.000000012345, '0.0000000#', '-0.00000001'],
                [-0.000000012345, '0.0000000##', '-0.000000012'],
                [-0.000000012345, '0.000000##', '-0.00000001'],
                [-0.000000012345, '0.000000####', '-0.0000000123'],
                [-0.000000012345, '0.000000#####', '-0.00000001234'], // Rounding up
                [-0.000000012345, '0.000000######', '-0.000000012345'],
                [-0.000000012345, '0.000000#######', '-0.000000012345'],
                [-0.000000012345, '0.000000###############', '-0.000000012345'],
                [-0.000000012345, '0.000000#######################', '-0.000000012345'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should properly format big exponential numbers', () => {
            const tests: any[] = [
                // Positive numbers
                [1234123412341230000000, '0,0', '1,234,123,412,341,230,000,000'],
                [12341234123412300000000, '0,0', '12,341,234,123,412,300,000,000'],
                [123412341234123000000000, '0,0', '123,412,341,234,123,000,000,000'],
                [9934123412341230000000000, '0,0', '9,934,123,412,341,230,000,000,000'],
                [99341234123412300000000000000, '0,0', '99,341,234,123,412,300,000,000,000,000'],
                [993412341234123000000000000000000, '0,0', '993,412,341,234,123,000,000,000,000,000,000'],
                [99341234123412300000000000000000000000000, '0,0', '99,341,234,123,412,300,000,000,000,000,000,000,000,000'],
                [993412341234123000000000000000000000000000000000000000000, '0,0', '993,412,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                [553412341234123000000000000000000000000000000000000000000, '0,0', '553,412,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                [229912341234123000000000000000000000000000000000000000000, '0,0', '229,912,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                // Negative numbers
                [-1234123412341230000000, '0,0', '-1,234,123,412,341,230,000,000'],
                [-12341234123412300000000, '0,0', '-12,341,234,123,412,300,000,000'],
                [-123412341234123000000000, '0,0', '-123,412,341,234,123,000,000,000'],
                [-9934123412341230000000000, '0,0', '-9,934,123,412,341,230,000,000,000'],
                [-99341234123412300000000000000, '0,0', '-99,341,234,123,412,300,000,000,000,000'],
                [-993412341234123000000000000000000, '0,0', '-993,412,341,234,123,000,000,000,000,000,000'],
                [-99341234123412300000000000000000000000000, '0,0', '-99,341,234,123,412,300,000,000,000,000,000,000,000,000'],
                [-993412341234123000000000000000000000000000000000000000000, '0,0', '-993,412,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                [-553412341234123000000000000000000000000000000000000000000, '0,0', '-553,412,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                [-229912341234123000000000000000000000000000000000000000000, '0,0', '-229,912,341,234,123,000,000,000,000,000,000,000,000,000,000,000,000,000,000'],
                // With both fixed and optional decimals
                [1234123412341230000000, '0,0.00', '1,234,123,412,341,230,000,000.00'],
                [12341234123412300000000, '0,0.000', '12,341,234,123,412,300,000,000.000'],
                [123412341234123000000000, '0,0.0####', '123,412,341,234,123,000,000,000.0'],
                [123412341234123000000000, '0,0.####', '123,412,341,234,123,000,000,000'],
                [-1234123412341230000000, '0,0.00', '-1,234,123,412,341,230,000,000.00'],
                [-12341234123412300000000, '0,0.000', '-12,341,234,123,412,300,000,000.000'],
                [-123412341234123000000000, '0,0.0####', '-123,412,341,234,123,000,000,000.0'],
                [-123412341234123000000000, '0,0.####', '-123,412,341,234,123,000,000,000'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should handle other features cases with exponential numbers', () => {
            // Rounding
            expect(format(0.000000012345, '0.00000000', { rounding: 'ceil' })).toBe('0.00000002');
            expect(format(-0.000000012345, '0.00000000', { rounding: 'floor' })).toBe('-0.00000002');
            // Abbreviation
            expect(format(1234123412341230000000, '0.0a')).toBe('1234123412.3T');
            expect(format(1234123412341230000000, '0,0.0a')).toBe('1,234,123,412.3T');
            // Locales
            expect(format(1234123412341230000000, '0,0.0a', { locale: fr })).toBe('1 234 123 412,3Bn');
            expect(format(0.000000012345, '0.00000000', { locale: fr })).toBe('0,00000001');
            // Percentage format
            expect(format(0.00000000012345, '0.00000000%')).toBe('0.00000001%');
            expect(format(123412341234123000000000, '0%')).toBe('12341234123412300000000000%');
            expect(format(123412341234123000000000, '0,0%')).toBe('12,341,234,123,412,300,000,000,000%');
            expect(format(123412341234123000000000, '0,0.00%')).toBe('12,341,234,123,412,300,000,000,000.00%');
        });
    });

    describe('localization', () => {
        it('should apply the defined digit grouping style', () => {
            const getEnLocaleWithCustomDigitGroupingStyle = (digitGroupingStyle: number[]): NumerableLocale => ({ ...en, digitGroupingStyle });
            const tests: any[] = [
                [undefined, 123456789, '0,0', '123,456,789'],
                [[], 123456789, '0,0', '123,456,789'],
                [[4], 123456789, '0,0', '1,2345,6789'],
                [[4,3], 123456789, '0,0', '12,345,6789'],
                [[4,2], 123456789, '0,0', '1,23,45,6789'],
                [[1], 123456789, '0,0', '1,2,3,4,5,6,7,8,9'],
                [[7,1], 123456789, '0,0', '1,2,3456789'],
                [[3,2], 123456789, '0,0', '12,34,56,789'],
                [[3,2], 123456789, '0,0', '12,34,56,789'],
                [[2], 123456789, '0,0', '1,23,45,67,89'],
                [[3], 123456789, '0,0', '123,456,789'],
                [[3,1,4], 123456789, '0,0', '1,2345,6,789'],
            ];
            tests.forEach(([digitGroupingStyle, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { locale: getEnLocaleWithCustomDigitGroupingStyle(digitGroupingStyle) });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should apply the defined numeralSystem', () => {
            const getEnLocaleWithCustomNumeralSystem = (numeralSystem: string[]): NumerableLocale => ({ ...en, numeralSystem });
            const arabicNumeralSystem = [
                '٠', // 0
                '١', // 1
                '٢', // 2
                '٣', // 3
                '٤', // 4
                '٥', // 5
                '٦', // 6
                '٧', // 7
                '٨', // 8
                '٩', // 9
            ];
            const tests: any[] = [
                [undefined, 1234567890, '0', '1234567890'],
                [arabicNumeralSystem, 1234567890, '0', '١٢٣٤٥٦٧٨٩٠'],
                [arabicNumeralSystem, 9, '0', '٩'],
                [arabicNumeralSystem, 10, '0', '١٠'],
                ['abcdefghij', 0, '0', 'a'],
                ['abcdefghij', 1, '0', 'b'],
                ['abcdefghij', 10, '0', 'ba'],
                ['abcdefghij', 1234567890, '0', 'bcdefghija'],
                [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 1234567890, '0', 'bcdefghija'],
                // Invalid, not 10 characters (ignored)
                ['abc', 1234567890, '0', '1234567890'],
                // Invalid, not 10 characters (ignored)
                [['a', 'b'], 1234567890, '0', '1234567890'],
            ];
            tests.forEach(([numeralSystem, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { locale: getEnLocaleWithCustomNumeralSystem(numeralSystem) });
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should use the defined abbreviations', () => {
            const tests: any[] = [
                ['|||Test', 1234, '0 a', '1 Test'],
                ['|||Test|||Test2', 1234, '0 a', '1 Test'],
                ['|||Test|||Test2', -1234567, '0 a', '-1 Test2'],
                ['||s||-', 1234567, '0 a', '123 -'],
                ['||||-||||"||||$', 120003000, '0.0 a', '1.2 "'],
                ['||||-||||"||||$', -1200030004000, '0.0 a', '-1.2 $'],
                ['|||T||L||Cr|||TCr||LCr', 1000, '0 a', '1 T'],
                ['|||T||L||Cr|||TCr||LCr', 100000, '0 a', '1 L'],
                ['|||T||L||Cr|||TCr||LCr', 10000000, '0 a', '1 Cr'],
                ['|||T||L||Cr|||TCr||LCr', -10000000000, '0 a', '-1 TCr'],
                ['|||T||L||Cr|||TCr||LCr', 1000000000000, '0 a', '1 LCr'],
                ['|||T||L||Cr|||TCr||LCr', 1000000000000000, '0 a', '1000 LCr'],
                ['|||K|||M|||B|||T', -1000, '0 a', '-1 K'],
                ['|||K|||M|||B|||T', 1000000, '0 a', '1 M'],
                ['|||K|||M|||B|||T', 1000000000, '0 a', '1 B'],
                ['|||K|||M|||B|||T', -1000000000000, '0 a', '-1 T'],
                ['|||K|||M|||B|||T', 1000000000000000, '0 a', '1000 T'],
                ['|s|-', 1, '0 a', '1'],
                ['|s|-', 10, '0 a', '1 s'],
                ['|s|-', -100, '0 a', '-1 -'],
                ['|s|-', 1000, '0 a', '10 -'],
                // Should fallback to english if no abbreviations
                [undefined, 1234, '0 a', '1 K'],
                [null, -1234, '0 a', '-1 K'],
                ['', 1234, '0 a', '1 K'],
                // No abbreviations defined
                ['|||||||||||', 1234, '0 a', '1234'],
            ];
            tests.forEach(([abbreviations, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { locale: { ...en, abbreviations } });
                expect([abbreviations, value, pattern, result]).toEqual([abbreviations, value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should properly apply the forced abbreviation unit', () => {
            const enAbbreviations = '|||K|||M|||B|||T';
            const enINAbbreviations = '|||T||L||Cr|||TCr||LCr';
            const zhAbbreviations = '||||万||||亿||||万亿';
            const tests: any[] = [
                // Thousand
                [enAbbreviations, 1234, '0.00 ak', '1.23 K'],
                [enAbbreviations, 1, '0.00 ak', '0.00 K'],
                [enAbbreviations, -1200300, '0.00 ak', '-1200.30 K'],
                ['|||T1|||T2', -1200300, '0.00 ak', '-1200.30 T1'],
                // Million
                [enAbbreviations, 1200300, '0.00 am', '1.20 M'],
                [enAbbreviations, -987, '0.00 am', '0.00 M'],
                [enAbbreviations, 1200300400, '0.00 am', '1200.30 M'],
                // Billion
                [enAbbreviations, 1500300400, '0.00 ab', '1.50 B'],
                [enAbbreviations, -1500900300400, '0.00 ab', '-1500.90 B'],
                [enAbbreviations, 10500300, '0.00 ab', '0.01 B'],
                // Trillion
                [enAbbreviations, 1500300400000, '0.00 at', '1.50 T'],
                [enAbbreviations, 1500900300400000, '0.00 at', '1500.90 T'],
                [enAbbreviations, -10500300000, '0.00 at', '-0.01 T'],
                // Fallback into locale closest abbreviation (looking down) Not applying because it doesn't have abbreviation below 1K
                [zhAbbreviations, 1500, '0.00 ak', '1500.00'],
                [zhAbbreviations, 15000, '0.00 ak', '15000.00'],
                [zhAbbreviations, 150000, '0.00 ak', '150000.00'],
                // Fallback into locale closest abbreviation (looking down) Applying abbreviation at 10000 because is the closest one to 1M
                [zhAbbreviations, 1500, '0.00 am', '0.15 万'],
                [zhAbbreviations, 15000, '0.00 am', '1.50 万'],
                [zhAbbreviations, 150000, '0.00 am', '15.00 万'],
                // Fallback into locale closest abbreviation (looking down)
                ['|||||T1|||T2', 1400300, '0.00 am', '14.00 T1'],
                // Match even while having different abbreviation patterns
                [zhAbbreviations, 1500400300200, '0.00 at', '1.50 万亿'],
                [enINAbbreviations, 1500400300200, '0.00 at', '1.50 LCr'],

            ];
            tests.forEach(([abbreviations, value, pattern, expectedResult]) => {
                const result = format(value, pattern, { locale: { ...en, abbreviations } });
                expect([abbreviations, value, pattern, result]).toEqual([abbreviations, value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });

        it('should fallback to english delimiters if delimiters are not found or invalid', () => {
            const tests: any[] = [
                [[undefined, undefined], 1234.4, '0,0.0', '1,234.4'],
                [[undefined, null], 1234.4, '0,0.0', '1,234.4'],
                [[null, undefined], 1234.4, '0,0.0', '1,234.4'],
                [[null, null], 1234.4, '0,0.0', '1,234.4'],
                [[',', undefined], 1234.4, '0,0.0', '1,234.4'],
                [[',', null], 1234.4, '0,0.0', '1,234.4'],
                [[undefined, '.'], 1234.4, '0,0.0', '1,234.4'],
                [[null, '.'], 1234.4, '0,0.0', '1,234.4'],
                // '' is not valid for decimals
                [[',', ''], 1234.4, '0,0.0', '1,234.4'],
                // equal delimiters (not valid)
                [[',', ','], 1234.4, '0,0.0', '1,234.4'],
                [['.', '.'], 1234.4, '0,0.0', '1,234.4'],
            ];
            tests.forEach(([[thousands, decimals], value, pattern, expectedResult]) => {
                const result = format(value, pattern, getOptionsWithDelimiters(thousands, decimals));
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('.withOptions wrapper', () => {
        it('should apply the given options in .withOptions()', () => {
            expect(format.withOptions({ nullFormat: 'NULL' })(null, '0,0.0')).toBe('NULL');
            expect(format.withOptions({ nanFormat: 'NAN REPLACER' })(NaN, '0,0.0')).toBe('NAN REPLACER');
            expect(format.withOptions({ nullFormat: 'NULL', nanFormat: 'NAN REPLACER' })(NaN, '0,0.0')).toBe('NAN REPLACER');
            expect(format.withOptions({ zeroFormat: 'MY ZERO FORMAT' })(0, '0,0.0')).toBe('MY ZERO FORMAT');
            expect(format.withOptions({ defaultPattern: '0000' })(1)).toBe('0001');
            expect(format.withOptions({ rounding: 'floor' })(2.9, '0')).toBe('2');
            expect(format.withOptions({ locale: fr })(12345.67, '0,0.000')).toBe('12 345,670');
        });

        it('should merge the options from .withOptions with the options from the call', () => {
            expect(format.withOptions({ nullFormat: 'NULLFROMWITHOPTIONS' })(null, '0,0.0', { zeroFormat: 'FROMCALL' })).toBe('NULLFROMWITHOPTIONS');
            expect(format.withOptions({ nullFormat: 'NULLFROMWITHOPTIONS' })(0, '0,0.0', { zeroFormat: 'FROMCALL' })).toBe('FROMCALL');
        });

        it('should override the options from .withOptions with the options from the call', () => {
            expect(format.withOptions({ nullFormat: 'NULL' })(null, '0,0.0', { nullFormat: 'FROMCALL' })).toBe('FROMCALL');
        });

        it('should resolve the locale function in case it is a function', () => {
            const localeAsFunction = (): NumerableLocale => ({ ...en, delimiters: { thousands: ' ** ', decimal: ' && ' } });
            expect(
                format.withOptions({ locale: localeAsFunction })(12345.67, '0,0.000')
            ).toBe('12 ** 345 && 670');
        });
    });

    describe('numeral.js compatibility', () => {
        it('should provide compatibility with numeral optional decimals pattern format [0]', () => {
            const tests: any[] = [
                [10000.45,'0[.]00[0]','10000.45'],
                [10000.456,'0[.]00[0]','10000.456'],
                [0.67,'0.0[0000]','0.67'],
                [3162.63,'0.0[00000000000000]','3162.63'],
                [1.99,'0.[0]','2'],
                [1.0501,'0.00[0]','1.05'],
                [0.23, '000.[00]', '000.23'],
                [123456, '0.0[0] ak', '123.46 K'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('formatters', () => {
        const getTestFormatter = (
            formatMatcher: NumerableFormatter['regexps']['format'],
            formatFunction: NumerableFormatter['format'],
        ): NumerableFormatter => ({
            name: 'test-formatter',
            regexps: {
                format: formatMatcher,
                unformat: /t/,
            },
            format: formatFunction,
            unformat: undefined,
        });

        it('should format using the provided formatter', () => {
            // Should receive the value
            const formatter1 = getTestFormatter(/\*\*/, (value) => '' + value);
            expect(format(1000, '0,0.000 **', { formatters: [formatter1] })).toBe('1000');

            // Should receive the pattern
            const formatter2 = getTestFormatter(/TEST/, (_value, pattern) => '' + pattern);
            expect(format(1000, '0,0.000 TEST', { formatters: [formatter2] })).toBe('0,0.000 TEST');

            // Should Call the matcher function
            const formatter3 = getTestFormatter(pattern => pattern === '0,0.000 &*', (_value, pattern) => '' + pattern);
            expect(format(1000, '0,0.000 &*', { formatters: [formatter3] })).toBe('0,0.000 &*');

            // Should avoid the formatter if matcher function returns false
            const avoidFormatSpy = jest.fn();
            format(1000, '0,0.000 &*', { formatters: [getTestFormatter(() => false, avoidFormatSpy)] });
            expect(avoidFormatSpy).toHaveBeenCalledTimes(0);
        });

        it('should call the formatters resolver if it is provided', () => {
            // Using percentage sign (it should be by default catched by built-in percentage formatter, but not in this case)
            const formatter = getTestFormatter(/%/, () => 'TEST_STRING');
            expect(format(1000, '0,0.000 %', { formatters: builtInFormatters => [formatter, ...builtInFormatters] })).toBe('TEST_STRING');

            // Not applying percentage
            expect(format(1000, '0,0.000 %', { formatters: () => [] })).toBe('1,000.000 %');
        });

        it('should apply first the built-in formatters', () => {
            // Using percentage sign (it should be by default catched by built-in percentage formatter)
            const formatter = getTestFormatter(/%/, () => 'TEST_STRING');
            expect(format(0.01, '0,0.000 %', { formatters: [formatter] })).toBe('1.000 %');
        });
    });
});
