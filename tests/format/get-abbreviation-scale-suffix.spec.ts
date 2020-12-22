import { NumberFormatRules } from '../../src/core/types/rules';
import getAbbreviationScaleSuffix from '../../src/format-number/number-to-formatted-number/utils/get-abbreviation-scale-suffix';

describe('getAbbreviationScaleSuffix', () => {
    it('should return empty string for non-valid abbreviationScale', () => {
        const basePatternRules = { compactSpace: false } as NumberFormatRules;
        expect(getAbbreviationScaleSuffix(null, basePatternRules)).toBe('');
        expect(getAbbreviationScaleSuffix('' as any, basePatternRules)).toBe('');
        expect(getAbbreviationScaleSuffix(undefined as any, basePatternRules)).toBe('');
    });

    it('should include space for "hasAbbreviationSpace: true" rule', () => {
        expect(getAbbreviationScaleSuffix('K', { compactSpace: true } as NumberFormatRules)).toBe(' K');
    });

    it('should not include space for "hasAbbreviationSpace: false" rule', () => {
        expect(getAbbreviationScaleSuffix('M', { compactSpace: false } as NumberFormatRules)).toBe('M');
    });
});
