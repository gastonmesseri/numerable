import bpsFormatter from '../formatters/bps';
import timeFormatter from '../formatters/time';
import bytesFormatter from '../formatters/bytes';
import ordinalFormatter from '../formatters/ordinal';
import currencyFormatter from '../formatters/currency';
import percentageFormatter from '../formatters/percentage';
import exponentialFormatter from '../formatters/exponential';

const BUILT_IN_FORMATTERS = [
    percentageFormatter,
    currencyFormatter,
    ordinalFormatter,
    timeFormatter,
    bytesFormatter,
    exponentialFormatter,
    bpsFormatter,
];

export default BUILT_IN_FORMATTERS;
