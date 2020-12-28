---
id: percentage
title: Percentage
sidebar_label: Percentage
---

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)

---

import PlaygroundInputs from './../src/components/playground-inputs.tsx';
import FormatExamplesTable from './../src/components/format-examples-table.component.tsx';

<span style={{ color: '#fc519f', fontWeight: 'bold' }}>numerable</span> allows you to format numbers as a percentage.

##### Example

<PlaygroundInputs defaultValue={0.15} defaultPattern="0.0 %" editable={false} />

##### Examples

<FormatExamplesTable
    rows={[
        [0.15, '0.0 %'],
        [0.43, '0,0.###%'],
        [1, '0 %'],
        [-0.41, '0%'],
        [41, '0 %!'],
    ]}
/>

---



### Percentage syntax

The percentage syntax is the "%" character followed by an optional exclamation mark if scaling is not desired.

```javascript
"%[!]"

// With space:
format(x, '0.0 %');
format(x, '0.0 %!');

// Without space:
format(x, '0.0%');
format(x, '0.0%!');
```

---



### Description

The percentage format will multiply the number by 100 during format, and it will divide it by 100 during parsing.  

```javascript
format(1, '0.0 %');
// Result: "100.0 %"
```

---



### Percentage scaling

If you don't want to multiply or divide the number by 100 during the format process, you can disable the scaling by:  

- Specifying that on the format options
    ```javascript
    format(1, '0.0 %', { scalePercentage: false });
    // Result: "1.0 %"
    ```
- Using the exclamation mark after the percentage symbol in the pattern
    ```javascript
    format(1, '0.0 %!');
    // Result: "1.0 %"
    ```

---



### Percentage space

The space defined between the number and the percentage symbol will be kept.

```javascript
// With space
format(1.234, '0.00 %'); // Result: "123.40 %"

// Without space
format(1.234, '0.00%'); // Result: "123.40%"
```
