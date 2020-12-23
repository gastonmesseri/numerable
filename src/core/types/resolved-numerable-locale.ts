export interface ResolvedNumerableLocale {
    code: string;
    delimiters: {
        thousands: string;
        decimal: string;
    };
    abbreviations: string;
    ordinal: (value: number) => string;
    digitGroupingStyle?: number[];
    numeralSystem?: string[];
    _abbreviationsLong?: string;
}
