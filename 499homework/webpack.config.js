const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports =
    {
        target: 'node', 
        externals: [nodeExternals()],

        // 1 entry point for bundling
        entry: './src/index.js',
        module: {
            rules: [
                {
                    
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ]
                },
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        // 2 where the output will be sent and saved as
        output:
        {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        // 3
        devServer:
        {
            contentBase: './dist',
            hot: true
        }
    };