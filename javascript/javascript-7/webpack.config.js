const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'autonomous': './src/autonomous.js',
        'builtin': './src/builtin.js',
        'lit-html': './src/lit-html.js',
        'lit-element': './src/lit-element.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
};