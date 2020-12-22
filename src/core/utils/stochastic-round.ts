import truncateNumber from './truncate-number';

export default (value: number) => {
    const decimalPart = Math.abs(value - truncateNumber(value));
    const randomSelector = Math.random();
    let adjustor = randomSelector < decimalPart ? 1 : 0;
    if (value < 0) adjustor = -1 * adjustor;
    return truncateNumber(value) + adjustor;
};
