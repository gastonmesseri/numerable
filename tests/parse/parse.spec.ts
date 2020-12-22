import { en } from '../../src/locale';
import parse from '../../src/formatter/parse/parse';
import { NumerableLocale } from '../../src/core/types/numerable-locale';

describe('parse', () => {
    it('should parse NaN, null, undefined as null', () => {
        expect(parse(NaN)).toBe(null);
        expect(parse(null as any)).toBe(null);
        expect(parse(undefined as any)).toBe(null);
    });

    it('should transform to number (or null) if not input is not handled', () => {
        expect(parse([] as any)).toBe(0);
        expect(parse({} as any)).toBe(null);
        expect(parse(/s/ as any)).toBe(null);
        expect(parse(true as any)).toBe(1);
        expect(parse(false as any)).toBe(0);
        expect(parse((() => '') as any)).toBe(null);
    });

    it('should properly parse a number', () => {
        const tests: any[] = [
            [0, 0],
            [1.2323, 1.2323],
            [-1200500, -1200500],
            [5600800900700400, 5600800900700400],
            [0.0000000001, 0.0000000001],
            [-0.0000000001, -0.0000000001],
            [0, 0],
            [1, 1],
            [1.1, 1.1],
            [-0, 0],
            [-1, -1],
            [-1.1, -1.1],
            [Infinity, Infinity],
        ];

        tests.forEach(([value, expectedResult]) => {
            expect([value, parse(value)]).toEqual([value, expectedResult]);
        });
    });

    it('should properly parse a string', () => {
        const tests: any[] = [
            ['-0', -0],
            ['0', 0],
            ['0.123', 0.123],
            ['-500,000.23', -500000.23],
            ['1,234,567.8901', 1234567.8901],
            ['-0.0000000123', -0.0000000123],
            ['0.9990000000000000', 0.999],
            ['00000000009765,234,111.8900000', 9765234111.89],
            ['-00050.5000000', -50.5],
            ['(1.5)', -1.5],
            ['(00001.50000)', -1.5],
            ['+0.999', 0.999],
            ['0.999-', -0.999],
            ['0.999+', 0.999],
            ['10,000.123', 10000.123],
            ['(0.12345)', -0.12345],
            ['((--0.12345))', 0.12345],
            ['1.23T', 1230000000000],
            ['', null],
        ];

        tests.forEach(([value, expectedResult]) => {
            expect([value, parse(value)]).toEqual([value, expectedResult]);
        });
    });

    it('should apply the locale during parsing', () => {
        const withDelimiters = ([thousands, decimal]: [thousands: string, decimal: string]): NumerableLocale =>  ({
            ...en,
            delimiters: { thousands, decimal },
        });
        const withGroupingStyle = (groupingStyle: number[]): NumerableLocale => ({ ...en, digitGroupingStyle: groupingStyle });
        const withAbbreviations = (abbreviations: string): NumerableLocale => ({ ...en, abbreviations });
        const withNumeralSystem = (numeralSystem: string[]): NumerableLocale => ({ ...en, numeralSystem });
        const withObject = (object: Partial<NumerableLocale>): NumerableLocale => ({ ...en, ...object });
        const arabNumeralSystem = [
            '٠',
            '١',
            '٢',
            '٣',
            '٤',
            '٥',
            '٦',
            '٧',
            '٨',
            '٩',
        ].map(e => e + '\u200e');
        const abcNumeralSystem = ['o', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        const tests: any[] = [
            // Delimiters
            ['123 456 789,12', withDelimiters([' ', ',']), 123456789.12],
            ['123**789-12', withDelimiters(['**', '-']), 123789.12],
            ['1_234+33', withDelimiters(['_', '+']), 1234.33],
            ['-1٬234٫10', withDelimiters(['٬', '٫']), -1234.1],
            ['1"234^33', withDelimiters(['"', '^']), 1234.33],
            ['-1.234,33', withDelimiters(['.', ',']), -1234.33],
            ['(1.234,33)', withDelimiters(['.', ',']), -1234.33],
            ['1$234`33-', withDelimiters(['$', '`']), -1234.33],
            ['1\'234,33-', withDelimiters(['\'', ',']), -1234.33],
            ['+1\'000,19', withDelimiters(['\'', ',']), 1000.19],
            ['1\'000,19+', withDelimiters(['\'', ',']), 1000.19],
            // Grouping style
            ['1,23,456.789', withGroupingStyle([3, 2]), 123456.789],
            ['-1,23,456.789', withGroupingStyle([3, 2]), -123456.789],
            ['3,456.789', withGroupingStyle([3, 2]), 3456.789],
            ['9,8712,3456.789', withGroupingStyle([4]), 987123456.789],
            ['-9,8712,3456.789', withGroupingStyle([4]), -987123456.789],
            ['2,3456.789', withGroupingStyle([4]), 23456.789],
            ['(2,3456.789)', withGroupingStyle([4]), -23456.789],
            ['2,3456.789-', withGroupingStyle([4]), -23456.789],
            ['+2,3456.789', withGroupingStyle([4]), 23456.789],
            ['2,3456.789+', withGroupingStyle([4]), 23456.789],
            // Abbreviations (also with multiple characters)
            ['2.2K', withAbbreviations('|||K'), 2200],
            ['-2.2K', withAbbreviations('|||K'), -2200],
            ['10 M', withAbbreviations('|||K|||M'), 10000000],
            ['-23.8 M', withAbbreviations('|||K|||M'), -23800000],
            ['-1.25 B', withAbbreviations('|||K|||M|||B'), -1250000000],
            ['900.88 B', withAbbreviations('|||K|||M|||B'), 900880000000],
            ['5.198 T', withAbbreviations('|||K|||M|||B|||T'), 5198000000000],
            ['-23.504 T', withAbbreviations('|||K|||M|||B|||T'), -23504000000000],
            ['10,200 T', withAbbreviations('|||K|||M|||B|||T'), 10200000000000000],
            ['13 K', withAbbreviations('|||K|||M|||B|||T'), 13000],
            ['13 M', withAbbreviations('|||K|||M|||B|||T'), 13000000],
            ['-13 B', withAbbreviations('|||K|||M|||B|||T'), -13000000000],
            ['13', withAbbreviations('|||K|||M|||B|||T'), 13],
            ['-13', withAbbreviations('|||K|||M|||B|||T'), -13],
            ['2.62 Ka', withAbbreviations('|||Ka|||Ma|||Ba|||Ta'), 2620],
            ['2.62 Ma', withAbbreviations('|||Ka|||Ma|||Ba|||Ta'), 2620000],
            ['-2.62 Ba', withAbbreviations('|||Ka|||Ma|||Ba|||Ta'), -2620000000],
            ['2.62 Ta', withAbbreviations('|||Ka|||Ma|||Ba|||Ta'), 2620000000000],
            ['3.5 T', withAbbreviations('|||T||L||Cr|||TCr||LCr'), 3500],
            ['3.5 L', withAbbreviations('|||T||L||Cr|||TCr||LCr'), 350000],
            ['-3.5 Cr', withAbbreviations('|||T||L||Cr|||TCr||LCr'), -35000000],
            ['3.5 TCr', withAbbreviations('|||T||L||Cr|||TCr||LCr'), 35000000000],
            ['3.5 LCr', withAbbreviations('|||T||L||Cr|||TCr||LCr'), 3500000000000],
            ['4.256 mil', withAbbreviations('|||mil|||M|||mil M|||B'), 4256],
            ['-4.256 M', withAbbreviations('|||mil|||M|||mil M|||B'), -4256000],
            ['4.256 mil M', withAbbreviations('|||mil|||M|||mil M|||B'), 4256000000],
            ['4.256 B', withAbbreviations('|||mil|||M|||mil M|||B'), 4256000000000],
            ['-1.01 asd a', withAbbreviations('|||asd a|||asd b|||asd c|||asd d'), -1010],
            ['1.01asd b', withAbbreviations('|||asd a|||asd b|||asd c|||asd d'), 1010000],
            ['-1.01 asd c', withAbbreviations('|||asd a|||asd b|||asd c|||asd d'), -1010000000],
            ['1.01asd d', withAbbreviations('|||asd a|||asd b|||asd c|||asd d'), 1010000000000],
            ['6.19 万', withAbbreviations('||||万||||亿||||万亿'), 61900],
            ['6.19亿', withAbbreviations('||||万||||亿||||万亿'), 619000000],
            ['-6.19 万亿', withAbbreviations('||||万||||亿||||万亿'), -6190000000000],
            ['6,1900 万亿', withAbbreviations('||||万||||亿||||万亿'), 61900000000000000],
            ['(1.23 K)', withAbbreviations('|||K|||M|||B|||T'), -1230],
            ['+1.23 K', withAbbreviations('|||K|||M|||B|||T'), 1230],
            ['1.23- K', withAbbreviations('|||K|||M|||B|||T'), -1230],
            ['1.23+ K', withAbbreviations('|||K|||M|||B|||T'), 1230],
            ['1 ألف\u200e', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            ['-1 ألف\u200e', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['(1 ألف\u200e)', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['+1 ألف\u200e', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            ['1- ألف\u200e', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['1+ ألف\u200e', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            ['1 ألف', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            ['-1 ألف', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['(1 ألف)', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['+1 ألف', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            ['1- ألف', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), -1000],
            ['1+ ألف', withAbbreviations('|||ألف\u200e|||مليون\u200e|||مليار\u200e|||ترليون\u200e'), 1000],
            // Numeral system
            ['abc,def.ghioa', withNumeralSystem(abcNumeralSystem), 123456.78901],
            ['-abc,def.ghioa', withNumeralSystem(abcNumeralSystem), -123456.78901],
            ['f.oa', withNumeralSystem(abcNumeralSystem), 6.01],
            ['-f.oa', withNumeralSystem(abcNumeralSystem), -6.01],
            ['abc,def,ghi.oab', withNumeralSystem(abcNumeralSystem), 123456789.012],
            ['-abc,def,ghi.oab', withNumeralSystem(abcNumeralSystem), -123456789.012],
            ['i,hgf,edc,bao', withNumeralSystem(abcNumeralSystem), 9876543210],
            ['-i,hgf,edc,bao', withNumeralSystem(abcNumeralSystem), -9876543210],
            ['+f.oa', withNumeralSystem(abcNumeralSystem), 6.01],
            ['f.oa+', withNumeralSystem(abcNumeralSystem), 6.01],
            ['f.oa-', withNumeralSystem(abcNumeralSystem), -6.01],
            ['(f.oa)', withNumeralSystem(abcNumeralSystem), -6.01],
            ['٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e١\u200e٠\u200e', withNumeralSystem(arabNumeralSystem), 9876543210],
            ['-٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e١\u200e٠\u200e', withNumeralSystem(arabNumeralSystem), -9876543210],
            ['٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e.١\u200e٠\u200e٩\u200e', withNumeralSystem(arabNumeralSystem), 98765432.109],
            ['+٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e.١\u200e٠\u200e٩\u200e', withNumeralSystem(arabNumeralSystem), 98765432.109],
            ['٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e.١\u200e٠\u200e٩\u200e-', withNumeralSystem(arabNumeralSystem), -98765432.109],
            ['٩\u200e٨\u200e٧\u200e٦\u200e٥\u200e٤\u200e٣\u200e٢\u200e.١\u200e٠\u200e٩\u200e+', withNumeralSystem(arabNumeralSystem), 98765432.109],
            ['٩٨٧٦٥٤٣٢.١٠٩', withNumeralSystem(arabNumeralSystem), 98765432.109],
            // - Numeral system with abbreviations
            ['abc.def K', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), 123456],
            ['-abc.def K', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), -123456],
            ['(abc.def M)', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), -123456000],
            ['+abc.def B', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), 123456000000],
            ['abc.def- B', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), -123456000000],
            ['abc.def+ B', withObject({ numeralSystem: abcNumeralSystem, abbreviations: '|||K|||M|||B' }), 123456000000],
            // - Mixed
            ['a,bc,def', withObject({ numeralSystem: abcNumeralSystem, digitGroupingStyle: [3,2] }), 123456],
            ['ab,cdef.a', withObject({ numeralSystem: abcNumeralSystem, digitGroupingStyle: [4] }), 123456.1],
            ['abc*def_a', withObject({ numeralSystem: abcNumeralSystem, delimiters: { thousands: '*', decimal: '_'} }), 123456.1],
            ['ab\'cdef,a', withObject({ numeralSystem: abcNumeralSystem, delimiters: { thousands: '\'', decimal: ','}, digitGroupingStyle: [4], abbreviations: '|||K|||M' }), 123456.1],
        ];
        tests.forEach(([value, locale, expectedResult]) => {
            expect([value, parse(value, { locale })]).toEqual([value, expectedResult]);
        });
    });

    it('should return 0 if the string matches with the zeroFormat', () => {
        expect(parse('N/A', { zeroFormat: 'N/A' })).toBe(0);
        expect(parse('{} TEST_ZERO_FORMAT {}', { zeroFormat: '{} TEST_ZERO_FORMAT {}' })).toBe(0);
        expect(parse('{} TEST_ZERO_FORMAT {}', { zeroFormat: '{} TEST_ZERO_FORMAT {}', nullFormat: 'NULL' })).toBe(0);
    });

    it('should return null if the string matches with the nullFormat', () => {
        expect(parse('NULL', { nullFormat: 'NULL' })).toBe(null);
        expect(parse('2 NULL', { nullFormat: '2 NULL' })).toBe(null);
        expect(parse('', { nullFormat: '' })).toBe(null);
    });
});
