const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { info, getLocalHost } = require('../config/gitInfo');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: resolve(__dirname, '../'),
        open: true,
        compress: true,
        hot: true,
        host: getLocalHost().publicNet,
        port: getLocalHost().port,
        publicPath: '/',
        stats: 'errors-warnings',
        quiet: true
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: info()
            }
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
});
