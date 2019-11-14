const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports =
    {
        target: 'node', 
        externals: [nodeExternals()],
        entry: './src/index.js',
        module: 
        {
            rules: [
                //rules for parsing .js or .jsx file
                {
                    
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                    ]
                },
                //rule for parsing .css files
                //keep in mind, will not cover .scss and others
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
        resolve: 
        {
            extensions: ['*', '.js', '.jsx']
        },
        /*
        output, as well as devServer, are used to generate and display
        testing results or general parsing messages via webpack
        output:
        {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'bundle.js'
        },
        */
        plugins: 
        [
            new webpack.HotModuleReplacementPlugin()
        ],
        /*
        devServer:
        {
            contentBase: './dist',
            hot: true
        }
        */
    };