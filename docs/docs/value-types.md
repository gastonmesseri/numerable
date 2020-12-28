---
id: value-types
title: format() arguments
sidebar_label: format() arguments
---

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)

## Arguments

---



### - *value* argument

type: ***number*** | ***string*** | ***null*** | ***undefined***

The provided value argument can be of type:
- **number**: If value is a **finite number** and not NaN, Infinity or -Infinity.
  - It will be formatted with the provided pattern.
    ```javascript
    format(1234.56, '0,0.0'); // Returns "1,234.6"
    ```

- **string**: If the type of the value is a **string**
    - **parseFloat()** will be applied to the given string, and then it will be processed as either **number** or **NaN**, depending on the parsing result.  

    ```javascript
    format('1234.56', '0,0.0'); // Returns "1,234.6"
    ```

    :::caution
    **numeraljs** applies *unformat* if an string is passed to numeral() (e.g. `numeral('1,234.5')`). But **numerable** applies **parseFloat**. If an *unformat* process is required, you should call unformat explicitly (e.g. `format(parse('1,234.5'), '0,0.00')`)  
    ```javascript
    numeral('1,234').format('0.00'); // Returns "1,234.00"

    format('1,234', '0.00'); // Returns "1.00", because the result of parseFloat('1,234') is 1
    format(parse('1,234'), '0.00'); // // Returns "1,234.00"
    ```
    :::

- **null**: If the type of the value is **null** or **undefined**
  - It will be formatted as **""** (empty string).  
    ```javascript
    format(null, '0.00'); // Returns ""
    format(undefined, '0.00'); // Returns ""
    ```
  - If a **nullFormat** was provided in the options, in the instance options, or defined in the global options, then the **nullFormat** will be returned. See [FormatOptions](/) for details.  
    ```javascript
    format(null, '0.00'); // Returns ""
    format(null, '0.00', { nullFormat: 'N/A' }); // Returns "N/A"
    format(undefined, '0.00', { nullFormat: 'N/A' }); // Returns "N/A"
    ```
    :::caution
    **numeraljs** processes *null* values as if they are *0* (e.g. `numeral(null)`), and therefore it returns the formatted *0*. But **numerable** returns an empty string by default. If you want to process the value as a zero, you should pass it explicitly `format(myPotentiallyNullValue || 0, '0,0.00')`).  
    ```javascript
    numeral(null).format('0,0.00'); // Returns "0.00"

    format(null, '0.00'); // Returns "" 
    ```
    :::

- **NaN**: If the value is a number and **NaN**
  - It will be formatted as **""** (empty string).  
    ```javascript
    format(NaN, '0.00'); // Returns ""
    ```
  - If a **nanFormat** was provided in the options, in the instance options, or defined in the global options, then the **nanFormat** will be returned. Otherwise it will fallback to the **nullFormat** (if provided). See [FormatOptions](/) for details.  
    ```javascript
    format(NaN, '0.00'); // Returns ""
    format(NaN, '0.00', { nanFormat: 'N/A' }); // Returns "N/A"
    format(NaN, '0.00', { nullFormat: '-' }); // Returns "-"
    format(NaN, '0.00', { nanFormat: 'N/A', nullFormat: '-' }); // Returns "N/A"
    ```
    :::caution
    **numeraljs** processes *NaN* values as if they are *0* (e.g. `numeral(NaN)`), and therefore it returns the formatted *0*. But **numerable** returns an empty string by default. If you want to process the value as a zero, you should pass it explicitly `format(myPotentiallyNaNValue || 0, '0,0.00')`).  
    ```javascript
    numeral(NaN).format('0,0.00'); // Returns "0.00"

    format(NaN, '0.00'); // Returns "" 
    ```
    :::

- **Infinity**: If the value is a number and **Infinity** or **-Infinity**.
  - It will be formatted as **"∞"** or **"-∞"**.
    ```javascript
    format(Infinity, '0.00'); // Returns "∞"
    format(-Infinity, '0.00'); // Returns "-∞"
    ```

---



### - *pattern* argument

type: ***string*** | ***null*** | ***undefined***

The pattern used to format the provided number. (See [FormatPattern](/) for details)

- Pattern examples:
  - `"0.00"`
  - `"0,0.00##"`
  - `"0,0.00 %"`
  - `"0.0 a"`

