import Vue from 'vue'

Vue.config.productionTip = false

// 状态
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  }
})

// 路由
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/list',
      name: 'article/list',
      component: r => { require(['./article/list'], r) },
      meta: { title: '文章列表' }
    },
    {
      path: '/detial',
      name: 'article/detial',
      component: r => { require(['./article/detial'], r) },
      meta: { title: '文章详情' }
    }
  ]
})

import App from '../App.vue'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
