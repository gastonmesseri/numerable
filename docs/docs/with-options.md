---
id: with-options
title: .withOptions()
sidebar_label: .withOptions()
---

---

## Usage

Example

```javascript
// my-app/utils/format.js

import { es, fr, enIN } from 'numerable/locale';
import { format } from 'numerable';

const locales = { es, fr, 'en-in': enIN };

export const format = format.withOptions({
    defaultPattern: '0,0.000',
    nullFormat: 'N/A',
    rounding: 'truncate',
    locale: () => {
        return locales[window.__myLocaleId__];
    },
});
```

```javascript
// Later...

import format from 'my-app/utils/format';
​
// Using the defaultPattern ('0,0.000') defined in .withOptions()
format(123456789.12);
// => "123,456,789.120"

// Using the nullFormat ('N/A') defined in .withOptions()
format(null, '0.00');
// => "N/A"

// Using the rounding ('truncate') defined in .withOptions()
format(1.28, '0.0');
// => "1,2"

// Using the locale resolved from the locale function in .withOptions()
window.__myLocaleId__ = 'fr';
format(1234.56, '0,0.000');
// => "1 234,560"
​
```
