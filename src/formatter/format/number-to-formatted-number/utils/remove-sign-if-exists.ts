/**
 * <i> Checks if value is negative, and removes the sign in case it exists
 * Expects: a value as string, with or without the minus sign, AND NOTHING ELSE.
 * Returns: same as the input but without the minus sign in case it had.
 */
const removeSignIfExists = (valueAsString: string): string => {
    return valueAsString[0] === '-' ? valueAsString.slice(1) : valueAsString;
};

export default removeSignIfExists;
