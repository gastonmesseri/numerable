import clsx from 'clsx';
import React, { useState } from 'react';
// import CodeBlock from '@theme/CodeBlock';
import AutosizeInput from 'react-input-autosize';

// import { format } from './../../../src';
import { format } from 'numerable';
import styles from './playground-inputs.module.css';
// import { zh, hi, enIN, arEG } from './../../../src/locale';
import { zh, hi, enIN, arEG } from 'numerable/locale';

const PlaygroundInputs = (props) => {
    const { defaultPattern, defaultValue, localeSelector, editable = true } = props;
    const [pattern, setPattern] = useState(defaultPattern ?? '0,0.00');
    const [value, setValue] = useState(defaultValue ?? '1234.567');
    const [localeKey, setLocaleKey] = useState('en');

    const resolvedValue = (() => {
        if (value === 'null') return null;
        if (value === 'undefined') return undefined;
        return parseFloat(value);
    })();

    const handleLocaleRadioChange = (ev) => setLocaleKey(ev.target.value);

    const resolvedLocale = { 'en': null, 'en-in': enIN, 'zh': zh, 'hi': hi, 'ar-eg': arEG }[localeKey];
    const localeImportNameMap = { 'en': 'en', 'en-in': 'enIN', 'zh': 'zh', 'hi': 'hi', 'ar-eg': 'arEG' };

    const result = format(resolvedValue, pattern, { locale: resolvedLocale });

    return (
        <div>
            <div className="margin-bottom--md">
                {!!localeSelector && (
                    <div>
                        <input type="radio" value="en" onChange={handleLocaleRadioChange} checked={localeKey === 'en'} /> en
                        <input type="radio" value="en-in" onChange={handleLocaleRadioChange} checked={localeKey === 'en-in'} /> en-IN
                        <input type="radio" value="zh" onChange={handleLocaleRadioChange} checked={localeKey === 'zh'} /> zh
                        <input type="radio" value="hi" onChange={handleLocaleRadioChange} checked={localeKey === 'hi'} /> hi
                        <input type="radio" value="ar-eg" onChange={handleLocaleRadioChange} checked={localeKey === 'ar-eg'} /> ar-eg
                    </div>
                )}
                <div className={styles.playgroundCodeContainer}>
                    <div>
                        <span className={styles.functionNameColor}> formatNumber</span>
                        <span className={styles.neutralCodeColor}>(</span>
                        <AutosizeInput
                            inputClassName={clsx(styles.playgroundInput, styles.numberColor)}
                            value={value}
                            onChange={ev => setValue(ev.target.value)} 
                            minWidth={28}
                            disabled={!editable}
                        />
                        <span className={styles.neutralCodeColor}>,&nbsp;</span>
                        <span className={styles.stringColor}>'</span>
                        <AutosizeInput
                            inputClassName={clsx(styles.playgroundInput, styles.stringColor)}
                            value={pattern}
                            onChange={ev => setPattern(ev.target.value)} 
                            minWidth={28}
                            disabled={!editable}
                        />
                        <span className={styles.stringColor}>'</span>
                        {localeKey !== 'en' && (
                            <span className={styles.neutralCodeColor}>, &#123; locale: {localeImportNameMap[localeKey]} &#125;</span>
                        )}
                        <span className={styles.neutralCodeColor}>);</span>
                    </div>

                    <div>
                        <span className={clsx(styles.commentColor, styles.resultLine)}>
                            // Returns '{result}'
                        </span>
                    </div>
                </div>
            </div>

            {/* <CodeBlock>
                Result: {result}
                Other line
            </CodeBlock> */}
        </div>
    );
};

export default PlaygroundInputs;
