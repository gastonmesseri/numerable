---
id: number-pattern
title: Number pattern
sidebar_label: Number pattern
---

> Examples on this page are formatted with the "en" locale:
> - "**,**" for thousands separator (or grouping)
> - "**.**" for decimals separator (or fraction digits)

## - Optional decimals

You can define optional decimals in the number pattern with the "**#**" character.  

This will show as many decimals as defined but only in the case that the provided value has that amount of decimals.
This can be understood as the *maximum amount of decimals*.

<!-- Note that this specifier never displays a zero that is not a significant digit, even if zero is the only digit in the string. It will display zero only if it is a significant digit in the number that is being displayed. -->

The "**#**" format causes the value to be rounded to the nearest digit preceding the decimal. For example, formatting 34.57 with the pattern ***"0.#"*** would result in the value 34.6.  

The optional decimals character can also be mixed with the [minimum decimals](#--minimum-decimals) character (**0**). So a pattern like ***"0.00##"*** will define a minimum amount of 2 decimals, and a maximum amount of 4.  

```javascript
formatNumber(1234.23405, '0.#'); // Returns "1234.2"
formatNumber(1234.23405, '0.##'); // Returns "1234.23"
formatNumber(1234.23405, '0.################'); // Returns "1234.23405"
formatNumber(1234.5, '0.#'); // Returns "1234.5"
formatNumber(1234.5, '0.##'); // Returns "1234.5"
formatNumber(1234, '0.##'); // Returns "1234"
formatNumber(1234, '0.00##'); // Returns "1234.00"
```

<!-- :::caution
**numeraljs** uses "**[0]**" for optional decimals (e.g. `numeral(1234.5).format('0.0[00]')`). But **numerable** uses "**#**".  
So `numeral(1234.5).format('0.0[00]')` equals to `formatNumber(1234.5, '0.0##')`. In any case, if you are migrating your application from numeraljs to numerable, we provide support for the numeral optional decimals syntax, so a pattern like "0.0[00]" will still work on numerable. But take into account that this support is already deprecated in numerable, and it will be removed in next versions.
```javascript
numeral(1234.5).format('0.[00]') === formatNumber(1234.5, '0.##'); // true

formatNumber(1234.5, '0.[00]'); // It still works. Returns "1234.5"
formatNumber(1234.5, '0.##');   // Same as previous line
```
::: -->

---



## - No decimals limit

You can define a no-decimals-limit with the "**X**" character as the last character in the number pattern.  

This works in the same way as the [optional decimals](#--optional-decimals), but by defining a no-limit for the decimal places. So if for example, a number contains 10 decimals, with the pattern ***"0.X"*** all of them will be shown.

The no-decimals-limit character can also be mixed with the [minimum decimals](#--minimum-decimals) character (**0**). So a pattern like ***"0.00X"*** will define a minimum amount of 2 decimals, and no maximum amount of decimals.  

```javascript
formatNumber(1234.23405, '0.X'); // Returns "1234.23405"
formatNumber(1, '0.00X'); // Returns "1.00"
formatNumber(1.5, '0.00X'); // Returns "1.50"
formatNumber(1.531, '0.00X'); // Returns "1.531"
formatNumber(1.531001, '0.00X'); // Returns "1.531001"
formatNumber(0.0000000000000000000123, '0.X'); // Returns "0.0000000000000000000123"
formatNumber(50300.80808, '0,0.X'); // Returns "50,300.80808"
```

---



## - Strict optional decimals

If [.] is defined, only display the minimum and maximum decimals if the value has decimals.



## - Minimum decimals

This is the minimum decimals explanation

---



## - Rounding

Here the rounding explanation

---



## - Number sign

---



### - Forced sign

---



### - Negative sign at the right  

negative sign with abbreviations and at the right, should put negative sign next to number '1.2- K' vs '1.2 K-'

---



### - Forced sign at the right

---



### - Parentheses
