const fs = require('fs')
const path = require('path')
const props = require('./props.' + process.env.NODE_YT_ENV)
const project = require('./project')

// 移动端
// const px2rem = require('postcss-px2rem')

// const postcss = px2rem({
//   remUnit: 75 //基准大小 baseSize，需要和rem.js中相同
// })

module.exports = {
  publicPath: './', //默认是'',  './'相对路径
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: false,
  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
        // console.log(config)
    } else {
        // 为开发环境修改配置...
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      'root': path.resolve(__dirname, ''),
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'static': path.resolve(__dirname, './static'),
      'components': path.resolve(__dirname, './src/components'),
      'mint-components': 'mint-ui/src'
    }
    config.externals = {
      'vue': 'Vue',
      'moment': 'moment',
      'axios': 'axios',
      'babel-polyfill': 'window',
      'lodash': '_',
      'vue-router': 'VueRouter'
    }
    // 生成props.json文件
    fs.readFile(path.join(__dirname, './props.' + process.env.NODE_YT_ENV + '.json'), 'utf8', (err, data) => {
      if(err) throw err;
      fs.writeFile('props.json', data, 'utf8', (err) => {
          if (err) throw err;
          console.log('props.json: success done!');
      });
    })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        sourceMap: 'inline'
      },
      sass: {
        data: `@import "@/assets/css/variable.scss";`
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {},
    overlay: {
      warnings: false,
      errors: false
    }
  },
  pages: {
    ...project,
    index: {
      // page 的入口
      entry: 'src/views/index/main.js',
      // 全局变量
      props: props,
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: {
      entry: 'src/views/subpage/main.js',
      props: props,
      template: 'public/subpage.html',
      filename: 'subpage.html',
      title: 'Subpage'
    },
    template: {
      entry: 'src/views/template/main.js',
      props: props,
      template: 'public/template.html',
      filename: 'template.html',
      title: 'Template Page'
    }
  }
}
