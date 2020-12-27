import { NumerableFormatter } from '../../core/types/numerable-formatter';

const timeFormatter: NumerableFormatter = {
    name: 'time',
    regexps: {
        format: /([0-9]{1,2}:[0-9]{2}) *$/,
        unformat: /([0-9]{1,2}:[0-9]{2}) *$/,
    },
    format: (number) => {
        const absoluteValue = Math.abs(number);
        const sign = number < 0 ? '-' : '';
        const hours = Math.floor(absoluteValue / 3600);
        const minutes = Math.floor((absoluteValue - (hours * 3600)) / 60);
        const seconds = Math.round(absoluteValue - (hours * 3600) - (minutes * 60));
        return `${sign}${hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
    },
    unformat: (string: string) => {
        const isNegative = /^ *-/.test(string);
        const stringWithoutSign = string.replace(/^ *-/, '');
        const timeArray = stringWithoutSign.split(':').reverse();

        let seconds = 0;
        seconds += +timeArray[0];
        seconds += +timeArray[1] * 60;
        seconds += (+timeArray[2] || 0) * 3600;

        return isNegative && seconds !== 0 ? -seconds : seconds;
    },
};

export default timeFormatter;
