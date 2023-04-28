const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        https: false,  // 是否https
        port:8888,
        proxy: {
            '/api': {
                target: 'http://region-9.seetacloud.com:54421',
                changeOrigin: true, // 是否跨域
                ws: false, // 是否支持 websocket
                pathRewrite: { // 可以理解为一个重定向或者重新赋值的功能
                    '^/api': ''
                }
            }
        }
    }
})
