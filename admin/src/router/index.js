import Vue from 'vue'
import Router from 'vue-router'
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const dashBoard = r => require.ensure([], () => r(require('@/pages/dashBoard')), 'dashBoard')
const addArticle = r => require.ensure([], () => r(require('@/pages/addArticle')), 'addArticle')
const articleList = r => require.ensure([], () => r(require('@/pages/articleList')), 'articleList')
const errorPage = r => require.ensure([], () => r(require('@/pages/errorPage')), 'errorPage')
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: 'dashBoard',
      children: [{
          path: 'dashBoard',
          component: dashBoard
        },
        {
          path: 'articleList',
          component: articleList
        },
        {
          path: 'addArticle',
          component: addArticle
        },

      ]
    }, {
      path: '/test',
      name: test,
      component: test
    }, {
      path: '*',
      name: errorPage,
      component: errorPage
    }
  ]
})
