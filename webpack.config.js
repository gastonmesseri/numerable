const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
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
        // new BundleAnalyzerPlugin(),
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        // path: path.join(__dirname, "dist"),
		// filename: "MyLibrary.[name].js",
		library: 'numerable',
		libraryTarget: 'umd',
    },
};
