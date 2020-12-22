export default <T extends object, U>(value: T | U): value is NonNullable<T> => {
    return typeof value === 'object' && value !== null;
};
