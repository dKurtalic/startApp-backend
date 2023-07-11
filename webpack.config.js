const path = require('path');

module.exports = {
    mode: 'production', // Set the mode to 'development'
    target: 'node',
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
        },
    },
    externals: {
        'node_modules': 'commonjs node_modules',
    },

};
