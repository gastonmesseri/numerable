import toObject from '../../core/utils/to-object';
import { unitScale } from '../../core/utils/unit-scale';
import { NumerableFormatter } from '../../core/types/numerable-formatter';
import { patternIncludes, patternReplace } from '../utils/pattern-regexp-utils';
import formattedStringToNumber from '../../formatter/parse/utils/formatted-string-to-number';
import numberToFormattedNumber from '../../formatter/format/number-to-formatted-number/number-to-formatted-number';

const decimalSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const binarySuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const allSuffixes = decimalSuffixes.concat(binarySuffixes.slice(1));

/** Avoid collision with BPS format @see formats|bps.ts */
const unformatRegex = `(${allSuffixes.join('|').replace(/B/g, 'B(?!PS)')})`;

const bytesDecimalScale = unitScale({ base: 'B', scale: toObject(decimalSuffixes, (unit, unitIndex) => [unit, 1000 ** unitIndex]) });
const bytesBinaryScale = unitScale({ base: 'B', scale: toObject(binarySuffixes, (unit, unitIndex) => [unit, 1024 ** unitIndex]) });

const bytesFormatter: NumerableFormatter = {
    name: 'bytes',
    regexps: {
        format: /([0\s]b[bd])|(b[bd][0\s])/,
        unformat: (string, options) => options.type === 'bytes' ? new RegExp(unformatRegex).test(string) : false,
    },
    format: (number, pattern, options) => {
        const scale = patternIncludes(pattern, 'bb') ? bytesBinaryScale : bytesDecimalScale;
        const [scaledValue, scaledValueUnit] = scale.toBest(number, 'B');
        const patternWithEscapedBytes = patternReplace(pattern, /b[bd]/, `'ɵbytesɵ'`);
        const formatResult = numberToFormattedNumber(scaledValue, patternWithEscapedBytes, options);
        return formatResult.replace('ɵbytesɵ', scaledValueUnit || '');
    },
    unformat: (string, options) => {
        const number = formattedStringToNumber(string.replace(new RegExp(unformatRegex), ''), options);
        const suffix = string.match(unformatRegex)?.[0] || '';
        const scale = !!bytesBinaryScale.scaleDefinition.scale[suffix] ? bytesBinaryScale : bytesDecimalScale;
        return number ? scale.toBase(number, suffix) : number;
    }
};

export default bytesFormatter;
