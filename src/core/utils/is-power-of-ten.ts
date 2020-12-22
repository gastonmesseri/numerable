const powerOf10LookupObject = (() => {
    const object: Record<string, boolean> = {};

    // 1 <= x <= Infinity (positive exponent)
    let additionalZeros = '';
    let currentValue;
    while (currentValue !== Infinity) {
        currentValue = +('1' + additionalZeros);
        object[currentValue] = true;
        additionalZeros += '0';
    }

    // 0 <= x < 1 (negative exponent)
    additionalZeros = '';
    currentValue = undefined;
    while (currentValue !== 0) {
        currentValue = +('0.' + additionalZeros + '1');
        object[currentValue] = true;
        additionalZeros += '0';
    }

    return object;
})();

export default (number: number) => {
    return !!powerOf10LookupObject[number];
};
