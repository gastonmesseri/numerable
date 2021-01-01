const fs = require('fs');
const path = require('path');

const DIST_FILES = [
    'package.json',
    'README.md',
    'LICENSE.md',
];

DIST_FILES.forEach((file) => {
    fs.copyFileSync(file, path.join('dist', file));
});
