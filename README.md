<p align="center">
  <img alt="numerable" src="resources/numerable-logo-with-text-384-320.png">
</p>

<p align="center">
  <img alt="numerable-format-demo" width="400" src="resources/numerable-format-demo.gif">
</p>


![License](https://img.shields.io/badge/license-MIT-blue.svg)


# [numerable](https://github.com/gastonmesseri/numerable)

**numerable** is a Javascript library with a set of formatting and manipulation tools for dealing with numbers.

:warning: **numerable** is still under development. So I cannot yet provide an stable version of it, but you can still try it.


## Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install **numerable**.

```bash
npm install --save numerable
# or
yarn add numerable
```



## Usage

```javascript
import { format, parse, round } from 'numerable';

format(1500250.2, '0,0.00');
//=> '1,500,250.20'

format(0.25, '0.0 %');
//=> '25.0 %'

parse('80.5%');
//=> 0.805

round(25.4875, 2);
//=> 25.49
```


#### Format examples

|          Number 	|      Pattern 	|             Result 	|
|---------------:	|-------------:	|-------------------:	|
|          10000 	|   "0,0.0000" 	|      "10,000.0000" 	|
|           1.23 	|        "0,0" 	|                "1" 	|
|       10000.23 	|        "0,0" 	|           "10,000" 	|
|  1000.23456789 	|      "0,0.X" 	|   "1,000.23456789" 	|
|              0 	|       "0.00" 	|             "0.00" 	|
|         -10000 	|      "0,0.0" 	|        "-10,000.0" 	|
|     10000.1234 	|      "0.000" 	|        "10000.123" 	|
|      10000.001 	|     "0[.]00" 	|            "10000" 	|
|      10000.456 	|    "0[.]00#" 	|        "10000.456" 	|
|          10000 	| "(0,0.0000)" 	|      "10,000.0000" 	|
|         -10000 	| "(0,0.0000)" 	|    "(10,000.0000)" 	|
|         -12300 	|  "+0,0.0000" 	|     "-12,300.0000" 	|
|           1230 	|       "+0,0" 	|           "+1,230" 	|
|           1230 	|       "-0,0" 	|            "1,230" 	|
|          -1230 	|       "-0,0" 	|           "-1,230" 	|
|        -1230.4 	|     "0,0.0+" 	|         "1,230.4-" 	|
|        -1230.4 	|     "0,0.0-" 	|         "1,230.4-" 	|
|         1230.4 	|     "0,0.0-" 	|          "1,230.4" 	|
|         100.78 	|          "0" 	|              "101" 	|
|          1.932 	|        "0.0" 	|              "1.9" 	|
|         1.9687 	|        "0.0" 	|              "2.0" 	|
|          -0.23 	|        ".00" 	|             "-.23" 	|
|          -0.23 	|      "(.00)" 	|            "(.23)" 	|
|           0.23 	|    "0.00000" 	|          "0.23000" 	|
|           0.67 	|    "0.0####" 	|             "0.67" 	|
|        3162.63 	| "0.0#######" 	|          "3162.63" 	|
|           1.99 	|        "0.#" 	|                "2" 	|
|         1.0501 	|      "0.00#" 	|             "1.05" 	|
|          1.005 	|       "0.00" 	|             "1.01" 	|
|              0 	|       "00.0" 	|             "00.0" 	|
|           0.23 	|     "000.##" 	|           "000.23" 	|
|              4 	|        "000" 	|              "004" 	|
|             10 	|      "00000" 	|            "00010" 	|
|           1000 	|      "000,0" 	|            "1,000" 	|
|           1000 	|    "00000,0" 	|           "01,000" 	|
|           1000 	|  "0000000,0" 	|        "0,001,000" 	|
|     2000000000 	|       "0.0a" 	|             "2.0B" 	|
|        1230974 	|       "0.0a" 	|             "1.2M" 	|
|           1460 	|         "0a" 	|               "1K" 	|
|        -104000 	|        "0 a" 	|           "-104 K" 	|
|         999950 	|       "0.0a" 	|             "1.0M" 	|
|      999999999 	|         "0a" 	|               "1B" 	|
| -5444333222111 	|     "0,0 ak" 	| "-5,444,333,222 K" 	|
|  5444333222111 	|     "0,0 am" 	|      "5,444,333 M" 	|
| -5444333222111 	|     "0,0 ab" 	|         "-5,444 B" 	|
| -5444333222111 	|     "0,0 at" 	|             "-5 T" 	|
|         123456 	|    "0.0# ak" 	|         "123.46 K" 	|
|            150 	|     "0.0 ak" 	|            "0.2 K" 	|
|      undefined 	|     "0,0.00" 	|                 "" 	|
|           null 	|       "0.00" 	|                 "" 	|
|            NaN 	|        "0.0" 	|                 "" 	|


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.



## License

[MIT](https://choosealicense.com/licenses/mit/)
