const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        // TODO: IE not covered and safari fails randomly
        //browsers: ['Chrome', 'Firefox', 'PhantomJS', 'Safari'],
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['mocha'],

        files: [
            "test/index.js"
        ],
        preprocessors: {
            ["test/index.js"]: ["webpack", "sourcemap"]
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },

        webpackMiddleware: {
            noInfo: true
        }
    });
};