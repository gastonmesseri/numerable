import stringIncludes from '../../../core/utils/string-includes';

/**
 * Check for optional decimals.
 * 
 * <i> 'optionalDecimals' This would mean that:
 *     - In case the number (value) HAS decimals (e.g. 55.34), then it would display the fixed amount of defined 
 *       decimals (e.g. '0[.]000' => 3 fixed decimals), but, if the number is an straight integer, then it won't 
 *       display any decimals.
 * <i> It could also accept optional decimals afterwards. So for the case '0[.]00##':
 *     - If it is an integer, displays only an integer:  23 => '23'
 *     - If it has 1 decimal, displays 2 decimals:       23.4 => '23.40'
 *     - If it has 3 decimals, displays 3 decimals:      23.456 => '23.456'
 */
export const optionalDecimalPlacesRule = (pattern: string) => {
    let outputPattern = pattern;
    let optionalFractionDigits = false;

    if (stringIncludes(pattern, '[.]')) {
        optionalFractionDigits = true;
        outputPattern = pattern.replace('[.]', '.');
    }

    return [outputPattern, { optionalFractionDigits }] as const;
};

