import Vue from 'vue'
import Router from 'vue-router'
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test')
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const dashBoard = r => require.ensure([], () => r(require('@/pages/dashBoard')), 'dashBoard')
const addArticle = r => require.ensure([], () => r(require('@/pages/articleAdd')), 'articleAdd')
const articleEdit = r => require.ensure([], () => r(require('@/pages/articleEdit')), 'articleEdit')
const articleList = r => require.ensure([], () => r(require('@/pages/articleList')), 'articleList')
const articleView = r => require.ensure([], () => r(require('@/pages/articleView')), 'articleView')

const aboutDeveloper = r => require.ensure([], () => r(require('@/pages/aboutDeveloper')), "aboutDeveloper")
const aboutWxApp = r => require.ensure([], () => r(require('@/pages/aboutWxApp')), "aboutWxApp")
const choicenessList = () => import("@/pages/choiceness/list");
const choicenessAdd = () => import("@/pages/choiceness/add");

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
      path: 'choicenessList',
      component: choicenessList,
      meta: {
        title: '精选壁纸'
      }
    },
    {
      path: 'choicenessAdd',
      component: choicenessAdd,
      meta: {
        title: '添加壁纸'
      }
    },
    {
      path: 'preview/:id',
      component: articleView,
      name: 'articleView',
      meta: {
        title: '预览文章'
      }
    }, {
      path: 'edit/:id',
      component: articleEdit,
      name: 'edit',
      meta: {
        title: '编辑文章'
      }
    },
    {
      path: '/aboutDeveloper',
      name: aboutDeveloper,
      component: aboutDeveloper
    },
    {
      path: '/aboutWxApp',
      name: aboutWxApp,
      component: aboutWxApp
    }
    ]
  },
  {
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
