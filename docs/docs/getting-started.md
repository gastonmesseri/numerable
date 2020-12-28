---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
slug: /
---

---

- Table of Contents

    - [Introduction](#introduction)
    - [Installation](#installation)

---



## Introduction

**numerable** provides a simple and consistent toolset for formatting JavaScript numbers in the browser & Node.js.  

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


## Installation

The library is available as an [npm package](https://www.npmjs.com/package/numerable).  

To install the package, run:

```bash
npm install --save numerable
# or
yarn add numerable
```

Start using:
```javascript
import { format } from 'numerable';

format(0.58, '0.00 %');
//=> '58.00 %'
```
