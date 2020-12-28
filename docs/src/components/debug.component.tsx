import clsx from 'clsx';
import  numeral from 'numeral';
import React, { useState } from 'react';

// import en from './../../../src/locale/en';
// import { format } from './../../../src/index';
import { format } from 'numerable';
import PlaygroundInputs from './playground-inputs';
// import divide from '../../../src/core/utils/divide';
// import parse from './../../../src/formatter/parse/parse';
// import multiplyByPowerOfTen from '../../../src/core/utils/multiply-by-power-of-ten';

// (window as any).formatNumber = format;
// (window as any).numeral = numeral;
// (window as any).parse = parse;
// (window as any).en = en;
// (window as any).multiplyByPowerOfTen = multiplyByPowerOfTen;
// (window as any).divide = divide;

const Debug = (props) => {
    const result = format(9944.44, '0.0a');
    // console.log({ result });


    // const resultNumeral = numeral(999.99).format('0.0a');
    // console.log({ resultNumeral })

    // Corner case
    // 999950 | '0.0a'
    // [k] 999.95 (5) hay roundear el 5 para dejar sólo un decimal
    // Tras redondear el 5 el número resultante es 1000, lo cual sería una nueva abreviación

    return (
        <div>
            {props.output}
            HOLA
            <PlaygroundInputs />
        </div>
    );
};

export default Debug;
