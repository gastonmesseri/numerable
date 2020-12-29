const toObject = <T, U>(arr: T[], entriesResolver: (item: T, itemIndex: number) => [key: string, value: U]): Record<string, U> => {
    const object: Record<string, U> = {};
    for (let i = 0; i < arr.length; ++i) {
        if (i in arr) {
            const [key, value] = entriesResolver(arr[i], i);
            object[key] = value;
        }
    }
    return object;
};

export default toObject;
