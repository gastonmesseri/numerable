const unique = <T>(arr: T[]): T[] => {
    if (!arr) return [];
    return arr.filter((value, index, self) => self.indexOf(value) === index);
};

export default unique;
