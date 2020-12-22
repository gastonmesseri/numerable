const insert = (string: string, subString: string, start: number) => {
    return string.slice(0, start) + subString + string.slice(start);
};

export default insert;
