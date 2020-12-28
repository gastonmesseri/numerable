import clsx from 'clsx';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';

import Debug from './debug.component';
import Benchmark from './benchmark.component';
import styles from './tests-container.module.css';
import PlaygroundInputs from './playground-inputs';
import FormatExamplesTable from './format-examples-table.component';

const tests = [
    // [0, null, '0'],
    [0, '0.00', '0.00'],
    [undefined, '0,0.00', ''],
    // [null, null, ''],
    [null, '0.00', ''],
    [NaN, '0.0', ''],
    [1.23,'0,0','1'],
    [10000,'0,0.0000','10,000.0000'],
    [10000.23,'0,0','10,000'],
    [1000.23456789,'0,0.X','1,000.23456789'],
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
    [3162.63,'0.0#######','3162.63'],
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
    [2000000000,'0.0a','2.0B'],
    [1230974,'0.0a','1.2M'],
    [1460,'0a','1K'],
    [-104000,'0 a','-104 K'],
    [999950,'0.0a','1.0M'],
    [999999999,'0a','1B'],
    // forced abbreviations
    [-5444333222111, '0,0 ak', '-5,444,333,222 K'],
    [5444333222111, '0,0 am', '5,444,333 M'],
    [-5444333222111, '0,0 ab', '-5,444 B'],
    [-5444333222111, '0,0 at', '-5 T'],
    [123456, '0.0# ak', '123.46 K'],
    [150,'0.0 ak','0.2 K']
];

const TestsContainer = (_props) => {
    return (
        <div>
            <Debug />

            <div className="margin-bottom--sm">
                <Benchmark />
            </div>

            <div className="margin-bottom--lg text--center">
                <div className="nmr-d-inline-block">
                    <CodeBlock>
                        npm install --save numerable
                        #or
                        yarn add numerable
                    </CodeBlock>
                </div>
            </div>

            <h3> Try me: </h3>

            <div className={clsx('margin-bottom--lg text--center', styles.tryMePlaygroundInputsContainer)}>
                <PlaygroundInputs localeSelector={true} />
            </div>

            <h3> Examples:  </h3>

            <FormatExamplesTable rows={tests} />
        </div>
    );
};

export default TestsContainer;