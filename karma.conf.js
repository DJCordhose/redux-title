const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        // TODO: IE/Edge not covered (as I am running on a Mac)
        // browsers: ['Chrome', 'Firefox', 'PhantomJS', 'Safari'],
        // browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['mocha'],

        files: [
            "test/**.karma.js"
        ],
        preprocessors: {
            ["test/**.karma.js"]: ["webpack", "sourcemap"]
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