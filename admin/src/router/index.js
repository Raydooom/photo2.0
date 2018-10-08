import Vue from 'vue'
import Router from 'vue-router'
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const dashBoard = r => require.ensure([], () => r(require('@/pages/dashBoard')), 'dashBoard')
const addArticle = r => require.ensure([], () => r(require('@/pages/addArticle')), 'addArticle')
const articleList = r => require.ensure([], () => r(require('@/pages/articleList')), 'articleList')
const articleView = r => require.ensure([], () => r(require('@/pages/articleView')), 'articleView')




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
      component: dashBoard,
      meta: {
        title: '统计信息'
      }
    },
    {
      path: 'articleList',
      component: articleList,
      meta: {
        title: '文章列表'
      }
    },
    {
      path: 'addArticle',
      component: addArticle,
      meta: {
        title: '添加文章'
      }
    },
    {
      path: 'articleView',
      component: articleView,
      name: 'articleView',
      meta: {
        title: '查看文章'
      }
    }
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
