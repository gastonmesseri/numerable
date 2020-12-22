/**
 * Short version of mozilla polyfill:
 *     See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 */
export default (str: string, count: number) => {
    // return (str.repeat && str.repeat(count)) || new Array(count + 1).join(str);
    if (count < 1) return '';
    let result = '';
    let pattern = str;
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>>= 1, pattern += pattern;
    }
    return result + pattern;
};
