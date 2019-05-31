const path = require('path')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  /* baseUrl: process.env.NODE_ENV === 'production' ? '/xxx/xxx' : '/', */
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production', // 是否在开发环境下通过eslint-loader在每次保存时lint代码。这个值在@vue/cli-plugin-eslint被安装之后生效
  productionSourceMap: false,
  chainWebpack: config => { // 自动化导入
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  devServer: {
    open: IS_PROD,
    host: '0.0.0.0',
    port: 9898,
    hotOnly: false,
    disableHostCheck: true,
    proxy: IS_PROD ? null : {
      '/wx': {
        target: 'http://10.10.21.61:8081',
        // target: 'http://10.10.100.189:8080',
        // target: 'http://10.10.100.169:8080',
        ws: false,
        changeOrigin: true
      }
    }
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/common.scss')
      ]
    })
}