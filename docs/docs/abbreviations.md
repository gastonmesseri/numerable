---
id: abbreviations
title: Abbreviations
sidebar_label: Abbreviations
---

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)
> - "K" | "M" | "B" | "T" for abbreviations.

---

import PlaygroundInputs from './../src/components/playground-inputs.tsx';

<span style={{ color: '#fc519f', fontWeight: 'bold' }}>numerable</span> provides an easy mechanism to round up any number with the key average.

##### Example

<PlaygroundInputs defaultValue={1000} defaultPattern="0.0 a" editable={false} />

:::note
Note that the abbreviation is language-specific. The examples on this page are presented using the 'en' culture.
:::

---



### Abbreviation syntax

The abbreviation pattern syntax is the "a" character followed by an optional specific abbreviation scale 

```javascript
"a[k | m | b | t]"

format(x, '0,0.0 a');
format(x, '0,0.0 ak');
format(x, '0,0.0 am');
format(x, '0,0.0 ab');
format(x, '0,0.0 at');
```

---



### "Automatic" vs "Specific" abbreviation

Abbreviation can be **automatic** if only the character **'a'** is included in the format pattern, or **'specific'** if an specific abbreviation scale symbol is provided ('k', 'm', 'b', 't').


```javascript
// Automatic example:
format(1000000, '0.0 a'); //=> '1.0 M'

// Specific example:
format(1000000, '0.0 ak'); //=> '1000.0 K'
```

---



### Automatic abbreviation

If abbreviation is automatic (`"0 a"`), <span style={{ color: '#fc519f', fontWeight: 'bold' }}>numerable</span> will scale the number to the *best* abbreviation found in the locale abbreviations (See [NumerableLocale](locale) abbreviations).  

##### Examples with automatic abbreviation

```javascript
// With english locale (en)
format(1000, '0.0 a'); //=> '1.0 K'
format(981234.56999919, '0.00 a'); //=> '981.23 K'
format(1000000, '0.0 a'); //=> '1.0 M'
format(1000000000, '0.0 a'); //=> '1.0 B'
format(1000000000000, '0.0 a'); //=> '1.0 T'
format(1000000000000000, '0.0 a'); //=> '1000.0 T'


/**
 * With chinese locale (zh)
 * <i> Note that zh locale doesn't scale on thousands.
 *     It scales on each 10 thousand.
 */ 
import { zh } from 'numerable/locale';
format(1000, '0.0 a', { locale: zh }) //=> '1000.0'
format(10000, '0.0 a', { locale: zh }) //=> '1.0 万'
format(100000000, '0.0 a', { locale: zh }) //=> '1.0 亿'


/**
 * With english-india locale (en-in)
 * <i> Note that en-in locale abbreviates following a custom pattern.
 *     The pattern is: '|||T||L||Cr|||TCr||LCr'
 */ 
import { enIN } from 'numerable/locale';
format(1000, '0.0 a', { locale: enIN }) //=> '1.0 T'
format(100000, '0.0 a', { locale: enIN }) //=> '1.0 L'
format(10000000, '0.0 a', { locale: enIN }) //=> '1.0 Cr'
format(10000000000, '0.0 a', { locale: enIN }) //=> '1.0 TCr'
```

:::note
The maximum abbreviation depends on the locale (See [NumerableLocale](locale) abbreviations). For the language used on most of the examples of this page (**en**) is "trillion". Therefore, if a bigger number is provided, then it will still scale the number to the "trillion" unit. You can always define a bigger abbreviation on the [NumerableLocale](locale).

##### Example

```javascript
format(1000000000000000, '0.0 a'); //=> '1000.0 T'
format(1000000000000000000, '0.0 a'); //=> '1000000.0 T'
```
:::

---



### Abbreviation bypass

If the number is smaller than the first defined abbreviation on the locale abbreviations (See [NumerableLocale](locale)), and the abbreviation is automatic, then the abbreviation will be ommited.

```javascript
format(10.23, '0.00 a'); //=> '10.23'
format(0.123, '0.000 a'); //=> '0.123'
```

---



### Specific abbreviation scales

Abbreviation scaling can be specifically defined. This is achieved by appending an specific abbreviation scale symbol ('k' | 'm' | 'b' | 't') after the 'a' character. This will try forcing the abbreviation to the defined scale unit.

- '**ak**': thousand scaling.
- '**am**': million scaling.
- '**ab**': billion scaling (in short scale).
- '**at**': trillion scaling (in short scale).

##### Example

```javascript
// For english
format(1234, '0.00 ak'); //=> '1.23 K'
format(1222333, '0.00 ak'); //=> '1222.33 K'
format(10.23, '0.00 ak'); //=> '0.01 K'
format(12345.05, '0.000 am'); //=> '0.012 M'
format(1333555777999, '0.0 ab'); //=> '1333.6 B'
format(1333555777999, '0.0 at'); //=> '1.3 T'
```

:::note
Note that not all languages have an abbreviation for the specified unit. For example, chinese doesn't have an abbreviation for *thousand*, so it will look (first up, then down) for the closest abbreviation to a thousand (that in the following example will be 10 thousand).  
The rule is: it will use the closest available abbreviation to the specified forced unit (in terms of power of 10) and it will try giving priority to the upper one. And that means, the closest available abbreviation to a thousand, the closest available abbreviation to a million...
```javascript
// For chinese
import { zh } from 'numerable/locale';
format(1234.567, '0,0.00 ak', { locale: zh }); //=> '0.12 万'
```
:::


---



### Language specific abbreviations

Abbreviations are language specific. The format resulting abbreviation will be the one defined on the specified locale.

```javascript
// For italian
import { it } from 'numerable/locale';
format(1234, '0.00 ak', { locale: it }); //=> '1.23 mila'

// For czech
import { cs } from 'numerable/locale';
format(1234, '0.00 ak', { locale: cs }); //=> '1.23 tis.'
```

You can try different languages here:

<PlaygroundInputs defaultValue={10000} defaultPattern="0.0 a" editable={false} localeSelector />
