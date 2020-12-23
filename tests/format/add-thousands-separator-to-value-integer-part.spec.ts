import { NumberFormatRules } from '../../src/core/types/rules';
import { NumerableLocale } from '../../src/locale/types/numerable-locale';
import { ResolvedNumerableFormatNumberOptions } from '../../src/formatter/types/resolved-format-number-options';
import addThousandsSeparatorToValueIntegerPart from '../../src/format-number/number-to-formatted-number/utils/add-thousands-separator-to-value-integer-part';

describe('add-thousands-separator-to-value-integer-part', () => {
    describe('addThousandsSeparatorToValueIntegerPart', () => {
        it('Should not include thousands separator if they are disabled in rules', () => {
            const tests: any[] = [
                ['123456789', '123456789'],
                ['1', '1'],
                ['987654321', '987654321'],
                ['98765432123456789', '98765432123456789'],
                ['123', '123'],
                ['123456', '123456'],
            ];

            tests.forEach(([value, expectedResult]) => {
                const result = addThousandsSeparatorToValueIntegerPart(
                    value,
                    { grouping: false } as NumberFormatRules,
                    { locale: { delimiters: { thousands: ',' }, digitGroupingStyle: [3] } } as ResolvedNumerableFormatNumberOptions,
                );
                expect([value, result]).toEqual([value, expectedResult]);
            });
        });

        it('Should apply [3] digit grouping by default if not found on locale', () => {
            const tests: any[] = [
                ['123456789', '123,456,789'],
                ['1', '1'],
                ['12', '12'],
                ['123', '123'],
                ['1234', '1,234'],
                ['987654321', '987,654,321'],
                ['98765432123456789', '98,765,432,123,456,789'],
                ['123456', '123,456'],
            ];

            tests.forEach(([value, expectedResult]) => {
                const result = addThousandsSeparatorToValueIntegerPart(
                    value,
                    { grouping: true } as NumberFormatRules,
                    { locale: { delimiters: { thousands: ',' } } } as ResolvedNumerableFormatNumberOptions,
                );
                expect([value, result]).toEqual([value, expectedResult]);
            });
        });

        it('Should apply the specified thousands separator in locale', () => {
            const createOptionsWithSpecificThousandsSeparator = (thousandsSeparator: string) => ({
                locale: { delimiters: { thousands: thousandsSeparator }, digitGroupingStyle: [3] },
            }) as ResolvedNumerableFormatNumberOptions;

            const tests: any[] = [
                ['123456789', '*', '123*456*789'],
                ['1234567891', '*', '1*234*567*891'],
                ['12345678912', '*', '12*345*678*912'],
                ['123456789123', '*', '123*456*789*123'],
                ['123456789123', '', '123456789123'],
                ['123456789123', ' ', '123 456 789 123'],
                ['123456789123', '.', '123.456.789.123'],
                ['123456789123', ';', '123;456;789;123'],
                ['123456789123', ':', '123:456:789:123'],
                ['9123', '&', '9&123'],
            ];

            tests.forEach(([value, digitGrouping, expectedResult]) => {
                const result = addThousandsSeparatorToValueIntegerPart(
                    value,
                    { grouping: true } as NumberFormatRules,
                    createOptionsWithSpecificThousandsSeparator(digitGrouping),
                );
                expect([value, digitGrouping, result]).toEqual([value, digitGrouping, expectedResult]);
            });
        });

        it('Should apply the specified digit grouping', () => {
            const createOptionsWithDigitGrouping = (digitGroupingStyle: number[]) => ({
                locale: { delimiters: { thousands: ',' }, digitGroupingStyle } as NumerableLocale,
            }) as ResolvedNumerableFormatNumberOptions;

            const tests: any[] = [
                // Single digit grouping
                ['123456789', [3], '123,456,789'],
                ['1234567891', [3], '1,234,567,891'],
                ['12345678912', [3], '12,345,678,912'],
                ['123456789123', [3], '123,456,789,123'],
                ['987654321', [2], '9,87,65,43,21'],
                ['9876543219', [2], '98,76,54,32,19'],
                ['987654321', [4], '9,8765,4321'],
                ['9876543219', [4], '98,7654,3219'],
                ['98765432191', [4], '987,6543,2191'],
                ['987654321912', [4], '9876,5432,1912'],
                // Numbers smaller or equal than single digit grouping
                ['123', [3], '123'],
                ['1234', [4], '1234'],
                ['12345', [5], '12345'],
                ['1234567890', [10], '1234567890'],
                ['123456789000000', [15], '123456789000000'],
                ['12345678900000000000', [20], '12345678900000000000'],
                ['1', [20], '1'],
                ['1', [200], '1'],
                ['1', [9999999999], '1'],
                // Multiple digit grouping
                ['123456789', [3, 2], '12,34,56,789'],
                ['1234567890', [3, 2], '1,23,45,67,890'],
                ['12345678901', [3, 2], '12,34,56,78,901'],
                ['12345678901', [2, 3], '123,456,789,01'],
                ['12345678901', [2, 3, 2], '12,34,56,789,01'],
                ['123456789012', [2, 3, 2], '1,23,45,67,890,12'],
                ['12345678901234', [4, 1, 3], '123,456,789,0,1234'],
                ['12345678901234', [4, 1, 3], '123,456,789,0,1234'],
                ['12345678901234', [2, 1, 3, 4], '1234,5678,901,2,34'],
            ];
            tests.forEach(([value, digitGrouping, expectedResult]) => {
                const result = addThousandsSeparatorToValueIntegerPart(
                    value,
                    { grouping: true } as NumberFormatRules,
                    createOptionsWithDigitGrouping(digitGrouping)
                );
                expect([value, digitGrouping, result]).toEqual([value, digitGrouping, expectedResult]);
            });
        });

        it('Should use [3] if an empty grouping style definition is empty', () => {
            const createOptionsWithDigitGrouping = (digitGroupingStyle: number[]) => ({
                locale: { delimiters: { thousands: ',' }, digitGroupingStyle } as NumerableLocale,
            }) as ResolvedNumerableFormatNumberOptions;

            const tests: any[] = [
                ['123456789', [], '123,456,789'],
            ];
            tests.forEach(([value, digitGrouping, expectedResult]) => {
                const result = addThousandsSeparatorToValueIntegerPart(
                    value,
                    { grouping: true } as NumberFormatRules,
                    createOptionsWithDigitGrouping(digitGrouping),
                );
                expect([value, digitGrouping, result]).toEqual([value, digitGrouping, expectedResult]);
            });
        });
    });
});
