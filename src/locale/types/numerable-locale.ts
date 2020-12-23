// This file should not be moved from here, as it is used in the locale build step
export interface NumerableLocale {
    code: string;

    delimiters?: {
        thousands: string;
        decimal: string;
    };

    abbreviations?: string;

    ordinal?: (value: number) => string;

    digitGroupingStyle?: number[];

    numeralSystem?: string[];
}
