export default <U>(value: string | U): value is string => {
    return typeof value === 'string';
};
