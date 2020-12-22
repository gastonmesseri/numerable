import { NumerableFormatType } from '../core/types/numerable-format-type';

const timeFormat: NumerableFormatType = {
    name: 'time',
    regexps: {
        format: /([0-9]{1,2}:[0-9]{2}) *$/,
        unformat: /([0-9]{1,2}:[0-9]{2}) *$/,
    },
    format: (number) => {
        const resolvedValue = number || 0;
        const hours = Math.floor(resolvedValue / 60 / 60);
        const minutes = Math.floor((resolvedValue - (hours * 60 * 60)) / 60);
        const seconds = Math.round(resolvedValue - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    },
    unformat: (string: string) => {
        const timeArray = string.split(':');
        let seconds = 0;

        if (timeArray.length === 3) {
            // hours
            seconds += +timeArray[0] * 3600;
            // minutes
            seconds += +timeArray[1] * 60;
            // seconds
            seconds += +timeArray[2];
        } else if (timeArray.length === 2) {
            // minutes
            seconds += +timeArray[0] * 60;
            // seconds
            seconds += +timeArray[1];
        }
        return +seconds;
    },
};

export default timeFormat;
