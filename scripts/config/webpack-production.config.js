const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
// manifest
const ManifestPlugin = require('webpack-manifest-plugin');
const Clean = require('clean-webpack-plugin');

const pathConfig = require('./path.config');

const path = require('path');
const buildPath = path.resolve(__dirname, '../../output/' + pathConfig.outputPath);

const webpackConfig = require('./webpack.config');
const entry = webpackConfig.entryArr;

entry.vendor = ['vue', 'vuex', 'vue-router'];
const version = '';

const config = {
    entry: entry,
	devtool: 'source-map',
    output: {
        path: buildPath,
        publicPath: pathConfig.publicPath || "/",
        filename: "[name]" + version + ".js",
		chunkFilename: "[name].js",
	    sourceMapFilename: "[name].js.map",
    },
    plugins: [
        new Clean([buildPath]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
	        sourceMap: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, '../templates')),
        // manifest
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
			{
				test:/\.vue$/,
				loader: 'vue-loader'
			},
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: "file-loader",
                query: {name: "[name].[ext]"}
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', "css-loader", "less-loader"]
            },
        ],
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../../src'),
            'fcbox': path.resolve(__dirname, '../../fcbox'),
            'vue': path.resolve(__dirname, '../../node_modules/vue/dist/vue.js')
        }
    },
};

module.exports = config;
