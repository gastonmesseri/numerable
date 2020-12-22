const truncateNumber = (value: number) => {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
};

export default truncateNumber;
