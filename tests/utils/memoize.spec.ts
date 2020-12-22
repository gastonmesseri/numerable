import memoize from '../../src/core/utils/memoize';

describe('memoize', () => {
    it('should handle 2 parameters', () => {
        const functionToMemoize = jest.fn((a: number, b: string) => (a + 1) + b);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1, 'test');
        expect(resultFromOriginal).toBe('2test');
        const resultFromCached = memoizedFunction(1, 'test');
        expect(resultFromCached).toBe('2test');
        expect(functionToMemoize).toHaveBeenCalledTimes(1);
    });

    it('should handle 3 parameters', () => {
        const functionToMemoize = jest.fn((a: number, b: string, c: boolean) => (a + 1) + b + c);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1, 'test', true);
        expect(resultFromOriginal).toBe('2testtrue');
        const resultFromCached = memoizedFunction(1, 'test', true);
        expect(resultFromCached).toBe('2testtrue');
        expect(functionToMemoize).toHaveBeenCalledTimes(1);
    });

    it('should handle single parameters', () => {
        const functionToMemoize = jest.fn((a: number) => a + 1);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1);
        expect(resultFromOriginal).toBe(2);
        const resultFromCached = memoizedFunction(1);
        expect(resultFromCached).toBe(2);
        expect(functionToMemoize).toHaveBeenCalledTimes(1);
    });

    it('should handle different primitive arguments types (except symbol and bigint)', () => {
        const functionToMemoize = jest.fn((a: number, b: string, c: boolean, d: null, e: undefined) => (a + 1) + b + c + d + e);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1, 'test', true, null, undefined);
        expect(resultFromOriginal).toBe('2testtruenullundefined');
        const resultFromCached = memoizedFunction(1, 'test', true, null, undefined);
        expect(resultFromCached).toBe('2testtruenullundefined');
        expect(functionToMemoize).toHaveBeenCalledTimes(1);
    });

    it('should return the same result from original function call and cached call', () => {
        const functionToMemoize = jest.fn((a: number, b: string, c: boolean, d: null, e: undefined) => (a + 1) + b + c + d + e);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1, 'test', true, null, undefined);
        const resultFromCached = memoizedFunction(1, 'test', true, null, undefined);
        expect(resultFromOriginal).toBe(resultFromCached);
    });

    it('should not call the original function if the result has been already calculated', () => {
        const functionToMemoize = jest.fn((a: number) => a + 1);
        const memoizedFunction = memoize(functionToMemoize);
        memoizedFunction(1);
        memoizedFunction(1);
        memoizedFunction(1);
        memoizedFunction(1);
        memoizedFunction(1);
        expect(functionToMemoize).toHaveBeenCalledTimes(1);
    });

    it('should call the original function if the result has not been still calculated', () => {
        const functionToMemoize = jest.fn((a: number) => a + 1);
        memoize(functionToMemoize)(1);
        expect(functionToMemoize).toHaveBeenCalled();
    });

    it('should properly calculate the result', () => {
        const functionToMemoize = jest.fn((a: number, b: number) => a + b);
        const memoizedFunction = memoize(functionToMemoize);
        const resultFromOriginal = memoizedFunction(1, 7);
        const resultFromCached = memoizedFunction(1, 7);
        expect(resultFromOriginal).toBe(8);
        expect(resultFromCached).toBe(8);
    });
});
