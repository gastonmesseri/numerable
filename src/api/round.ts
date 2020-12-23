import roundNumber from '../core/utils/round-number';

/**
 * @example
 * ```javascript
 * round(12.687, 2)
 * //=> 12.69
 * round(12.687)
 * //=> 13
 * round(12.687, 2, Math.floor)
 * //=> 12.68
 * ```
 * Rounds the given number to the specified amount of decimal places.
 * 
 * - The **default precision** is 0.  
 * - The **default roundingFunction** is Math.round.  
 * 
 * @param number number: The number to round (e.g. **10.23**)
 * @param precision precision: The desired amount of decimal places (e.g. **2**)
 * @param roundingFunction roundingFunction: The function applied for rounding (e.g. **Math.floor**)
 * */
const round = (number: number, precision?: number, roundingFunction?: (value: number) => number) => {
    return roundNumber(number, precision, roundingFunction);
};

export default round;
