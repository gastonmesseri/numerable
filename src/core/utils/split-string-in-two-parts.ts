/**
 * Faster version of String.prototype.split that only handles splitting in two parts
 */
const splitStringInTwoParts = (str: string, separator: string) => {
    if (!str) return ['', ''];

    const indexOfSearchChar = str.indexOf(separator);
    if (indexOfSearchChar === -1) {
        return [str, ''];
    } else {
        return [str.slice(0, indexOfSearchChar), str.slice(indexOfSearchChar + 1)];
    }
};

export default splitStringInTwoParts;
