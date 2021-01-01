import roundHalfAwayFromZero from '../../src/core/utils/round-half-away-from-zero';

describe('roundHalfAwayFromZero', () => {
    it('should round the number half away from zero', () => {
        const tests = [
            // Positive numbers
            [12, 12],
            [12.1, 12],
            [12.2, 12],
            [12.3, 12],
            [12.4, 12],
            [12.5, 13],
            [12.6, 13],
            [12.7, 13],
            [12.8, 13],
            [12.9, 13],
            // Negative numbers
            [-12, -12],
            [-12.1, -12],
            [-12.2, -12],
            [-12.3, -12],
            [-12.4, -12],
            [-12.5, -13],
            [-12.6, -13],
            [-12.7, -13],
            [-12.8, -13],
            [-12.9, -13],
        ];
        tests.forEach(([number, expectedResult]) => {
            expect([number, roundHalfAwayFromZero(number)]).toEqual([number, expectedResult]);
        });
    });
});
