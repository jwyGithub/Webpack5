const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OS = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: OS.cpus().length });

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: ['@babel/polyfill', resolve(__dirname, '../src/index.js')],
    output: {
        publicPath: './',
        filename: '[name].[contenthash:8].js',
        path: resolve(__dirname, '../dist')
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            '@views': resolve(__dirname, '../src/views')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 设置页面的标题 即在index.html中的 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Webpack App',
            // 模板路径
            template: resolve(__dirname, '../public/index.html'),
            // 文件名称  默认是index.html
            filename: 'index.html',
            // favicon的路径
            // favicon: '',
            // 在index.html中添加meta标签  以对象的形式   key是name  值是content
            // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
            // 压缩  默认如果是production或者true，则压缩，其它情况下不压缩
            minify: isProd,
            // 缓存  默认为true
            cache: true,
            // 显示错误信息在index.html页面，默认为true
            showErrors: true,
            // 自动注入js文件 css文件 默认为true
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name]_[contenthash:8].css'
        }),
        new HappyPack({
            id: 'happyBabel',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-async-to-generator', '@babel/plugin-syntax-top-level-await'],
                        cacheDirectory: true
                    }
                }
            ],
            threadPool: happyThreadPool
        })
    ],
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'imgs/[name].[contenthash:8].[ext]'
                                }
                            }
                        }
                    }
                ],
                type: 'javascript/auto'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
                type: 'asset/inline'
            },
            {
                test: /\.(html)$/i,
                use: {
                    loader: 'html-loader'
                },
                include: /src/
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: 'happypack/loader?id=happyBabel'
            },
            {
                test: /\.(css|less)$/i,
                exclude: /node_modules/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: !isProd, importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: !isProd }
                    },
                    {
                        loader: 'less-loader',
                        options: { sourceMap: !isProd }
                    }
                ]
            }
        ]
    }
};
