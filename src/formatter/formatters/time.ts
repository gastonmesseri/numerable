import { NumerableFormatter } from '../../core/types/numerable-formatter';

const timeFormatter: NumerableFormatter = {
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
            seconds += +timeArray[0] * 3600;
            seconds += +timeArray[1] * 60;
            seconds += +timeArray[2];
        } else if (timeArray.length === 2) {
            seconds += +timeArray[0] * 60;
            seconds += +timeArray[1];
        }
        return +seconds;
    },
};

export default timeFormatter;
