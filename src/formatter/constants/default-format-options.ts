import en from '../../locale/en';

const DEFAULT_FORMAT_OPTIONS = {
    nullFormat: '',
    nanFormat: undefined,
    zeroFormat: undefined,
    defaultPattern: '0,0.##########',
    locale: en,
    rounding: Math.round,
    type: null,
    scalePercentBy100: true,
};

export default DEFAULT_FORMAT_OPTIONS;
