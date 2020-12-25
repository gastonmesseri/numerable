import insert from '../../core/utils/insert';
import stringIncludes from '../../core/utils/string-includes';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import numberToFormattedNumber from '../format/number-to-formatted-number/number-to-formatted-number';

const currencySymbolsMap: Record<string, string> = {
    EUR: '€',
    USD: '$',
    XCD: 'EC$',
    AUD: 'A$',
    INR: '₹',
    BRL: 'R$',
    CAD: 'CA$',
    XAF: 'FCFA',
    CNY: 'CN¥',
    NZD: 'NZ$',
    XPF: 'CFPF',
    GBP: '£',
    HKD: 'HK$',
    ILS: '₪',
    JPY: '¥',
    KRW: '₩',
    XOF: 'CFA',
    MXN: 'MX$',
    TWD: 'NT$',
    VND: '₫',
};

export const handleBeforeSymbols = (outputString: string, beforeSymbols: string, localizedSymbol: string) => {
    let output: string = outputString;
    console.log({ outputString, beforeSymbols, localizedSymbol })

    for (let i = 0; i < beforeSymbols.length; i++) {
        const symbol = beforeSymbols[i];

        switch (symbol) {
            case '$': {
                output = insert(output, localizedSymbol, i);
                break;
            }
            case ' ': {
                output = insert(output, ' ', i + localizedSymbol.length - 1);
                break;
            }
        }
    }

    return output;
};

export const handleAfterSymbols = (str: string, afterSymbols: string, localizedSymbol: string) => {
    let output: string = str;

    for (let i = afterSymbols.length - 1; i >= 0; i--) {
        const symbol = afterSymbols[i];

        switch (symbol) {
            case '$': {
                output = i === afterSymbols.length - 1
                    ? output + localizedSymbol
                    : insert(output, localizedSymbol, -(afterSymbols.length - (1 + i)));
                break;
            }
            case ' ': {
                output = i === afterSymbols.length - 1
                    ? output + ' '
                    : insert(output, ' ', -(afterSymbols.length - (1 + i) + localizedSymbol.length - 1));
                break;
            }
        }
    }

    return output;
};

const currencyFormatter: NumerableFormatter = {
    name: 'currency',
    regexps: {
        format: /(\$)/
    },
    format: (number, pattern, options) => {
        const currencyFromOptions = options.currency?.toUpperCase();
        const localizedCurrencySymbol = currencySymbolsMap[currencyFromOptions!] || currencyFromOptions || '';
        const resolvedValue = number || 0;
        const patternWithoutCurrencySymbol = pattern.replace(/\s?\$\s?/, '');
        const formatResult = numberToFormattedNumber(resolvedValue, patternWithoutCurrencySymbol, options);
        let symbolsBefore = pattern.match(/^([+|\-|(|\s|$]*)/)?.[0] ?? '';
        let symbolsAfter = pattern.match(/([+|\-|)|\s|$]*)$/)?.[0] ?? '';

        // <i> Update the before and after based on resolvedValue.
        // If value is positive, removes the minus and negative parenthesys '(' | ')'.
        if (resolvedValue >= 0) {
            symbolsBefore = symbolsBefore?.replace(/[-(]/g, '');
            symbolsAfter = symbolsAfter?.replace(/[-)]/g, '');
        // If value is negative, and the formatResult has no '-' or '(' (negative handling), appends the minus
        } else if (resolvedValue < 0 && (!stringIncludes(symbolsBefore, '-') && !stringIncludes(symbolsBefore, '('))) {
            symbolsBefore = '-' + symbolsBefore;
        }

        console.log({ symbolsBefore, symbolsAfter });

        // console.log({
        //     currencyFromOptions,
        //     localizedCurrencySymbol,
        //     resolvedValue,
        //     patternWithoutCurrencySymbol,
        //     formatResult,
        //     symbolsBefore: symbolsInPatternBeforeDollar,
        //     symbolsAfter: symbolsInPatternAfterDollar,
        // });

        let output = formatResult;
        output = handleBeforeSymbols(output, symbolsBefore, localizedCurrencySymbol);
        console.log({ formatResult, output })
        // console.log({ afterBeforeSymbols: output })
        output = handleAfterSymbols(output, symbolsAfter, localizedCurrencySymbol);
        return output;
    },
};

export default currencyFormatter;
