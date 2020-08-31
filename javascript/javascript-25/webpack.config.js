module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'index.js'
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    mode: 'production',
};
