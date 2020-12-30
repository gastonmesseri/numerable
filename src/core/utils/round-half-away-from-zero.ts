const roundHalfAwayFromZero = (value: number) => {
    return value >= 0
        ? Math.round(value)
        : (value % 0.5 === 0) ? Math.floor(value) : Math.round(value);
};

export default roundHalfAwayFromZero;
