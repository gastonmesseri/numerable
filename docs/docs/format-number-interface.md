---
id: format-number-interface
title: format() interface
sidebar_label: format() interface
---

import PlaygroundInputs from './../src/components/playground-inputs.tsx';

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)

## format() interface

```javascript
format(1234.56, '0,0.0'); // Returns "1,234.6"

format(1234.56, '0,0.00', { nullFormat: '-' }); // Returns "1,234.560"

format(1234.56); // Returns "1,234.560"

format(1234.56, { locale: en }); // Returns "1,234.560"

format(null, '0,0.00', '-'); // Returns "-"
format(undefined, '0,0.00', '-'); // Returns "-"
format(NaN, '0,0.00', '-'); // Returns "-"
```

## error

If an error occurs during the format process, an empty string will be returned.
```javascript
const brokenRoundingFunction = () => { throw new Error(); };
format(1, '0.00', { rounding: brokenRoundingFunction }); // Returns ""
```

## Return type

***format()*** function will always return an string.  
If you implement your own [format (see here how to implement custom formats)](/), be sure that you always return an string. Otherwise numerable will fallback to an empty string.  
