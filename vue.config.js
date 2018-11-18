
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: {
      '/admin/': {
        target: 'http://localhost:3000',
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        })
      ]
    }
  }
}
