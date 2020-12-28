---
id: function_parse
title: parse()
sidebar_label: parse()
---

---

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)
> - "|||K|||M|||B|||T" for abbreviations  

---



## Description

Parses the `numberString` into a *number*, using the given format `options` if provided.

---



## Syntax

```
parse(numberString, [options])
```

---



## Usage

### Examples

```javascript
import { parse } from 'numerable';

parse('1,200,500.23');  //=> 1200500.23
parse('(1,500)');  //=> -1500
parse('1.500,90');  //=> 1500.90
parse('2.85-');  //=> -2.85
parse('+3.50');  //=> 3.50
parse('1.2 K');  //=> 1200
parse('30 %');  //=> 0.3

// With locale
import { es } from 'numerable/locale';
parse('1.500,90', { locale: es });  //=> 1500.90
parse('2,85-', { locale: es });  //=> -2.85
parse('+3,50', { locale: es });  //=> 3.50
parse('2,9 mil', { locale: es });  //=> 2900

// Time
parse('03:00');  //=> 180 (180 seconds)
parse('01:00:00');  //=> 3600 (3600 seconds)

// Different numeral system
import { arEG } from 'numerable/locale';
parse('٩‎٬٨‎٧‎٦‎', { locale: arEG }); //=> 9876
```

:::note
If you don't pass a *locale* in the options, the **parse** function by default will parse the string with the **en** locale configuration.
:::

---



### Null format

If a **nullFormat** is specified in the options and the given string matches the nullFormat, then it will return ***null***.

```javascript
import { parse } from 'numerable';

parse('N/A', { nullFormat: 'N/A' }); // Returns null
```

---



### Zero format

If a **zeroFormat** is specified in the options and the given string matches the zeroFormat, then it will return ***0***.

```javascript
import { parse } from 'numerable';

parse('-', { zeroFormat: '-' }); // Returns 0
parse('-', { zeroFormat: '-', nullFormat: 'N/A' }); // Returns 0
```


### Return type

The parsed number

- Return type: ***number*** | ***null***
