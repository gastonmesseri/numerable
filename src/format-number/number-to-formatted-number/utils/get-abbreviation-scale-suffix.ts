import { NumberFormatRules } from '../../../core/types/rules';

const getAbbreviationScaleSuffix = (abbreviationScale: string | null, patternRules: NumberFormatRules): string => {
    if (!abbreviationScale) return '';
    return (patternRules.compactSpace ? ' ' : '') + abbreviationScale;
};

export default getAbbreviationScaleSuffix;
