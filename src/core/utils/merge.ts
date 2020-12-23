/**
 * Like object assign but directly creating a new object and only enumerable properties.
 */
function merge<T>(a: T): T;
function merge<T, U>(a: T, b: U): T & U;
function merge<T, U, V>(a: T, b: U, c: V): T & U & V;
function merge<T, U, V, W>(a: T, b: U, c: V, d: W): T & U & V & W;
function merge(...args: any[]): any {
    const newObject: Record<any, unknown> = {};
    const argsLength = args.length;
    for (let i = 0; i < argsLength; i++) {
        for (const key in args[i]) newObject[key] = args[i][key];
    }
    return newObject;
}

export default merge;
