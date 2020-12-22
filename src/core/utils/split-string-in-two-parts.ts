/**
 * Faster version of String.prototype.split that only handles splitting in two parts
 */
export default (str: string, separator: string) => {
    if (!str) return ['', ''];

    const indexOfSearchChar = str.indexOf(separator);
    if (indexOfSearchChar === -1) {
        return [str, ''];
    } else {
        return [str.slice(0, indexOfSearchChar), str.slice(indexOfSearchChar + 1)];
    }
};