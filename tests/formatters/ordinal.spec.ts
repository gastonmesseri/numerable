import { en } from '../../src/locale';
import parse from '../../src/api/parse';
import format from '../../src/api/format';

describe('format: ordinal', () => {
    describe('format', () => {
        it('should format to an ordinal', () => {
            const tests: [number, string, string][] = [
                [1, '0o', '1st'],
                [52, '0 o', '52 nd'],
                [23, '0o', '23rd'],
                [100, '0o', '100th'],
                [1234, '0,0o', '1,234th'],
            ];

            tests.forEach(([value, pattern, expectedResult]) => {
                const result = format(value, pattern);
                expect([value, pattern, result]).toEqual([value, pattern, expectedResult]);
            });
        });

        it('should fallback to "en" ordinal if no ordinal is found in locale', () => {
            expect(format(12, '0o', { locale: { ...en, ordinal: undefined }})).toBe('12th');
            expect(format(1, '0o', { locale: { ...en, ordinal: null as any }})).toBe('1st');
            expect(format(2, '0 o', { locale: { ...en, ordinal: undefined }})).toBe('2 nd');
            expect(format(3, '0 o', { locale: { ...en, ordinal: null as any }})).toBe('3 rd');
        });

        it('should use empty string if ordinal function returns nil', () => {
            expect(format(12, '0o', { locale: { ...en, ordinal: () => undefined as any }})).toBe('12');
            expect(format(1, '0o', { locale: { ...en, ordinal: () => null as any }})).toBe('1');
            expect(format(2, '0 o', { locale: { ...en, ordinal: () => undefined as any }})).toBe('2 ');
            expect(format(3, '0 o', { locale: { ...en, ordinal: () => null as any }})).toBe('3 ');
        });
    });

    describe('unformat', () => {
        it('should unformat to an ordinal', function() {
            const tests = [
                ['1st', 1],
                ['52 nd', 52],
                ['23rd', 23],
                ['100th', 100],
                ['1,234th', 1234],
            ];

            tests.forEach(([formattedString, expectedResult]) => {
                expect([formattedString, parse(formattedString)]).toEqual([formattedString, expectedResult]);
            });
        });
    });
});
