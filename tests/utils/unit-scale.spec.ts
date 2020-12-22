import { UnitScaleDefinition, toBase, convertUnit, toBest } from '../../src/core/utils/unit-scale';

describe('unit-scale', () => {
    // SI (International system of units) https://physics.nist.gov/cuu/Units/prefixes.html
    const siScale: UnitScaleDefinition = {
        base: '',
        scale: {
            n: 0.000000001,
            µ: 0.000001,
            m: 0.001,
            c: 0.01,
            d: 0.1,
            ['']: 1,
            da: 10,
            h: 100,
            k: 1000,
            M: 1000000,
            G: 1000000000,
            T: 1000000000000,
        },
    };

    const timeScale: UnitScaleDefinition = {
        // Using 'min' as base for testing downscaling with not power of ten
        base: 'min',
        scale: {
            ns: (1/60)/1000000000,
            mu: (1/60)/1000000,
            ms: (1/60)/1000,
            s: 1/60,
            min: 1,
            h: 60,
            d: 60 * 24,
            week: 60 * 24 * 7,
            month: 60 * 24 * 365.25 / 12,
            year: 60 * 24 * 365.25,
        },
    };

    describe('toBase', () => {
        it('should properly transform the number to its unit scale base', () => {
            const tests: any[] = [
                // -- Positive numbers
                // Base
                [1, '', siScale, 1],
                // Scale bigger than 1
                [1, 'da', siScale, 10],
                [1, 'h', siScale, 100],
                [1, 'k', siScale, 1000],
                [1, 'M', siScale, 1000000],
                [1, 'G', siScale, 1000000000],
                [1, 'T', siScale, 1000000000000],
                // Scale between 0 and 1
                [1, 'd', siScale, 0.1],
                [1, 'c', siScale, 0.01],
                [1, 'm', siScale, 0.001],
                [1, 'µ', siScale, 0.000001],
                [1, 'n', siScale, 0.000000001],
                // -- Negative numbers
                // Base
                [-1, '', siScale, -1],
                // Scale bigger than 1
                [-1, 'da', siScale, -10],
                [-1, 'h', siScale, -100],
                [-1, 'k', siScale, -1000],
                [-1, 'M', siScale, -1000000],
                [-1, 'G', siScale, -1000000000],
                [-1, 'T', siScale, -1000000000000],
                // Scale between 0 and 1
                [-1, 'd', siScale, -0.1],
                [-1, 'c', siScale, -0.01],
                [-1, 'm', siScale, -0.001],
                [-1, 'µ', siScale, -0.000001],
                [-1, 'n', siScale, -0.000000001],
            ];

            tests.forEach(([value, unit, scaleDefinition, expectedResult]) => {
                expect([value, unit, toBase(value, unit, scaleDefinition)])
                    .toEqual([value, unit, expectedResult]);
            });
        });

        it('should properly transform the number to its unit scale base (with a non power of ten based scale)', () => {
            const tests: any[] = [
                // -- Positive numbers
                // Base
                [1, 'min', timeScale, 1],
                // Scale bigger than 1
                [1, 'h', timeScale, 60],
                [1, 'd', timeScale, 1440],
                [1, 'week', timeScale, 10080],
                [1, 'month', timeScale, 43830],
                [1, 'year', timeScale, 525960],
                // Scale between 0 and 1
                [1, 's', timeScale, 0.016666666666666666],
                [1, 'ms', timeScale, 0.000016666666666666667],
                [1, 'mu', timeScale, 1.6666666666666667e-8],
                [1, 'ns', timeScale, 1.6666666666666667e-11],
                // -- Negative numbers
                // Base
                [-1, 'min', timeScale, -1],
                // Scale bigger than 1
                [-1, 'h', timeScale, -60],
                [-1, 'd', timeScale, -1440],
                [-1, 'week', timeScale, -10080],
                [-1, 'month', timeScale, -43830],
                [-1, 'year', timeScale, -525960],
                // Scale between 0 and 1
                [-1, 's', timeScale, -0.016666666666666666],
                [-1, 'ms', timeScale, -0.000016666666666666667],
                [-1, 'mu', timeScale, -1.6666666666666667e-8],
                [-1, 'ns', timeScale, -1.6666666666666667e-11],
            ];

            tests.forEach(([value, unit, scaleDefinition, expectedResult]) => {
                expect([value, unit, toBase(value, unit, scaleDefinition)])
                    .toEqual([value, unit, expectedResult]);
            });
        });

        it('should handle values different than 1 and -1', () => {
            const tests: any[] = [
                // SI scale
                [58.858, '', siScale, 58.858],
                [2.1, 'da', siScale, 21],
                [58.858, 'k', siScale, 58858],
                [-0.53, 'M', siScale, -530000],
                [12.989, 'G', siScale, 12989000000],
                [1.879765, 'T', siScale, 1879765000000],
                [-1.2345, 'T', siScale, -1234500000000],
                [1.2345, 'c', siScale, 0.012345],
                [0.1345, 'm', siScale, 0.0001345],
                [-987.23, 'µ', siScale, -0.00098723],
                // Time scale
                [35.5, 'min', timeScale, 35.5],
                [1.2, 'h', timeScale, 72],
                [-0.5, 'd', timeScale, -720],
                [123.89, 'week', timeScale, 1248811.2],
                [0.012, 'month', timeScale, 525.96],
                [-99, 'year', timeScale, -52070040],
                [1.1, 's', timeScale, 0.018333333333333333],
                [-60, 's', timeScale, -1],
                [0.505, 'ms', timeScale, 0.000008416666666666667],
            ];

            tests.forEach(([value, unit, scaleDefinition, expectedResult]) => {
                expect([value, unit, toBase(value, unit, scaleDefinition)])
                    .toEqual([value, unit, expectedResult]);
            });
        });

        it('should handle non-finite numbers value (return same value)', () => {
            expect(toBase(NaN, 'm', timeScale)).toBe(NaN);
            expect(toBase(NaN, 'k', siScale)).toBe(NaN);
            expect(toBase(Infinity, 's', timeScale)).toBe(Infinity);
            expect(toBase(Infinity, '', siScale)).toBe(Infinity);
            expect(toBase(-Infinity, 'year', timeScale)).toBe(-Infinity);
            expect(toBase(-Infinity, 'm', siScale)).toBe(-Infinity);
        });

        it('should handle not found valueUnit (return NaN)', () => {
            expect(toBase(1, 'momo', timeScale)).toBe(NaN);
            expect(toBase(123456, 'kasdf', siScale)).toBe(NaN);
            expect(toBase(-1, 'swerwer', timeScale)).toBe(NaN);
            expect(toBase(-1, 'swerwer', { base: 's', scale: {} })).toBe(NaN);
        });
    });

    describe('convertUnit', () => {
        it('should properly transform the origin unit to the target unit', () => {
            const tests: any[] = [
                [1, '', 'm', siScale, 1000],
                [1, 'µ', 'da', siScale, 0.0000001],
                [-1, 'M', 'k', siScale, -1000],
                [123, 'G', 'k', siScale, 123000000],
                [-9, 'T', 'd', siScale, -90000000000000],
                [0.1, 'd', 'k', siScale, 0.00001],
                [1, 'k', '', siScale, 1000],

                [35.5, 'min', 's', timeScale, 2130],
                [1.2, 'h', 'ms', timeScale, 4320000],
                [-1, 'd', 'week', timeScale, -0.14285714285714285],
                [123.89, 'week', 'year', timeScale, 2.374346338124572],
                [-365.25, 'd', 'year', timeScale, -1],
            ];

            tests.forEach(([value, originUnit, targetUnit, scaleDefinition, expectedResult]) => {
                expect([value, originUnit, targetUnit, convertUnit(value, originUnit, targetUnit, scaleDefinition)])
                    .toEqual([value, originUnit, targetUnit, expectedResult]);
            });
        });

        it('should handle non-finite numbers value (return same value)', () => {
            expect(convertUnit(NaN, 'm', 'day', timeScale)).toBe(NaN);
            expect(convertUnit(NaN, 'k', '', siScale)).toBe(NaN);
            expect(convertUnit(Infinity, 's', 'm', timeScale)).toBe(Infinity);
            expect(convertUnit(Infinity, '', 'M', siScale)).toBe(Infinity);
            expect(convertUnit(-Infinity, 'year', 'month', timeScale)).toBe(-Infinity);
            expect(convertUnit(-Infinity, 'm', 'm', siScale)).toBe(-Infinity);
        });

        it('should handle not found valueUnit or targetUnit (return NaN) ', () => {
            expect(convertUnit(1, 'momo', 'm', timeScale)).toBe(NaN);
            expect(convertUnit(123456, 'kasdf', 'k', siScale)).toBe(NaN);
            expect(convertUnit(-1, 'h', 'swerwer', timeScale)).toBe(NaN);
            expect(convertUnit(-1, 's', 'swerwer', { base: 's', scale: {} })).toBe(NaN);
        });
    });

    describe('toBest', () => {
        it('should return the smallest unit with a value above 1', () => {
            const tests: any[] = [
                [1, '', siScale, [1, '']],
                [999999, '', siScale, [999.999, 'k']],
                [-1000, '', siScale, [-1, 'k']],
                [1000000, '', siScale, [1, 'M']],
                [-1000000000, '', siScale, [-1, 'G']],
                [1000000000000, '', siScale, [1, 'T']],
                [1000000000000000, '', siScale, [1000, 'T']],
                [1000, 'm', siScale, [1, '']],
                [0.001, '', siScale, [1, 'm']],
                [0.1, '', siScale, [1, 'd']],
                [0.01, '', siScale, [1, 'c']],
                [0.0001, '', siScale, [100, 'µ']],
            ];

            tests.forEach(([value, unit, scaleDefinition, expectedResult, options]) => {
                expect([value, unit, toBest(value, unit, scaleDefinition, options)])
                    .toEqual([value, unit, expectedResult]);
            });
        });

        it('should match a scale whose number is greater than the specified cutOffNumber in the options', () => {
            expect(toBest(1000000, '', siScale, { cutOffNumber: 1.2 })).toEqual([1000, 'k']);
            expect(toBest(1199000, '', siScale, { cutOffNumber: 1.2 })).toEqual([1199, 'k']);
            expect(toBest(1200000, '', siScale, { cutOffNumber: 1.2 })).toEqual([1.2, 'M']);
            expect(toBest(-1199000, '', siScale, { cutOffNumber: 1.2 })).toEqual([-1199, 'k']);
            expect(toBest(-1200000, '', siScale, { cutOffNumber: 1.2 })).toEqual([-1.2, 'M']);
        });

        it('should exclude the scales that are contained in the exclude array in the options', () => {
            // Without
            expect(toBest(999, '', siScale, { exclude: [] })).toEqual([9.99, 'h']);
            // With exclude
            expect(toBest(999, '', siScale, { exclude: ['da', 'h'] })).toEqual([999, '']);
        });
    });
});
