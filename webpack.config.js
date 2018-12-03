const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode : "development" , 
    entry : "./app/main.js",
    output : {
        publicPath : "xuni",
        filename : "bundle.js"
    },
    //配置webpack-dev-server
    devServer: {
        //代理跨域
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    module : {
        rules : [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve : {
        alias : {
            "vue": "vue/dist/vue.runtime.esm.js"
        },
        extensions: ['.js','.vue'],
        mainFiles: ['index']
    }
}