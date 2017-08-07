const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, '../../output');

const webpackConfig = require('./webpack.config');
const entry = webpackConfig.entryArr;

const getIPAdress = function() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

entry.vendor = ['vue', 'vuex', 'vue-router'];
const apiHost = 'common-sit1.fcbox.com';

module.exports = {
    context: path.resolve(__dirname, '../../src'),
    entry: entry,
    output: {
        path: buildPath,
        filename: "[name].js",
		chunkFilename: "[name].js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../templates/www'),
        hot: true,
        inline: true,
        port: 3006,
        host: getIPAdress() || '127.0.0.1',
        proxy: {
            '/user/*': {
                target: 'http://' + apiHost,
                host: apiHost,
                secure: false,
            },
        },
    },
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
                query: {name: "[name].[hash].[ext]"}
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
    ]
};