import getLocaleFromPlatform from '../../src/formatter/utils/get-locale-from-platform';

describe('getLocaleFromPlatform()', () => {
    const originalToLocaleString = global.Number.prototype.toLocaleString;
    const originalIntl = global.Intl;

    afterEach(() => {
        global.Intl = originalIntl;
        global.Number.prototype.toLocaleString = originalToLocaleString;
    });


    it('should create abbreviations (short) if available', () => {
        global.Intl = { NumberFormat: () => ({}) } as any;
        global.Number.prototype.toLocaleString = function (this: number, code: string, options: any) {
            if (options?.notation === 'compact' && options?.compactDisplay === 'short') {
                if (this >= 10000000000) return 10 + ' this should be skipped';
                if (this >= 1000000000 && this < 10000000000) return 1 + ' billions';
                if (this >= 10000000 && this < 100000000) return 1 + ' ten millions';
                if (this >= 1000000 && this < 10000000) return 1 + ' millions';
                if (this >= 100000 && this < 1000000) return 1 + ' hundred thousands';
                if (this >= 1000 && this < 10000) return 1 + ' thousands';
            }
            return this.toString();
        } as any;

        const result = getLocaleFromPlatform('es1-is-memoized');
        expect(result.abbreviations).toBe('|||thousands||hundred thousands|millions|ten millions||billions');
    });

    it('should create digits array if different from latin', () => {
        // No grouping
        global.Number.prototype.toLocaleString = function () {
            return 'abcdefghio';
        } as any;
        const result1 = getLocaleFromPlatform('es-digits-no-grouping-is-memoized');
        expect(result1.numeralSystem).toEqual(['o', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

        // Grouping (dot)
        global.Number.prototype.toLocaleString = function () {
            return 'a.bcd.efg.hio';
        } as any;
        const result2 = getLocaleFromPlatform('es-digits-grouping-dot-is-memoized');
        expect(result2.numeralSystem).toEqual(['o', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

        // Grouping (single quote)
        global.Number.prototype.toLocaleString = function () {
            return 'a\'bcd\'efg\'hio';
        } as any;
        const result3 = getLocaleFromPlatform('es-digits-grouping-squote-is-memoized');
        expect(result3.numeralSystem).toEqual(['o', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

        // Latin
        global.Number.prototype.toLocaleString = function () {
            return '1234567890';
        } as any;
        const result4 = getLocaleFromPlatform('es-digits-latin-is-memoized');
        expect(result4.numeralSystem).toEqual(undefined);
    });

    it('should create delimiters', () => {
        // thousands: _ | decimal: * delimiters
        global.Number.prototype.toLocaleString = function (this: number) {
            // <i> Handle getNumeralSystemDigits call
            if (this === 1234567890) return '1234567890';

            return '12_345_678*123';
        } as any;
        const result1 = getLocaleFromPlatform('es-delimiters(_*)-is-memoized');
        expect(result1.delimiters).toEqual({ thousands: '_', decimal: '*' });

        // thousands: . | decimal: , delimiters
        global.Number.prototype.toLocaleString = function (this: number) {
            // <i> Handle getNumeralSystemDigits call
            if (this === 1234567890) return '1234567890';

            return '12.345.678,123';
        } as any;
        const result2 = getLocaleFromPlatform('es-delimiters(.,)-is-memoized');
        expect(result2.delimiters).toEqual({ thousands: '.', decimal: ',' });

        // thousands: ' | decimal: . delimiters
        global.Number.prototype.toLocaleString = function (this: number) {
            // <i> Handle getNumeralSystemDigits call
            if (this === 1234567890) return '1234567890';

            return '12\'345\'678.123';
        } as any;
        const result3 = getLocaleFromPlatform('es-delimiters(\'.)-is-memoized');
        expect(result3.delimiters).toEqual({ thousands: '\'', decimal: '.' });
    });

    it('should create grouping style', () => {
        // [3]
        global.Number.prototype.toLocaleString = function (this: number, ...args: any[]) {
            if (this === 100000000000) return '100,000,000,000';
            return originalToLocaleString.apply(this, args as any);
        } as any;
        const result1 = getLocaleFromPlatform('es-digit-grouping-style(1)-is-memoized');
        expect(result1.digitGroupingStyle).toEqual([3]);

        // [3,2,2,3]
        global.Number.prototype.toLocaleString = function (this: number, ...args: any[]) {
            if (this === 100000000000) return '10,000,00,00,000';
            return originalToLocaleString.apply(this, args as any);
        } as any;
        const result2 = getLocaleFromPlatform('es-digit-grouping-style(2)-is-memoized');
        expect(result2.digitGroupingStyle).toEqual([3,2,2,3]);
    });
});
