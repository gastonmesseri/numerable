/**
 * This function doesn't work with non-primitive arguments
 */
const memoize = <T extends ((...args: any[]) => any)>(fn: T): T => {
    const cache: Record<string, any> = {};
    return function (this: any, ...args: any[]) {
        const cacheKey = args.length > 1 ? args.join('-(:-:)-') : args[0];
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
        const result = fn.apply(this, args);
        cache[cacheKey] = result;
        return result;
    } as any;
};

export default memoize;
