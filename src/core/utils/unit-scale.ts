import log10 from './log-10';
import isPowerOfTen from './is-power-of-ten';
import isFiniteNumber from './is-finite-number';
import multiplyByPowerOfTen from './multiply-by-power-of-ten';

type ScaleUnit = string;

type ToBaseMultiplier = number;

/**
 * Example:
 * const timeScaleDefinition = {
 *     base: 's', // Seconds as base unit
 *     scale: {
 *         'ms': 0.001,
 *         'm': 60,
 *         'h': 60 * 60,
 *         'd': 60 * 60 * 24,
 *         'week': 60 * 60 * 24 * 7,
 *     }
 * }
 * <i> If base is null, define base as ''
 */
export interface UnitScaleDefinition {
    base: string;
    scale: Record<ScaleUnit, ToBaseMultiplier>;
}

export const toBase = (value: number, valueUnit: string, unitScale: UnitScaleDefinition) => {
    if (!isFiniteNumber(value) || valueUnit === unitScale.base) return value;
    if (!(valueUnit in unitScale.scale)) return NaN;
    const toBaseMultiplier = unitScale.scale[valueUnit] || 1;
    return isPowerOfTen(toBaseMultiplier)
        ? multiplyByPowerOfTen(value, log10(toBaseMultiplier))
        : value * toBaseMultiplier;
};

export const convertUnit = (value: number, originUnit: string, targetUnit: string, unitScale: UnitScaleDefinition) => {
    if (!isFiniteNumber(value) || originUnit === targetUnit) return value;
    const valueAsBase = toBase(value, originUnit, unitScale);
    const resolvedScale = { ...unitScale.scale, [unitScale.base]: 1 };
    if (isNaN(valueAsBase) || !(originUnit in resolvedScale) || !(targetUnit in resolvedScale)) return NaN;
    const conversionFactorFromBase = unitScale.scale[targetUnit] || 1;
    return isPowerOfTen(conversionFactorFromBase)
        ? multiplyByPowerOfTen(valueAsBase, -log10(conversionFactorFromBase))
        : valueAsBase / conversionFactorFromBase;
};

export interface ToBestOptions {
    exclude: string[];
    cutOffNumber: number;
}

/**
 * Looks through every possibility for the 'best' available unit.
 * i.e. Where the value has the fewest numbers before the decimal point,
 * but is still higher than 1.
 */
export const toBest = (
    value: number,
    originUnit: string,
    unitScale: UnitScaleDefinition,
    options?: Partial<ToBestOptions>,
): [value: number, unit: string | null] => {
    const resolvedOptions: ToBestOptions = { exclude: [], cutOffNumber: 1, ...options };

    let best: [value: number, unit: string | null] | null = null;

    const scale = unitScale.scale;
    Object.keys(scale).sort((a, b) => scale[a] - scale[b]).forEach((scaleUnit) => {
        const isIncluded = resolvedOptions.exclude.indexOf(scaleUnit) === -1;
        if (!isIncluded) return;

        const result = convertUnit(value, originUnit, scaleUnit, unitScale);
        const absoluteResult = Math.abs(result);

        if (!best || (absoluteResult >= resolvedOptions.cutOffNumber && absoluteResult < Math.abs(best[0]))) {
            best = [result, scaleUnit];
        }
    });

    return best || [value, originUnit];
};

export const unitScale = (unitScaleDefinition: UnitScaleDefinition) => {
    return {
        toBase: (value: number, unit: string) => {
            return toBase(value, unit, unitScaleDefinition);
        },
        convert: (value: number, originUnit: string, targetUnit: string) => {
            return convertUnit(value, originUnit, targetUnit, unitScaleDefinition);
        },
        toBest: (value: number, originUnit: string, options?: ToBestOptions) => {
            return toBest(value, originUnit, unitScaleDefinition, options);
        },
        scaleDefinition: unitScaleDefinition,
    };
};
