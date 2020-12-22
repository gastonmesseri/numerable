import splitStringInTwoParts from '../../src/core/utils/split-string-in-two-parts';

describe('splitStringInTwoParts', () => {
    it('should return ["", ""] if no valid string is passed', () => {
        expect(splitStringInTwoParts(null as any, '.')).toEqual(['', '']);
        expect(splitStringInTwoParts('', '.')).toEqual(['', '']);
        expect(splitStringInTwoParts(undefined as any, '.')).toEqual(['', '']);
    });

    it('should return [fullString, ""] if searchChar is not found', () => {
        expect(splitStringInTwoParts('text', '*')).toEqual(['text', '']);
        expect(splitStringInTwoParts('NOTFOUNDHERE', '_')).toEqual(['NOTFOUNDHERE', '']);
    });

    it('should properly split the string in two parts when the searchChar is found', () => {
        expect(splitStringInTwoParts('text', 'x')).toEqual(['te', 't']);
        expect(splitStringInTwoParts('1.2344e+4', 'e')).toEqual(['1.2344', '+4']);
    });
});
