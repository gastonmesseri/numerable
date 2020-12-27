import en from '../../locale/en';
import unique from '../../core/utils/unique';
import memoize from '../../core/utils/memoize';
import stringRepeat from '../../core/utils/string-repeat';
import escapeRegexString from '../../core/utils/escape-regex-string';
import { ResolvedNumerableLocale } from '../../core/types/resolved-numerable-locale';

/**
 * <i> Extracted from https://stackoverflow.com/questions/12006095/javascript-how-to-check-if-character-is-rtl
 */
const leftToRightMark = '\u200e';
const rtlChars = '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC';
const rtlDirCheck = new RegExp('^[^'+rtlChars+']*?['+rtlChars+']');
const isRTL = (string: string) => rtlDirCheck.test(string);
const appendLeftToRightMarkIfIsRTL = (string: string) => isRTL(string) ? string + leftToRightMark : string;

const languagesWith4DigitsGroupingStyle = ['zh', 'yue', 'ko', 'ja'];

const toLocaleStringSupportsOptions = () => {
    return typeof Intl === 'object' && !!Intl && typeof Intl.NumberFormat === 'function';
};

const getNumeralSystemDigits = (languageTag: string) => {
    try {
        const localizedNumber = (1234567890).toLocaleString(languageTag, { useGrouping: false });
        const lookupObject: Record<string, true> = {};
        const repeatedChar = localizedNumber.split('').find((char) => {
            if (lookupObject[char]) return true;
            lookupObject[char] = true;
        });
        const digitsWithoutGroupingDelimiters = repeatedChar
            ? localizedNumber.replace(new RegExp(escapeRegexString(repeatedChar || ''), 'g'), '')
            : localizedNumber;
        const digitsAsArray = digitsWithoutGroupingDelimiters.split('');
        const sortedDigits = [digitsAsArray[digitsAsArray.length - 1], ...digitsAsArray.slice(0, -1)];
        return sortedDigits.join('');
    } catch (_err) {
        return null;
    }
};

const getGroupingAndFractionDelimiters = (languageTag: string, digits: string) => {
    try {
        const localizedNumber = (12345678.123).toLocaleString(languageTag);
        const localizedNumberWithoutDigits = localizedNumber.replace(new RegExp(`[${escapeRegexString(digits)}]`, 'g'), '');
        const [groupingDelimiter = ',', fractionDelimiter = '.'] = unique(localizedNumberWithoutDigits.split(''));
        return [groupingDelimiter, fractionDelimiter];
    } catch (_err) {
        return null;
    }
};

const getGroupingStyle = (languageTag: string, groupingDelimiter: string) => {
    // <i> Handle '4 digits' grouping style for some asian countries (not CLDR)
    if (languagesWith4DigitsGroupingStyle.some(language => languageTag.indexOf(language) === 0)) return [4];

    try {
        const result: number[] = [];
        let subIterationIndex = 0;
        (100000000000).toLocaleString(languageTag).split('').reverse().forEach((digitOrGroupingDelimiter) => {
            if (digitOrGroupingDelimiter === groupingDelimiter) {
                result.push(subIterationIndex);
                subIterationIndex = 0;
            } else {
                subIterationIndex += 1;
            }
        });

        let resultIndex = result.length;
        while (resultIndex--) {
            if (result[resultIndex] === result[resultIndex - 1]) result.pop();
            else break;
        }
        return result;
    } catch (_err) {
        return null;
    }
};

/**
 * Abbreviations can be extracted with the { notation: 'compact' } option in Intl.NumberFormat
 */
const getAbbreviations = (languageTag: string, digits: string, type: 'short' | 'long'): string | null => {
    try {
        if (!toLocaleStringSupportsOptions()) return null;

        const intlFormatOptions = { notation: 'compact', useGrouping: false, compactDisplay: type };
        const [digitOfZero, digitOfOne, digitOfTwo] = digits.split('');

        let abbreviations = '';
        for (let i = 1; i < 50; i++) {
            const abbreviationResultForOne = (+(1 + stringRepeat('0', i))).toLocaleString(languageTag, intlFormatOptions);
            if (new RegExp(`^${digitOfOne}[^${digitOfZero}]+$`).test(abbreviationResultForOne)) {
                if (type === 'long') {
                    const abbreviationResultForTwo = (+(2 + stringRepeat('0', i))).toLocaleString(languageTag, intlFormatOptions);
                    const abbreviationOne = abbreviationResultForOne.replace(new RegExp(`${digitOfOne}`, 'g'), '').trim();
                    const abbreviationTwo = abbreviationResultForTwo.replace(new RegExp(`${digitOfTwo}`, 'g'), '').trim();
                    abbreviations += '|' + appendLeftToRightMarkIfIsRTL(abbreviationOne) + ':::' + appendLeftToRightMarkIfIsRTL(abbreviationTwo);
                } else {
                    const abbreviation = abbreviationResultForOne.replace(new RegExp(`${digitOfOne}`, 'g'), '').trim();
                    abbreviations += '|' + appendLeftToRightMarkIfIsRTL(abbreviation);
                }
            } else {
                abbreviations += '|';
            }
        }

        // Remove trailing pipes '|'
        let result = abbreviations;
        let resultIndex = result.length;
        while (resultIndex--) {
            if (result[resultIndex] === '|') result = result.slice(0, -1);
            else break;
        }

        return result;
    } catch (_err) {
        return null;
    }
};

const getNumerableLocaleFromIntl = (languageTag: string): ResolvedNumerableLocale => {
    const resolvedLanguageTag = languageTag || 'en';
    const digits = getNumeralSystemDigits(resolvedLanguageTag);
    const resolvedDigits = digits || '0123456789';
    const delimiters = getGroupingAndFractionDelimiters(resolvedLanguageTag, resolvedDigits);
    const [groupingDelimiter, fractionDelimiter] = !!delimiters && delimiters.length >= 2 ? delimiters : [',', '.'];
    const groupingStyle = getGroupingStyle(resolvedLanguageTag, groupingDelimiter);
    const shortAbbreviations = getAbbreviations(resolvedLanguageTag, resolvedDigits, 'short');
    const longAbbreviations = getAbbreviations(resolvedLanguageTag, resolvedDigits, 'long');
    return {
        _abbreviationsLong: longAbbreviations || en.abbreviations,
        code: resolvedLanguageTag,
        delimiters: { thousands: groupingDelimiter, decimal: fractionDelimiter },
        abbreviations: shortAbbreviations || en.abbreviations as ResolvedNumerableLocale['abbreviations'],
        digitGroupingStyle: !!groupingStyle?.length ? groupingStyle : undefined,
        numeralSystem: digits !== '0123456789' ? digits?.split('').map(appendLeftToRightMarkIfIsRTL) : undefined,
        ordinal: en.ordinal as ResolvedNumerableLocale['ordinal'],
    };
};

export default memoize(getNumerableLocaleFromIntl);
