const replaceDigitsWithNumeralSystem = (numericString: string, numeralSystemMap: string[] | undefined) => {
    if (!numeralSystemMap || numeralSystemMap.length !== 10) return numericString;

    const numericStringLength = numericString.length;
    let output = '';
    for (let numericStringIndex = 0; numericStringIndex < numericStringLength; numericStringIndex++) {
        const char = numericString[numericStringIndex];
        output += numeralSystemMap[char as any] || char;
    }
    return output;
};

export default replaceDigitsWithNumeralSystem;
