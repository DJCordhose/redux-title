module.exports = function(config) {
    config.set({
        browsers:   ['Chrome'],
        frameworks: ['mocha'],
        reporters:  ['mocha'],

        files: [
            "test/index.js"
        ],
        preprocessors: {
            "test/index.js": ["babel"]
        }
    });
};