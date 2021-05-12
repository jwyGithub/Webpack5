const { merge } = require('webpack-merge');
const WebpackConfig = require('./webpack.config.base');
const { DefinePlugin } = require('webpack');
module.exports = merge(WebpackConfig, {
    mode: 'development',
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
});
