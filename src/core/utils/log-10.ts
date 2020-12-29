/**
 * Only handles direct power of ten (only integer exponents)
 */
const log10 = (numberThatIsPowerOfTen: number) => {
    return Math.round(Math.log(numberThatIsPowerOfTen) * Math.LOG10E);
};

export default log10;
