import bpsFormatter from './bps';
import timeFormatter from './time';
import bytesFormatter from './bytes';
import ordinalFormatter from './ordinal';
import percentageFormatter from './percentage';
import exponentialFormatter from './exponential';

const BUILT_IN_FORMATTERS = [
    bpsFormatter,
    timeFormatter,
    bytesFormatter,
    ordinalFormatter,
    percentageFormatter,
    exponentialFormatter,
];

export default BUILT_IN_FORMATTERS;
