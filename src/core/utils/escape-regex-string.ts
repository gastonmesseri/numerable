// Extracted from https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
const escapeRegexString = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export default escapeRegexString;
