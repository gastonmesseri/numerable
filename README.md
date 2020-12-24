<p align="center">
  <img alt="numerable" src="resources/numerable-logo-with-text-384-320.png">
</p>

<p align="center">
  <img alt="numerable-format-demo" width="400" src="resources/numerable-format-demo.gif">
</p>


![Build](https://travis-ci.com/gastonmesseri/numerable.svg?branch=master) ![Coveralls](https://coveralls.io/repos/github/gastonmesseri/numerable/badge.svg?branch=master) ![License](https://img.shields.io/badge/license-MIT-blue.svg)


# [numerable](https://github.com/gastonmesseri/numerable)

**numerable** is a Javascript library with a set of formatting and manipulation tools for dealing with numbers.

:warning: **numerable** is still under development. So I cannot yet provide an stable version of it, but you can still try it. Be aware that the current api can change.  


## Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install **numerable**.

```bash
npm install --save numerable
# or
yarn add numerable
```

### Usage

```javascript
import { format, parse } from 'numerable';

format(1500250.2, '0,0.00');
//=> '1,500,250.20'

format(0.25, '0.0 %');
//=> '25.0 %'

parse('80.5%');
//=> 0.805
```

---

## format()


\- Syntax
```
format(number, [pattern="0,0.##########"], [options=DEFAULT_OPTIONS])
```

-  *number*
    - type: ***number*** | ***string*** | ***null*** | ***undefined***
    - The number to format

- *pattern*
    - type: ***string*** | ***null*** | ***undefined***
    - default: ***"0,0.##########"***
    - The pattern used to format the provided number.
    - examples:
        - `"0.00"`
        - `"0,0.00##"`
        - `"0,0.00 %"`
        - `"0.0 a"`
      
- *options*
    - type: ***FormatOptions*** | ***null*** | ***undefined***
    - The options to apply in the format process.
    - example:
        ```javascript
        format(1234.56, '0,0.00', {
            defaultPattern: '0,0.##########',
            nullFormat: 'N/A',
            nanFormat: 'NaN',
            zeroFormat: '-',
            rounding: 'floor',
            locale: fr,
        });
        ```
    - FormatOptions properties:
        - **defaultPattern**: 
            - type: ***string***
            - default: ***"0,0.##########"***
            - It will be the formatting pattern applied in case that the provided pattern in the arguments is null, undefined or "" (empty string).

        - **rounding**: 
            - type: 
                - ***string***: *"truncate"* | *"ceil"* | *"floor"* | *"round"*  
                or
                - ***function***: *(value: number) => number*
            - default: ***Math.round***
            - It will be the rounding function applied to the number in the resolved maximum amount of decimal places.

        - **nullFormat**: 
            - type: ***string***
            - default: ***""***
            - If defined, it will be the returned string when the value is ***null*** | ***undefined*** | ***NaN***.

        - **nanFormat**: 
            - type: ***string***
            - default: ***""***
            - If defined, it will be the returned string when the value is ***NaN***.

        - **zeroFormat**: 
            - type: ***string***
            - default: ***undefined***
            - If defined, it will be the returned string when the value is ***0***.

        - **locale**: 
            - type: ***NumerableLocale*** | ***string***
            - default: ***en NumerableLocale***
            - If a **NumerableLocale** is passed, it will format the number with the specified locale.
            - If a **string** with a valid **language tag** is passed (e.g. "en-IN"), it will format the number based on the platform **[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)**.

        - **scalePercentage**: 
            - type: ***boolean***
            - default: ***true***
            - If **true** (default), it will multiply the number by 100 when a percentage format is detected. If **false**,  the number won't be scaled when a percentage format is detected.  

---



## Formatting numbers

Numbers formatting in **numerable** is done through a pattern-based syntax. With these patterns you can easily define common number formats, similar to date formatting. 

The numeric pattern syntax defines:
- **Amount of decimal places**
- **Thousands separator** (grouping)
- **Number sign type** (**+** **-** and **()**)
- **Number sign position**


\- Examples

|          Number 	|      Pattern 	|             Result 	|    Locale         |
|---------------:	|-------------:	|-------------------:	|:-----------------:|
|          10000 	|   "0,0.0000" 	|      "10,000.0000" 	|  en (English)     |
|           1.23 	|        "0.0" 	|              "1.2" 	|  en (English)     |
|       10000.23 	|        "0,0" 	|           "10,000" 	|  en (English)     |
|  1000.23456789 	|      "0,0.X" 	|   "1,000.23456789" 	|  en (English)     |
|  1000.23456789 	|      "0,0.X" 	|   "1 000,23456789" 	|  fr (French)      |
|              0 	|       "0.00" 	|             "0,00" 	|  fr (French)     |
|         -10000 	|      "0,0.0" 	|        "-10.000,0" 	|  es (Spanish)     |
|     10000.1234 	|      "0.000" 	|        "10000.123" 	|  en (English)     |
|      10000.001 	|     "0[.]00" 	|            "10000" 	|  en (English)     |
|         -10000 	| "(0,0.0000)" 	|    "(10,000.0000)" 	|  en (English)     |
|         -12300 	|  "+0,0.0000" 	|     "-12,300.0000" 	|  en (English)     |
|          12300 	|  "+0,0.0000" 	|     "+1,2300.0000" 	|  ja (Japanese)     |
|           1230 	|       "0,0+" 	|           "1,230+" 	|  en (English)     |
|           1230 	|       "0,0-" 	|            "1,230" 	|  en (English)     |
|           0.67 	|    "0.0####" 	|             "0.67" 	|  en (English)     |
|           0.67 	|    "0.000##" 	|            "0.670" 	|  en (English)     |
|        3162.63 	| "0.0#######" 	|          "3162.63" 	|  en (English)     |
|           0.23 	|     "000.##" 	|           "000.23" 	|  en (English)     |
|       1234.567    |     "0,0.00"  |        "١‎٬٢‎٣‎٤‎٫٥‎٧‎"    |  arEG (Arabic-Egipt)    |
|      undefined 	|     "0,0.00" 	|                 "" 	|  en (English)     |
|           null 	|       "0.00" 	|                 "" 	|  en (English)     |
|            NaN 	|        "0.0" 	|                 "" 	|  en (English)     |
| <img width="200" height="1"> | <img width="200" height="1"> | <img width="200" height="1"> | |

#### Percentages

By adding the % symbol to any of the previous patterns, the value is multiplied by 100 and the % symbol is added in the place indicated.


|          Number 	|      Pattern 	|             Result 	|  Locale           |
|---------------:	|-------------:	|-------------------:	|:-----------------:| 
|           0.52 	|      "0.##%" 	|              "52%" 	|  en (English)     | 
|              1 	|      "0.##%" 	|             "100%" 	|  en (English)     | 
|              1 	|   "0,0.00 %" 	|         "100.00 %" 	|  en (English)     | 
|          -0.88 	|        "0 %" 	|            "-88 %" 	|  en (English)     | 
| <img width="200" height="1"> | <img width="200" height="1"> | <img width="200" height="1"> |  |

#### Abbreviated numbers

If an abbreviation is specified in the pattern (**a**), **numerable** will look for the shortest abbreviation for your number, and it will display the number with a locale-specific abbreviation. 

|          Number 	|      Pattern 	|             Result 	|  Locale            |
|---------------:	|-------------:	|-------------------:	|:------------------:|
|     2000000000 	|       "0.0a" 	|             "2.0B" 	|    en (English)    |
|        1230974 	|       "0.0a" 	|             "1.2M" 	|    en (English)    |
|           2460 	|        "0 a" 	|            "2 mil" 	|    es (Spanish)    | 
|        -104000 	|        "0 a" 	|           "-104 K" 	|    en (English)    | 
|         999950 	|       "0.0a" 	|          "1.0тыс." 	|    ru (Russian)    | 
|      999999999 	|        "0 a" 	|           "1 Mio." 	|    de (German)     | 
| <img width="200" height="1"> | <img width="200" height="1"> | <img width="200" height="1"> | |


---

## Internationalization (i18n)

**numerable** includes two functions that support i18n:
- ***format***
- ***parse***

---



### Usage (i18n)

In order to handle internationalization, **numerable** provides you two ways of dealing with it:
1. **Import a numerable locale** and pass it to the locale option.  
    ```javascript
    import { es, enIN } from 'numerable/locale';
    format(2500000, '0,0.0 a', { locale: es }); //=> '2,5 M'
    format(2500000, '0,0.0 a', { locale: enIN }); //=> '25.0 L'
    ```

    > - Pros: 
    >   - Full cross browser compatibility and consistency
    >   - Additional formatting features
    > - Cons:
    >   - Potential increase in the build size (depending on how many different locales your app is using)    


2. **Pass a valid [language tag](https://en.wikipedia.org/wiki/IETF_language_tag)** string to the locale option.  
    ```javascript
    format(2500, '0,0.0 a', { locale: 'fr' }); //=> '2,5 k'
    format(2500, '0,0.0 a', { locale: 'cs' }); //=> '2,5 tis.'
    ```
    > - Pros: 
    >   - Smaller bundle size (depending on how many different locales your app is using)
    > - Cons:
    >   - Some features won't work on old browsers like IE11 (they will fallback to *en* language), resulting in potential inconsistency across browsers.
    >   - No extra formatting features


> Take into account that the locale formatting options can differ between numerable locales and the ones extracted from the platform. Based in user feedback from other popular libraries, *numerable* locales return a better result than Intl.NumberFormat.

\- The locale option has the following interface
- **locale**: 
  - type: ***NumerableLocale*** | ***string***
  - default: ***en NumerableLocale***

```javascript
import { format, parse } from 'numerable';
import { de } from 'numerable/locale';

// Passing a NumerableLocale
format(1.5, '0.00', { locale: de });
parse('1,5', { locale: de });

// Passing a language tag string
format(1.5, '0.00', { locale: 'de-CH' });
parse('1.5', { locale: 'de-CH' });
```
---

### Wrapping localization handling (i18n)

#### - Using custom wrappers

Feel free to create your own tiny wrappers to make the internationalization API simple and use those instead of the original functions:  

```javascript
// my-app/utils/format.js
​
import { format } from 'numerable';
import { es, fr, enIN } from 'numerable/locale';
​
const locales = {
    es,
    fr,
    'en-in': enIN,
};
​
export default function (value, pattern = '0,0.000', options) {
    const appLocaleId = window.__myLocaleId__;
    return format(value, pattern, { locale: locales[appLocaleId], ...options });
}
​
```


```javascript
// Later...

import format from 'my-app/utils/format';
​
window.__myLocaleId__ = 'es';
format(1234.56, '0,0.00');
// => "1.234,56"
​
// With our wrapper function, if the pattern is omitted, it will take the default from the wrapper function.
window.__myLocaleId__ = 'fr';
format(1234.56);
// => "1 234,560"
​
window.__myLocaleId__ = 'en-in';
format(123456789.12, '0,0.0');
// => "12,34,56,789.1"

// 'en' will work, as it is the default locale of numerable
window.__myLocaleId__ = 'en';
format(1234.56, '0,0.00');
// => "1,234.56"
```

---

### Using numerable locales (i18n)

If a **NumerableLocale** is passed, it will format the number with the specified locale.  

The locales provided by **numerable** allow full support for formatting options.
- Thousands and decimal delimiters
- Abbreviations (e.g. "1.5 K")
- Ordinal numbers (e.g. "3rd")
- Digit grouping style (e.g. "10,00,000.00" or "100,0000.00")
- Different numeral systems (e.g. "٢‎٬٥‎٩‎٩‎٬٦‎٥‎٤‎٫٠‎")

```javascript
import { fr, es, enIN, zh } from 'numerable/locale';
format(1234.56, '0.000', { locale: fr }); // Returns "1 234,560"
format(2500000, '0,0.0 a', { locale: es }); //=> '2,5 M'
format(2500000, '0,0.0 a', { locale: enIN }); //=> '25.0 L'
format(2500000, '0,0.0', { locale: zh }); //=> '250,0000.0'
format(2544609, '0,0.0', { locale: arEG }); //=> '٢‎٬٥‎٤‎٤‎٬٦‎٠‎٩‎٫٠‎'
```
---


### Using platform locales (i18n)

If a **string** with a valid **language tag** is passed to the locale option (e.g. "en-IN"), **numerable** will format the number based on the platform **[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)**.  
> Take into account that support for Intl.NumberFormat is still limited on some browsers. And some of the features, like abbreviation won't work in old browsers like IE11.  
>
> If a feature is not found in the browser, numerable will still work, and it will fallback to the **en** locale for that specific feature.

```javascript
format(2500, '0.0 a', { locale: 'fr' }); //=> '2,5 k'
format(2500, '0.0 a', { locale: 'cs' }); //=> '2,5 tis.'
format(2500, '0.0 a', { locale: 'es' }); //=> '2,5 mil'
```
---



<!-- ## Contributing with new Languages

Use this quick guide:  
First of all, create an issue so you won't overlap with others.
A detailed explanation of how to add a new locale.
Use English locale as the basis and then incrementally adjust the tests and the code.
Directions on adding a locale with the same language as another locale.
If you have questions or need guidance, leave a comment in the issue.
Thank you for your support! -->



## Acknowledgements

**numerable** started as a fork from [Adam Draper](https://github.com/adamwdraper)'s project [Numeral.js](http://numeraljs.com/).  
It has been completely rewriten in Typescript with a functional API and extended features.  
Also, [date-fns](https://date-fns.org/) served as inspiration for some of the features.

> The patterns used in **numerable** are an extended version of the original patterns created by [Numeral.js](http://numeraljs.com/).  


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License

[MIT](https://choosealicense.com/licenses/mit/)
