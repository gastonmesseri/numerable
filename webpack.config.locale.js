const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const localeEntryPointsMap = glob.sync('./src/locale/**.ts').reduce((acc, path) => {
    const entry = path.replace('.ts', '').replace('./src/locale/', '');
    acc[entry] = path;
    return acc;
}, {});

module.exports = {
    mode: 'production',
    entry: localeEntryPointsMap,
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.build.json'
                    },
                }],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'locale'),
		// libraryTarget: 'this',
		libraryTarget: 'commonjs',
    },
    optimization: {
        minimize: false,
    },
};
