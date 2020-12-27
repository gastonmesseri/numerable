import { patternReplace } from '../utils/pattern-regexp-utils';
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


const currencyFormatter: NumerableFormatter = {
    name: 'currency',
    regexps: {
        format: /(\$)/,
    },
    format: (number, pattern, options) => {
        const currencyFromOptions = options.currency?.toUpperCase();
        const localizedCurrencySymbol = currencySymbolsMap[currencyFromOptions!] || currencyFromOptions || '';
        const patternWithEscapedCurrencySymbol = patternReplace(pattern, /\$/, `'#currency#'`);
        const formatResult = numberToFormattedNumber(number, patternWithEscapedCurrencySymbol, options);
        return formatResult.replace('#currency#', _ => localizedCurrencySymbol);
    },
};

export default currencyFormatter;
