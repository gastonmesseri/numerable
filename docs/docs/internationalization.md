---
id: internationalization
title: Internationalization (i18n)
sidebar_label: Internationalization (i18n)
---

---

## Description

**numerable** includes two functions that support i18n:
- ***format***
- ***parse***

---



## Usage

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
    > 
    > See [using numerable locales](#using-numerable-locales) for details.  
  
  <br />


2. **Pass a valid [language tag](https://en.wikipedia.org/wiki/IETF_language_tag)** string to the locale option.  
    ```javascript
    import { format, getLocaleFromPlatform } from 'numerable';

    format(2500, '0,0.0 a', { locale: getLocaleFromPlatform('fr') }); //=> '2,5 k'
    format(2500, '0,0.0 a', { locale: getLocaleFromPlatform('cs') }); //=> '2,5 tis.'
    ```
  > - Pros: 
  >   - Smaller bundle size (depending on how many different locales your app is using)
  > - Cons:
  >   - Some features won't work on old browsers like IE11 (they will fallback to *en* language), resulting in potential inconsistency across browsers.
  >   - No extra formatting features
  >
  > See [using platform locales](#using-platform-locales) for details.


> Take into account that the locale formatting options can differ between numerable locales and the ones extracted from the platform. Based in user feedback from other popular libraries, *numerable* locales return a better result than Intl.NumberFormat.

---


## Locale option

The locale option has the following interface

- **locale**: 
  - type: ***[NumerableLocale](locale)*** | ***string***
  - default: ***en [NumerableLocale](locale)***

```javascript
import { format, parse, getLocaleFromPlatform } from 'numerable';
import { de } from 'numerable/locale';

// Passing a NumerableLocale
format(1.5, '0.00', { locale: de });
parse('1,5', { locale: de });

// Passing a locale extracted from the platform
format(1.5, '0.00', { locale: getLocaleFromPlatform('de-CH') });
parse('1.5', { locale: getLocaleFromPlatform('de-CH') });
```
---

## Wrapping localization handling


### - Using .withOptions()

It might seem complicated to require and pass locales as options, but unlike other number formatting libraries which bloats your build with all the locales by default, **numerable** forces the developer to manually require locales when needed.  

That is why **numerable** provide the function ***.withOptions()*** on the functions that support i18n. That works as a wrapper for the target function, and basically creates a new function with a predefined set of options. The locale property, can be a function that returns a locale, as you can see in the next example.  

> See [.withOptions()](with-options) page for more details about this feature.

```javascript
// my-app/utils/format.js

import { format } from 'numerable';
import { es, fr, enIN } from 'numerable/locale';

const locales = {
    es,
    fr,
    'en-in': enIN,
};

export const format = format.withOptions({
    defaultPattern: '0,0.000',
    locale: () => {
        const appLocaleId = window.__myLocaleId__;
        return locales[appLocaleId];
    },
});
```

```javascript
// Later...

import format from 'my-app/utils/format';
​
window.__myLocaleId__ = 'es';
format(1234.56, '0,0.00');
// => "1.234,56"
​
// If the pattern is omitted, it will take the default from the options passed to .withOptions() "0,0.000"
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

### - Using custom wrappers

Also, feel free to create your own tiny wrappers to make API simple and use those instead of the original functions:  

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

## Using numerable locales

If a [**NumerableLocale**](locale) is passed, it will format the number with the specified locale.  

The locales provided by **numerable** allow full support for formatting options.
- Thousands and decimal delimiters
- Abbreviations (e.g. "1.5 K")
- Ordinal numbers (e.g. "3rd")
- Digit grouping style (e.g. "10,00,000.00" or "100,0000.00")
- Different numeral systems (e.g. "٢‎٬٥‎٩‎٩‎٬٦‎٥‎٤‎٫٠‎")

```javascript
import { fr, es, enIN, zh, arEG } from 'numerable/locale';
format(1234.56, '0.000', { locale: fr }); // Returns "1 234,560"
format(2500000, '0,0.0 a', { locale: es }); //=> '2,5 M'
format(2500000, '0,0.0 a', { locale: enIN }); //=> '25.0 L'
format(2500000, '0,0.0', { locale: zh }); //=> '250,0000.0'
format(2544609, '0,0.0', { locale: arEG }); //=> '٢‎٬٥‎٤‎٤‎٬٦‎٠‎٩‎٫٠‎'
```
---


## Using platform locales

If a **string** with a valid **language tag** is passed to the locale option (e.g. "en-IN"), **numerable** will format the number based on the platform **[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)**.  
> Take into account that support for Intl.NumberFormat is still limited on some browsers. And some of the features, like abbreviation won't work in old browsers like IE11.  
>
> If a feature is not found in the browser, numerable will still work, and it will fallback to the **en** locale for that specific feature.

```javascript
import { format, getLocaleFromPlatform } from 'numerable';

format(2500, '0.0 a', { locale: getLocaleFromPlatform('fr') }); //=> '2,5 k'
format(2500, '0.0 a', { locale: getLocaleFromPlatform('cs') }); //=> '2,5 tis.'
format(2500, '0.0 a', { locale: getLocaleFromPlatform('es') }); //=> '2,5 mil'
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