- If no valid pattern (**null**, **undefined** or **""**) is provided:
  - It will fallback to the options ***defaultPattern*** if provided, otherwise it will try with the global ***defaultPattern***.
  - The default global pattern is: ***"0,0.##########"*** (up to ten fraction digits).
  - If no global pattern is defined, it will still fallback to ***"0,0.##########"***
    ```javascript
    // Using default "0,0.##########"
    format(1234.503); // Returns "1,234.503"
    format(1234.503, null); // Returns "1,234.503"
    format(1234.503, undefined); // Returns "1,234.503"
    format(1234.503, ''); // Returns "1,234.503"

    // Using options defaultPattern
    format(1234.503, null, { defaultPattern: '0.0' }); // Returns "1234.5"
    format(1234.503, undefined, { defaultPattern: '0.0' }); // Returns "1234.5"
    format(1234.503, '', { defaultPattern: '0.0' }); // Returns "1234.5"
    ```

---



### - *options* argument

type: ***[FormatOptions](/)*** | ***null*** | ***undefined***

##### example:
```javascript
format(1234.56, '0,0.00', {
    defaultPattern: '0,0.##########',
    nullFormat: 'N/A',
    nanFormat: 'NaN',
    zeroFormat: '-',
    rounding: Math.floor,
    locale: fr,
});
```


The options object can contain the following properties:

- **defaultPattern**: 
  - type: ***string***
  - default: ***"0,0.##########"***
  - It will be the formatting pattern applied in case that the provided pattern in the arguments is null, undefined or "" (empty string).
    ```javascript
    format(1234.503, myPotentiallyNullPattern, { defaultPattern: '0.0' });  // Returns "1234.5"
    format(1234.503, null, { defaultPattern: '0.0' });  // Returns "1234.5"
    format(1234.503, undefined, { defaultPattern: '0.0' });  // Returns "1234.5"
    format(1234.503, '', { defaultPattern: '0.0' });  // Returns "1234.5"
    ```
    :::caution
    **numeraljs** uses *"0,0"* as a default pattern (e.g. `numeral(1234.45).format() // Returns "1,234"`). **numerable** uses *"0,0.##########"* as a default pattern (10 optional decimal places).  
    ```javascript
    numeral(1234.56).format(); // Returns "1,234" (without decimals)

    format(1234.56); // Returns "1,234.56" 
    format(1234.56789); // Returns "1,234.56789" 
    ```
    :::

- **rounding**: 
  - type: 
    - ***string***: *"truncate"* | *"ceil"* | *"floor"* | *"round"*  
    or
    - ***function***: *(value: number) => number*

  - default: ***Math.round***

  - It will be the rounding function applied to the number in the resolved maximum amount of decimal places.
    ```javascript
    // Ceil
    format(1234.52, '0.0', { rounding: 'ceil' });  // Returns "1234.6"
    format(-1234.52, '0.0', { rounding: 'ceil' });  // Returns "-1234.5"

    // Floor
    format(1234.52, '0.0', { rounding: 'floor' });  // Returns "1234.5"
    format(-1234.52, '0.0', { rounding: 'floor' });  // Returns "-1234.6"

    // Truncate (rounding towards 0)
    format(1234.52, '0.0', { rounding: 'truncate' });  // Returns "1234.5"
    format(-1234.52, '0.0', { rounding: 'truncate' });  // Returns "-1234.5"

    // Round
    format(1234.52, '0.0', { rounding: 'round' });  // Returns "1234.5"
    format(1234.58, '0.0', { rounding: 'round' });  // Returns "1234.6"
    format(-1234.52, '0.0', { rounding: 'round' });  // Returns "-1234.5"
    format(-1234.58, '0.0', { rounding: 'round' });  // Returns "-1234.6"
    ```

  - ***"truncate"***, ***"ceil"***, ***"floor"*** and ***"round"*** are aliases for the native Javascript rounding functions found in the Math object (e.g. Math.ceil).
    - ***"truncate"*** is Math.trunc
    - ***"ceil"*** is Math.ceil
    - ***"floor"*** is Math.floor
    - ***"round"*** is Math.round

  - You can also provide a **custom rounding function** for this option. That will be useful in case you need to apply an special rounding algorithm.
    - The function will receive the already scaled value and it should return an integer.
    - The **scaled value** is the scaled version of the value after **numerable** has already calculated the final amount of decimal places.  
      For example, if you call ***format()*** with the value ***12.345*** and the pattern ***"0.0"***, the scaled value will be ***123.456*** as it will attempt to round **.4**
      ```javascript
      // Example
      const roundAwayFromZero = scaledNumber => {
          return scaledNumber >= 0 ? Math.ceil(scaledNumber) : Math.floor(scaledNumber);
      }
      format(12.301, '0.0', { rounding: roundAwayFromZero }); // Returns "12.4"
      format(-12.301, '0.0', { rounding: roundAwayFromZero }); // Returns "-12.4"
      ```

  > Take into account that ***.5*** will be always rounded up for both positive and negative numbers.  
  > This is the native and default behavior of the Javascript function *Math.round*.  
  > If you want a custom rounding for ***.5*** you can implement your custom rounding function.  
    ```javascript
    // Example
    // The following code, will round down .5 values
    const customRoundingFunction = number => {
        const fractionalPart = number.toString().split('.')[1] || '';
        return fractionalPart[0] === '5' ? Math.floor(number) : Math.round(number);
    };
    format(1.45, '0.0', { rounding: customRoundingFunction }); // Returns "1.4"
    format(-1.45, '0.0', { rounding: customRoundingFunction }); // Returns "1.5"
    ```

