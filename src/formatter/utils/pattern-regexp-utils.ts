const getPatternParts = (patternMask: string) => {
    let isInEscapedPart = false;
    let currentEscapedWord = '';
    const parts: { escaped: boolean; value: string }[] = [];
    for (let i = 0; i < patternMask.length; i++) {
        const char = patternMask.charAt(i);

        if (char === "'" && !isInEscapedPart) {
            isInEscapedPart = true;
            currentEscapedWord = '';
        } else if (char === "'" && isInEscapedPart && patternMask.charAt(i - 1) !== "\\") {
            isInEscapedPart = false;
            parts.push({ escaped: true, value: currentEscapedWord });
        } else if (isInEscapedPart) {
            currentEscapedWord += char;
        } else {
            if (parts.length && !parts[parts.length - 1].escaped) {
                parts[parts.length - 1].value += char;
            } else {
                parts.push({ escaped: false, value: char });
            }
        }
    }

    return parts;
};

/**
 * Checks only the pattern parts that are not escaped
 */
export const patternIncludes = (patternMask: string, search: string) => {
    return patternRemoveEscapedText(patternMask).indexOf(search) !== -1;
};

/**
 * Replaces only the pattern parts that are not escaped
 */
export const patternReplace = (patternMask: string, searchValue: string | RegExp, replaceValue: string) => {
    return getPatternParts(patternMask)
        .map(e => e.escaped ? `'${e.value}'` : e.value.replace(searchValue, _ => replaceValue))
        .join('');
};

export const patternRemoveEscapedText = (patternMask: string) => {
    return getPatternParts(patternMask)
        .filter(e => !e.escaped)
        .map(e => e.value)
        .join('');
};

export const patternStripAndNormalizeEscapedText = (patternMask: string) => {
    return getPatternParts(patternMask)
        .map(e => e.escaped ? e.value.replace(/\\'/g, "'") : e.value)
        .join('');
};
