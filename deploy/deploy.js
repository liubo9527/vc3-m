/*
  npm install --save-dev ali-oss-sync@1.0.7
  {{key}} OSS账号
  {{secret}} OSS密码
  {{host}} 例如：test.oss-cn-hangzhou.aliyuncs.com
  {{pathname}} 例如：cms.test.google.com
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