- **nullFormat**: 
  - type: ***string***
  - default: ***""***
  - If defined, it will be the returned string when the value is ***null*** | ***undefined*** | ***NaN***.
    ```javascript
    format(null, '0.0', { nullFormat: 'N/A' }); // Returns "N/A"
    format(undefined, '0.0', { nullFormat: 'N/A' }); // Returns "N/A"
    format(NaN, '0.0', { nullFormat: 'N/A' }); // Returns "N/A"
    ```
  - Take into account that if the ***nanFormat*** option has been defined, then this option will be ignored if the value is ***NaN***, and instead, the ***nanFormat*** string will be returned.
    ```javascript
    const options = { nullFormat: 'N/A', nanFormat: 'NaN' };
    format(NaN, '0.0', options); // Returns "NaN"
    format(null, '0.0', options); // Returns "N/A"
    format(undefined, '0.0', options); // Returns "N/A"
    ```

  > If you want **a formatted zero** (0) as a fallback for ***null*** | ***undefined*** | ***NaN***. You should pass 0 explicitly to the function, like in the following example.
  ```javascript
  format(myPotentiallyNullValue || 0, '0.000##'); // Returns "0.000"
  ```

- **nanFormat**: 
  - type: ***string***
  - default: ***""***
  - If defined, it will be the returned string when the value is ***NaN***.
    ```javascript
    format(NaN, '0.0', { nanFormat: 'N/A' }); // Returns "N/A"
    ```
  - Take into account that for ***NaN*** values, **nanFormat** has priority over **nullFormat**.
    ```javascript
    format(NaN, '0.0', { nanFormat: 'TEST', nullFormat: '-' }); // Returns "TEST"
    ```

  > If you want **a formatted zero** (0) as a fallback for ***NaN*** values. You should pass 0 explicitly to the function, like in the following example.
  ```javascript
  format(myPotentiallyNaNValue || 0, '0.000##'); // Returns "0.000"
  ```

- **zeroFormat**: 
  - type: ***string***
  - default: ***undefined***
  - If defined, it will be the returned string when the value is ***0***.
    ```javascript
    format(0, '0.0', { zeroFormat: 'N/A' }); // Returns "N/A"
    ```

- **locale**: 
  - type: ***[NumerableLocale](locale)***
  - default: ***en*** *(english [NumerableLocale](locale))*
  - If a [**NumerableLocale**](locale) is provided, it will format the number with the specified locale.
    ```javascript
    import { fr } from 'numerable/locale';
    format(1234.56, '0.000', { locale: fr }); // Returns "1 234,560"
    ```

- **scalePercentage**: 
  - type: ***boolean***
  - default: ***true***
  - If **true** (default), it will multiply the number by 100 when a [percentage format](percentage) is detected. If **false**,  the number won't be scaled when a [percentage format](percentage) is detected.  
    ```javascript
    format(0.12, '0.0 %'); // Returns '12 %'
    format(0.12, '0.0 %', { scalePercentage: false }); // Returns "0.12 %"
    ```
    > See [percentage format](percentage) for details.

- **formatters**
  - type: 
    - ***[NumerableFormatter](formatter)[]***  
    or
    - ***function***: *(builtInFormatters: [NumerableFormatter](formatter)[]) => [NumerableFormatter](formatter)[]*
  - default: *BUILT_IN_FORMATTERS*
  - If **formatters** option is provided, **numerable** will include the provided formatters during the format process.  
    If the option is an **array** of formatters, the formatters will be applied after the built-in formatters.  
    If the formatters option is a **function**, the function will receive the built-in formatters and it should return an array of NumerableFormatters. Then, the formatters will be applied in the order of the provided array.  
    See [NumerableFormatter](formatter) for details.
    ```javascript
    import myCustomFormatter from './my-formatters/myCustomFormatter';
    format(12, '0.0 EXAMPLE_TOKEN', { formatters: [myCustomFormatter] }); 
    // If EXAMPLE_TOKEN matches with your custom formatter, it will return what your custom formatter is built to return.
    ```


- **type**
  - type: ***string*** | ***null***
  - default: ***null***
  - Implement
