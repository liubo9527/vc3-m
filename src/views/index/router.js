import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: r => { require(['./index'], r) },
      meta: { title: '一级页面' }
    },
    {
      path: '/login',
      name: 'login',
      component: r => { require(['./login/login'], r) },
      meta: { title: '登录页面' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

export default router