import escapeRegexString from '../../../dist/core/utils/escape-regex-string';

/**
 * Built-in placeholders are:
 *     - '$s' for sign
 *     - '$n' for number
 *     - '$nps' for negative parenthesis start
 *     - '$npe' for negative parenthesis end
 *     - '$a' for abbreviation
 */

/**
 * This regex will match everything that is surrounded by single quotes
 * E.g. "test1 'test2' test3 'test4'".replace(singleQuotesRegExp, '') === "test1  test3 "
 */
const singleQuotesRegExpString = "'(.*?)'";

export const patternIncludes = (pattern: string, searchValue: string) => {
    const regexp = new RegExp(`${escapeRegexString(searchValue)}(?=([^']*'[^']*')*[^']*$)`);
    return regexp.test(pattern);
};

export const patternReplace = (pattern: string, searchValue: string | RegExp, replaceValue: string, flags?: string) => {
    const searchPartOfRegExp = typeof searchValue === 'string'
        ? escapeRegexString(searchValue)
        : searchValue.source;
    const regexp = new RegExp(`${searchPartOfRegExp}(?=([^']*'[^']*')*[^']*$)`, flags);
    return pattern.replace(regexp, replaceValue);
};

export const patternRemovePlaceholders = (pattern: string) => {
    return pattern.replace(new RegExp(singleQuotesRegExpString, 'g'), '');
};
