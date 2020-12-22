export default <T extends Function, U>(value: T | U): value is T => {
    return typeof value === 'function';
};
