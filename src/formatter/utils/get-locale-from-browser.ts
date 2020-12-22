import en from '../../locale/en';
import stringRepeat from '../../core/utils/string-repeat';
import { NumerableLocale } from '../../core/types/numerable-locale';

// TODO: Handle rtl

// const toLocaleStringSupportsLocales = () => {
//     const number = 0;
//     try {
//         number.toLocaleString('i');
//     } catch (e) {
//         return e.name === 'RangeError';
//     }
//     return false;
// };

// const toLocaleStringSupportsOptions = () => {
//     return !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
// };

const getDigits = (languageTag: string) => {
    const localizedNumber = (1234567890).toLocaleString(languageTag, { useGrouping: false });
    const lookupObject: Record<string, true> = {};
    const repeatedChar = localizedNumber.split('').find((char) => {
        if (lookupObject[char]) return char;
        lookupObject[char] = true;
    });
    if (!repeatedChar) return null;
    const digitsWithoutGroupingDelimiters = localizedNumber.replace(new RegExp(repeatedChar, 'g'), '');
    const digitsAsArray = digitsWithoutGroupingDelimiters.split('');
    const sortedDigits = [digitsAsArray[digitsAsArray.length - 1], ...digitsAsArray.slice(0, -1)];
    return sortedDigits.join('');
};

const getGroupingAndFractionDelimiters = (languageTag: string, digits: string) => {
    const localizedNumber = (12345678.123).toLocaleString(languageTag);
    const [groupingDelimiter = '', fractionDelimiter = ''] = Array.from(new Set(localizedNumber.replace(new RegExp(`[${digits}]`, 'g'), '')));
    return [groupingDelimiter, fractionDelimiter];
};

const getGroupingStyle = (languageTag: string, groupingDelimiter: string) => {
    const result: number[] = [];
    let subIterationIndex = 0;
    10000000000000..toLocaleString(languageTag).split('').reverse().forEach((e) => {
        if (e === groupingDelimiter) {
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
};

const getAbbreviations = (languageTag: string, digits: string, type: 'short' | 'long' = 'short') => {
    const [digitOfZero, digitOfOne, digitOfTwo] = digits.split('');

    // You can get it with notation 'compact' option in Intl.NumberFormat
    let abbreviations = '';
    for (let i = 1; i < 50; i++) {
        const abbreviationResultOne = (+(1 + stringRepeat('0', i))).toLocaleString(languageTag, { notation: 'compact', useGrouping: false, compactDisplay: type } as any);
        if (new RegExp(`^${digitOfOne}[^${digitOfZero}]+$`).test(abbreviationResultOne)) {
            if (type === 'long') {
                const abbreviationResultTwo = (+(2 + stringRepeat('0', i))).toLocaleString(languageTag, { notation: 'compact', useGrouping: false, compactDisplay: type } as any);
                const abbreviationOne = abbreviationResultOne.replace(new RegExp(`${digitOfOne}`, 'g'), '').trim();
                const abbreviationTwo = abbreviationResultTwo.replace(new RegExp(`${digitOfTwo}`, 'g'), '').trim();
                abbreviations += '|' + abbreviationOne + ':::' + abbreviationTwo;
            } else {
                abbreviations += '|' + abbreviationResultOne.replace(new RegExp(`${digitOfOne}`, 'g'), '').trim();
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
};

export default (languageTag: string): NumerableLocale => {
    const digits = getDigits(languageTag);
    const resolvedDigits = digits || '0123456789';
    const [groupingDelimiter, fractionDelimiter] = getGroupingAndFractionDelimiters(languageTag, resolvedDigits);
    const groupingStyle = getGroupingStyle(languageTag, groupingDelimiter);
    const shortAbbreviations = getAbbreviations(languageTag, resolvedDigits, 'short');
    const longAbbreviations = getAbbreviations(languageTag, resolvedDigits, 'long');
    return {
        code: languageTag,
        delimiters: { thousands: groupingDelimiter, decimal: fractionDelimiter },
        abbreviations: shortAbbreviations || en.abbreviations,
        _abbreviationsLong: longAbbreviations || en.abbreviations,
        _digits: digits,
        digitGroupingStyle: groupingStyle,
        numeralSystem: digits !== '0123456789' ? digits?.split('') : undefined,
        ordinal: en.ordinal,
    } as any;
};
