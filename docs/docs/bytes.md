---
id: format::bytes
title: Bytes
sidebar_label: Bytes
---

import PlaygroundInputs from './../src/components/playground-inputs.tsx';

<span style={{ color: '#fc519f', fontWeight: 'bold' }}>numerable</span> allows you to format numbers based on bytes.

##### Code example

<PlaygroundInputs defaultValue={3072} defaultPattern="0.00 bd" editable={false} />
<PlaygroundInputs defaultValue={3072} defaultPattern="0.00 bb" editable={false} />

##### Examples

| Number        | Format pattern           | Result    |
| ------------: | :----------------------: | --------: |
| 100           | '0**bd**'                 | 100B      |
| 1024	        | '0**bd**'                 | 1KB       |
| 2048	        | '0 **bb**'               | 2 KiB     |
| 3072          | '0.0 **bd**'              | 3.1 KB    |
| 7884486213    | '0.00**bd**'              | 7.88GB    |
| 3467479682787 | '0.000 **bb**'           | 3.154 TiB |


### Bytes format syntax

The **bytes** format pattern syntax is the **"bd"** characters or the **"bb"** characters.

```javascript
"bd" | "bb"

format(x, '0.0 bd');
format(x, '0.0 bb');
```

### "Decimal" vs "Binary" bytes formatting

Bytes scaling can be performed with a **decimal** or **binary** base. **decimal** scaling is performed with the **"bd"** characters, and **binary** with the **"bb"** characters.

```javascript
// -- Decimal examples:
format(1024, '0.### bd');
// Result: "1.024 KB"
format(2048, '0.### bd');
// Result: "2.048 KB"

// -- Binary examples:
format(1024, '0.### bb');
// Result: "1 KiB"
format(2048, '0.### bb');
// Result: "2 KiB"
```

<!-- ### Specific bytes scaling

Not implemented -->

---



### Parse

In order to parse bytes, you have to provide the **type**: ***bytes*** in the parse options.

```javascript
parse('1.5 GB', { type: 'bytes' }); // Result 1500000000
parse('2.5 MiB', { type: 'bytes' }) // Result 2621440
```
