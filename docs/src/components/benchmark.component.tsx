import clsx from 'clsx';
import numeral from 'numeral';
import React, { useState, useEffect } from 'react';

import { format } from 'numerable';

export const tests = [
    [0, null, '0'],
    [0, '0.00', '0.00'],
    [null, null, '0'],
    [NaN, '0.0', '0.0'],
    [1.23,'0,0','1'],
    [10000,'0,0.0000','10,000.0000'],
    [10000.23,'0,0','10,000'],
    [-10000,'0,0.0','-10,000.0'],
    [10000.1234,'0.000','10000.123'],
    [10000,'0[.]00','10000'],
    [10000.1,'0[.]00','10000.10'],
    [10000.123,'0[.]00','10000.12'],
    [10000.456,'0[.]00','10000.46'],
    [10000.001,'0[.]00','10000'],
    [10000.45,'0[.]00#','10000.45'],
    [10000.456,'0[.]00#','10000.456'],
    [10000,'(0,0.0000)','10,000.0000'],
    [-10000,'(0,0.0000)','(10,000.0000)'],
    [-12300,'+0,0.0000','-12,300.0000'],
    [1230,'+0,0','+1,230'],
    [1230,'-0,0','1,230'],
    [-1230,'-0,0','-1,230'],
    [-1230.4,'0,0.0+','1,230.4-'],
    [-1230.4,'0,0.0-','1,230.4-'],
    [1230.4,'0,0.0-','1,230.4'],
    [100.78, '0', '101'],
    [100.28, '0', '100'],
    [1.932,'0.0','1.9'],
    [1.9687,'0','2'],
    [1.9687,'0.0','2.0'],
    [-0.23,'.00','-.23'],
    [-0.23,'(.00)','(.23)'],
    [0.23,'0.00000','0.23000'],
    [0.67,'0.0####','0.67'],
    [3162.63,'0.0##############','3162.63'],
    [1.99,'0.#','2'],
    [1.0501,'0.00#','1.05'],
    [1.005,'0.00','1.01'],
    // leading zero
    [0, '00.0', '00.0'],
    [0.23, '000.##', '000.23'],
    [4, '000', '004'],
    [10, '00000', '00010'],
    [1000, '000,0', '1,000'],
    [1000, '00000,0', '01,000'],
    [1000, '0000000,0', '0,001,000'],
    // abbreviations
    [2000000000,'0.0a','2.0b'],
    [1230974,'0.0a','1.2m'],
    [1460,'0a','1k'],
    [-104000,'0 a','-104 k'],
    [999950,'0.0a','1.0m'],
    [999999999,'0a','1b'],
    // forced abbreviations
    [-5444333222111, '0,0 ak', '-5,444,333,222 k'],
    [5444333222111, '0,0 am', '5,444,333 m'],
    [-5444333222111, '0,0 ab', '-5,444 b'],
    [-5444333222111, '0,0 at', '-5 t'],
    [123456, '0.0# ak', '123.46 k'],
    [150,'0.0 ak','0.2 k'],

    // ====== New tests
    // Fix abbreviation with space
    [1000000000000000, '0.0 a', '1000.0 t'],
    [10000000000000000, '0.0 a', '10000.0 t'],
    [100000000000000000, '0.0 a', '100000.0 t'],
    [1000000000000000000, '0.0 a', '1000000.0 t'],
    // Same case as previous but without space
    [1000000000000000, '0.0a', '1000.0t'],
    [10000000000000000, '0.0a', '10000.0t'],
    [100000000000000000, '0.0a', '100000.0t'],
    [1000000000000000000, '0.0a', '1000000.0t'],
    // <!> Solve following case, no space should be in the formatted string, if abbreviation is not applied.
    //    [10.23, '0.00 a', '10.23'],
    // Result: "1000.0 t"
] as const;

