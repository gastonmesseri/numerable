const getPatternParts = (patternMask: string) => {
    let isInEscapedPart = false;
    let currentEscapedWord = '';

    const parts = [];
    for (let i = 0; i < patternMask.length; i++) {
        const char = patternMask.charAt(i);

        if (char === "'" && !isInEscapedPart) {
            isInEscapedPart = true;
            currentEscapedWord = '';
        } else if (char === "'" && isInEscapedPart && patternMask.charAt(i - 1) !== "\\") {
            isInEscapedPart = false;
            parts.push({ literal: true, val: currentEscapedWord });
        } else if (isInEscapedPart) {
            if (char !== "\\" || (char === "\\" && patternMask.charAt(i + 1) !== "'")) {
                currentEscapedWord += char;
            }
        } else {
            if (parts.length && !parts[parts.length - 1].literal) {
                parts[parts.length - 1].val += char;
            } else {
                parts.push({ literal: false, val: char });
            }
        }
    }

    return parts;
};

export const patternIncludes = (patternMask: string, search: string) => {
    return patternRemoveEscapedText(patternMask).indexOf(search) !== -1;
};

export const patternReplace = (patternMask: string, searchValue: string | RegExp, replaceValue: string) => {
    return getPatternParts(patternMask)
        .map(e => e.literal ? `'${e.val.replace(/'/g, "\\'")}'` : e.val.replace(searchValue, () => replaceValue))
        .join('');
};

export const patternRemoveEscapedText = (patternMask: string) => {
    return getPatternParts(patternMask).filter(e => !e.literal).map(e => e.val).join('');
};

export const patternStripPlaceholders = (patternMask: string) => {
    return getPatternParts(patternMask).map(e => e.literal ? e.val.replace(/\\'/, "'") : e.val).join('');
};
