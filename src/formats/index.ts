import bpsFormat from './bps';
import timeFormat from './time';
import bytesFormat from './bytes';
import ordinalFormat from './ordinal';
import percentageFormat from './percentage';
import exponentialFormat from './exponential';

const BUILT_IN_FORMATS = [
    bpsFormat,
    timeFormat,
    bytesFormat,
    ordinalFormat,
    percentageFormat,
    exponentialFormat,
];

export default BUILT_IN_FORMATS;
