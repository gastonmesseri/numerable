import { AbbreviationScale } from './abbreviation-scale';

export interface NumberFormatRules {
    /** Defines whether it should use or not thousands separator */
    grouping: boolean;
    omitInteger: boolean;

    // sign
    /** Determines whether the negative numbers should be wrapped between parentheses */
    negativeParentheses: boolean;
    forceSign: boolean;

    // abbreviation
    compact: boolean;
    compactUnit: AbbreviationScale | null;
    /** Defines whether the abbreviation unit ('a') is automatic and not forced */
    compactAuto: boolean;

    // integers
    minimumIntegerDigits: number;

    // decimals
    minimumFractionDigits: number;
    maximumFractionDigits: number;
    optionalFractionDigits: boolean;

    // pattern mask
    patternMask: string;
}
