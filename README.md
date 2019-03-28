# vue-cli-3-for-m

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### project
> project.js
```
具体项目配置请参照 vue.config.js - pages 中的 template
```

### deploy
> deploy.js
```
//依赖hh写的ali-oss-sync包
/*
  npm install --save-dev ali-oss-sync@1.0.7
  {{key}} OSS账号
  {{secret}} OSS密码
  {{host}} 例如：test.oss-cn-hangzhou.aliyuncs.com
  {{pathname}} 例如：cms.test.google.com/todo/
  {{cache}} 默认no-cache
*/

const uri = require('./uri.' + process.env.NODE_YT_ENV)
const pwd = require('./deploy.pwd')
const params = {
  'source': 'dist',
  'target': `oss://${pwd.key}:${pwd.secret}@${uri.host}${uri.pathname}`,
  'headers': {
    'Cache-Control': 'no-cache'
  }
}
require('ali-oss-sync')(params)
```

### publish
```
npm run deploy:alpha //开发部署
npm run deploy:beta  //测试部署
npm run deploy:prod  //正式部署
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
