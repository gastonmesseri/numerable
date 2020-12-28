---
id: locale
title: Locale
sidebar_label: Locale
slug: locale
---

---



## Description
A locale object.  
If you don't specify a locale in options, default locale is ***en***.  

---


## Interface

```typescript
interface Locale {
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
```

## Properties

<table>
    <thead>
        <tr>
            <td> Name </td>
            <td> Type </td>
            <td> Description </td>
        </tr>
    </thead>
    <tbody> 
        <tr>
            <td> <strong>code</strong> <br /> (optional) </td>
            <td> string </td>
            <td> the locale code (ISO 639-1 + optional country code) </td>
        </tr>
        <tr>
            <td> <strong>delimiters</strong> <br /> (optional) </td>
            <td> Object </td>
            <td> 
                Default are english delimiters ("," for grouping, and "." for decimals) <br />
                Take into account that delimiters have to be different from each other in order to be valid. <br />
                Properties
                <table>
                    <thead>
                        <tr>
                            <td> Name </td>
                            <td> Type </td>
                            <td> Description </td>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            <td> <strong>thousands</strong> </td>
                            <td> string </td>
                            <td> The grouping delimiter </td>
                        </tr>
                        <tr>
                            <td> <strong>decimal</strong> </td>
                            <td> string </td>
                            <td> The decimal delimiter  </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td> <strong>abbreviations</strong> <br /> (optional) </td>
            <td> string </td>
            <td> 
                The localized abbreviations in the following format:  <br />
                For <strong>en</strong>: "|||K|||M|||B|||T" <br />
                The default abbreviation pattern would be the <strong>en</strong> (shown in previous line). <br />
                Each one of the pipes define the power of ten for the specified abbreviation. So, for the previous example, "K" will be applied to 1000, "M" to 1000000 (one million)...  <br />
                This allows using different types of abbreviation for languages like chinese, where the abbreviations are applied on 10000 (ten thousand) and not 1000.  <br />
                For example: <br />
                <strong>zh</strong>: "||||万||||亿||||万亿" <br />
                <strong>en-in</strong>: "|||T||L||Cr|||TCr||LCr" <br />
            </td>
        </tr>
        <tr>
            <td> <strong>ordinal</strong> <br /> (optional) </td>
            <td> Function </td>
            <td>
                The function that calculates the ordinal numbers suffix. <br />
                The default ordinal is <strong>en</strong> (1st, 2nd, 3rd...).
                This function receives a number, and returns an ordinal suffix. <br />
                Example: <br />
                <pre>
                    For <strong>fr</strong>: number => number === 1 ? 'er' : 'e'
                </pre>
            </td>
        </tr>
        <tr>
            <td> <strong>digitGroupingStyle</strong> <br /> (optional) </td>
            <td> number[] </td>
            <td>
                An array that defines the grouping style of the locale (thousands separator groups). <br />
                The default digitGroupingStyle is [3] <br />
                The array defines the order and size of the grouping. The last value of the array is the last defined group, that will be applied subsequently to the rest of the numbers. <br />
                Example (value: 12345678900, pattern: '0,0'): <br />
                [4,3] => '1,234,567,8900' <br />
                [4,2] => '1,23,45,67,8900' <br />
                [3,2] => '12,34,56,78,900' <br />
                [4] => '123,4567,8900'
            </td>
        </tr>
        <tr>
            <td> <strong>numeralSystem</strong> <br /> (optional) </td>
            <td> string[] </td>
            <td>
                An array that works as a map for the digits, from 0 to 9. <br />
                The default numeralSystem is Latin (0123456789). <br />
                This map allows defining different numeral systems like for example Devanagari digits (०१२३४५६७८९) or Arabic digits (٠١٢٣٤٥٦٧٨٩). <br /> <br />
                Example: <br />
                import arEG from 'numerable/locales/ar-eg'; <br />
                {`formatNumber(1234567890, '0,0', { locale: arEG });`} <br />
                // Returns "١٬٢٣٤٬٥٦٧٬٨٩٠"
            </td>
        </tr>
    </tbody>
</table>


