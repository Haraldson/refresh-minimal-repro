const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: `${__dirname}/src/index.js`,

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlPlugin({ template: `${__dirname}/src/index.html` })
    ],

    resolve: {
        modules: [`${__dirname}/src`, 'node_modules'],
        extensions: ['*', '.js', '.jsx']
    },

    stats: 'minimal',
    infrastructureLogging: {
        level: 'warn'
    },

    devServer: {
        host: '0.0.0.0',
        port: 7070,
        firewall: false,
        historyApiFallback: true,
        static: 'dist',
        hot: true
    },

    output: {
        path: `${__dirname}/dist`,
        filename: '[name].[fullhash].bundle.js',
        chunkFilename: '[name].[fullhash].chunk.js',
        chunkFormat: 'commonjs',
        publicPath: '/'
    }
}
