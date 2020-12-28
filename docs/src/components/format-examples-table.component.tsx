import clsx from 'clsx';
import React from 'react';
import numeral from 'numeral';

// import { format } from '../../../src/index';
import { format } from 'numerable';
import styles from './format-examples-table.module.css';

interface FormatExamplesTableProps {
    rows: any[];
}

const FormatExamplesTable: React.FC<FormatExamplesTableProps> = (props) => {
    const { rows = [] } = props;
    return (
        <div>
            {/* <ReactTooltip
                id='row-tooltip'
                place="right"
                effect="solid"
                className={styles.examplesTooltip}
                getContent={(pattern) => {
                    return (
                        <div>
                            <div>
                                <b>Pattern description</b>
                            </div>
                            {pattern === '0' && (
                                <div>
                                    If the pattern only contains "0", only the integer part of the number will be shown
                                </div>
                            )}
                            {/,/.test(pattern) && (
                                <div>
                                    "," defines that the thousands separators should be shown in case it is needed.
                                </div>
                            )}
                            {/\.0|\.]0/.test(pattern) && (
                                <div>
                                    "0" after the dot defines that a number at that position should always be shown.
                                </div>
                            )}
                            {/\#/.test(pattern) && (
                                <div>
                                    "#" defines that a number at that position should be shown if it exists.
                                </div>
                            )}
                            {/X/.test(pattern) && (
                                <div>
                                    "X" defines that all decimal places should be shown if they exist.
                                </div>
                            )}
                        </div>
                    );
                }}
            /> */}

            <table className={clsx(styles.testsTable)}>
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Pattern </th>
                        <th> Result </th>
                        {/* <th> Expected Result </th> */}
                        {/* <th> Numeral Result </th> */}
                    </tr>
                </thead>

                <tbody>
                    {rows.map(([value, pattern, expectedResult], testIndex) => {
                        const result = format(value, pattern);
                        const numeralResult = numeral(value).format(pattern);

                        return (
                            <tr key={testIndex} data-for="row-tooltip" data-tip={pattern} className={clsx(styles.row)}>
                                {/* Value */}
                                <td
                                    className={clsx(styles.numberCell, { 
                                        [styles.nilValue]: typeof value !== 'number' || isNaN(value),
                                    })}
                                >
                                    {'' + value}
                                </td>

                                {/* Pattern */}
                                <td
                                    className={clsx(styles.patternText, {
                                        [styles.nilValue]: typeof pattern !== 'string',
                                    })}
                                >
                                    {typeof pattern === 'string'
                                        ? `"${pattern}"`
                                        : '' + pattern}
                                </td>

                                {/* Result */}
                                <td className={clsx(styles.resultCell)}> 
                                    "{result}" 
                                </td>

                                {/* Expected result */}
                                {/* <td style={{ color: expectedResult !== result ? 'red' : null }}> 
                                    "{expectedResult}"
                                </td> */}

                                {/* Numeral result */}
                                {/* <td className={clsx(styles.numeralText)}>
                                    {numeralResult}
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default FormatExamplesTable;