const getBenchmarkResultFrom10000Tests = () => {
    const first50Tests = tests.slice(0, 50);
    const tests10000 = [...Array(200)].reduce(acc => [...acc, ...first50Tests], []) as any[];

    // Numerable
    const start = performance.now();
    tests10000.forEach(([value, pattern, _expectedResult]) => {
        format(value, pattern);
    });
    const end = performance.now();
    const timePerFormat = (end - start) / 10000;

    // numeral
    const start2 = performance.now();
    tests10000.forEach(([value, pattern, _expectedResult]) => {
        numeral(value).format(pattern);
    });
    const end2 = performance.now();
    const timePerFormat2 = (end2 - start2) / 10000;

    return { numerable: timePerFormat, numeral: timePerFormat2 };
};

const Benchmark = (props) => {
    const [numerableResults, setNumerableResults] = useState([]);
    const [numeralResults, setNumeralResults] = useState([]);
    const [innerInterval, setInnerInterval] = useState(null);
    const [firstResult, setFirstResult] = useState<any>({});

    useEffect(() => {
        const firstResult = getBenchmarkResultFrom10000Tests();
        setNumerableResults([firstResult.numerable]);
        setNumeralResults([firstResult.numeral]);
        setFirstResult(firstResult);
    }, []);

    const startTimer = () => {
        clearInterval(innerInterval);
        const interval = setInterval(() => {
            const result = getBenchmarkResultFrom10000Tests();
            setNumerableResults(prev => prev.concat(result.numerable));
            setNumeralResults(prev => prev.concat(result.numeral));
        }, 200);
        setInnerInterval(interval);
    };

    const stopTimer = () => {
        clearInterval(innerInterval);
    };

    const firstResultDiff = firstResult.numerable / firstResult.numeral;

    const numerableAverage = numerableResults.reduce((acc, e) => acc + e, 0) / numerableResults.length;
    const numeralAverage = numeralResults.reduce((acc, e) => acc + e, 0) / numeralResults.length;
    const diff = numerableAverage / numeralAverage;

    const lastsItemsCount = 10;
    const lastsNumerableItems = numerableResults.slice(1).slice(-lastsItemsCount);
    const lastsNumeralItems = numeralResults.slice(1).slice(-lastsItemsCount);
    const lastsNumerableAverage = lastsNumerableItems.reduce((acc, e) => acc + e, 0) / lastsNumerableItems.length;
    const lastsNumeralAverage = lastsNumeralItems.reduce((acc, e) => acc + e, 0) / lastsNumeralItems.length;
    const lastsDiff = lastsNumerableAverage / lastsNumeralAverage;

    return (
        <div className="nmr-d-inline-block">
            <div className="margin-bottom--sm">
                <button className="button button--primary margin-right--sm" onClick={() => startTimer()}>START</button>
                <button className="button button--primary" onClick={() => stopTimer()}>STOP</button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td> </td>
                        <td> First result </td>
                        <td> Average </td>
                        <td> Average (last {lastsItemsCount} results) </td>
                    </tr>
                    <tr>
                        <td> numerable: </td>
                        <td> {numeral(firstResult.numerable).format('0.0000')} ms </td>
                        <td> {numeral(numerableAverage).format('0.0000')} ms </td>
                        <td> {numeral(lastsNumerableAverage).format('0.0000')} ms </td>
                    </tr>
                    <tr>
                        <td> numeral: </td>
                        <td> {numeral(firstResult.numeral).format('0.0000')} ms </td>
                        <td> {numeral(numeralAverage).format('0.0000')} ms </td>
                        <td> {numeral(lastsNumeralAverage).format('0.0000')} ms </td>
                    </tr>
                    <tr style={{ color: diff <= 1 ? 'green' : 'red' }}>
                        <td> diff: </td>
                        <td> {numeral(firstResultDiff).format('0.0000')} </td>
                        <td> {numeral(diff).format('0.0000')} </td>
                        <td> {numeral(lastsDiff).format('0.0000')} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Benchmark;


