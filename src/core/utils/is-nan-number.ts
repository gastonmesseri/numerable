export default (value: any): boolean => {
    return typeof value === 'number' && isNaN(value);
};
