/**
 * Only handles direct power of ten (only integer exponents)
 */
export default (numberThatIsPowerOfTen: number) => {
    return Math.round(Math.log(numberThatIsPowerOfTen) * Math.LOG10E);
};
