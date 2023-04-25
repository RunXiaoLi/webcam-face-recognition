const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        https: false,  // 是否https
        port:8888,
        proxy: {
            '/api': {
                target: 'https://stablediffusionapi.com',
                changeOrigin: true, // 是否跨域
                ws: false, // 是否支持 websocket
                secure: false, // 如果是 https 接口，需要配置这个参数
                pathRewrite: { // 可以理解为一个重定向或者重新赋值的功能
                    '^/api': ''
                }
            }
        }
    }
})
