import { AbbreviationScale } from './abbreviation-scale';

export interface NumberFormatRules {
    /** Defines whether it should use or not thousands separator */
    grouping: boolean;

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

    /**
     * Pattern mask:
     * <i> Built-in placeholders are:
     *    - 'ɵs' for sign
     *    - 'ɵn' for number
     *    - 'ɵnps' for negative parenthesis start
     *    - 'ɵnpe' for negative parenthesis end
     *    - 'ɵa' for abbreviation
     */
    patternMask: string;
}
