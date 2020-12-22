export default <U>(value: number | U): value is number => {
    return typeof value == 'number' && isFinite(value);
};
