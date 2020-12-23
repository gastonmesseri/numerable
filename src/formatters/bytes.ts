import toObject from '../core/utils/to-object';
import { unitScale } from '../core/utils/unit-scale';
import stringIncludes from '../core/utils/string-includes';
import { NumerableFormatter } from '../core/types/numerable-formatter';
import formattedStringToNumber from '../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../format-number/number-to-formatted-number/number-to-formatted-number';

const decimalSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const binarySuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const allSuffixes = decimalSuffixes.concat(binarySuffixes.slice(1));

/** Avoid collision with BPS format @see formats|bps.ts */
const unformatRegex = `(${allSuffixes.join('|').replace('B', 'B(?!PS)')})`;

const bytesDecimalScale = unitScale({ base: 'B', scale: toObject(decimalSuffixes, (unit, unitIndex) => [unit, 1000 ** unitIndex]) });
const bytesBinaryScale = unitScale({ base: 'B', scale: toObject(binarySuffixes, (unit, unitIndex) => [unit, 1024 ** unitIndex]) });

const bytesFormatter: NumerableFormatter = {
    name: 'bytes',
    regexps: {
        format: /([0\s]i?b)/,
        unformat: (string, options) => options.type === 'bytes' ? new RegExp(unformatRegex).test(string) : false,
    },
    format: (number, pattern, options) => {
        const resolvedValue = number || 0;
        const patternWithoutBytes = pattern.replace(/\s?i?b/, '');
        const bytesSpace = stringIncludes(pattern, ' b') || stringIncludes(pattern, ' ib') ? ' ' : '';
        const scale = stringIncludes(pattern, 'ib') ? bytesBinaryScale : bytesDecimalScale;
        const [scaledValue, scaledValueUnit] = scale.toBest(resolvedValue, 'B');
        const formatResult = numberToFormattedNumber(scaledValue, patternWithoutBytes, options);
        return `${formatResult}${bytesSpace}${scaledValueUnit}`;
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(new RegExp(unformatRegex), ''), options);
        const suffix = string.match(unformatRegex)?.[0] || '';
        const scale = !!bytesBinaryScale.scaleDefinition.scale[suffix] ? bytesBinaryScale : bytesDecimalScale;
        return number ? scale.toBase(number, suffix) : number;
    }
};

export default bytesFormatter;
