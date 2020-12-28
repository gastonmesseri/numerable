import isString from '../../core/utils/is-string';
import escapeRegexString from '../../core/utils/escape-regex-string';

/**
 * This regex will match everything that is surrounded by single quotes
 * E.g. "test1 'test2' test3 'test4'".replace(singleQuotesRegExp, '') === "test1  test3 "
 */
const singleQuotesRegExpString = "'(.*?)'";

export const patternIncludes = (patternMask: string, searchValue: string | RegExp) => {
    const [searchPartOfRegExp, flags] = isString(searchValue) ? [escapeRegexString(searchValue), undefined] : [searchValue.source, searchValue.flags];
    const regexp = new RegExp(`${searchPartOfRegExp}(?=([^']*'[^']*')*[^']*$)`, flags);
    return regexp.test(patternMask);
};


export const patternReplace = (patternMask: string, searchValue: string | RegExp, replaceValue: string) => {
    const [searchPartOfRegExp, flags] = isString(searchValue) ? [escapeRegexString(searchValue), undefined] : [searchValue.source, searchValue.flags];
    const regexp = new RegExp(`${searchPartOfRegExp}(?=([^']*'[^']*')*[^']*$)`, flags);
    return patternMask.replace(regexp, _ => replaceValue);
};

export const patternRemoveEscapedText = (patternMask: string) => {
    return patternMask.replace(new RegExp(singleQuotesRegExpString, 'g'), '');
};

export const patternStripPlaceholders = (patternMask: string) => {
    return patternMask.replace(new RegExp(singleQuotesRegExpString, 'g'), (_, placeholderWithoutQuotes) => placeholderWithoutQuotes);
};
