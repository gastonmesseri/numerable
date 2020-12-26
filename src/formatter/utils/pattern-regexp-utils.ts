import escapeRegexString from '../../core/utils/escape-regex-string';

/**
 * This regex will match everything that is surrounded by single quotes
 * E.g. "test1 'test2' test3 'test4'".replace(singleQuotesRegExp, '') === "test1  test3 "
 */
const singleQuotesRegExpString = "'(.*?)'";

export const patternIncludes = (patternMask: string, searchValue: string) => {
    const regexp = new RegExp(`${escapeRegexString(searchValue)}(?=([^']*'[^']*')*[^']*$)`);
    return regexp.test(patternMask);
};

export const patternReplace = (patternMask: string, searchValue: string | RegExp, replaceValue: string, flags?: string) => {
    const searchPartOfRegExp = typeof searchValue === 'string'
        ? escapeRegexString(searchValue)
        : searchValue.source;
    const regexp = new RegExp(`${searchPartOfRegExp}(?=([^']*'[^']*')*[^']*$)`, flags);
    return patternMask.replace(regexp, replaceValue);
};

export const patternRemovePlaceholders = (patternMask: string) => {
    return patternMask.replace(new RegExp(singleQuotesRegExpString, 'g'), '');
};

export const patternStripPlaceholders = (patternMask: string) => {
    return patternMask.replace(new RegExp(singleQuotesRegExpString, 'g'), (_, placeholderWithoutQuotes) => placeholderWithoutQuotes);
};
