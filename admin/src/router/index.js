import Vue from 'vue'
import Router from 'vue-router'

// webpack 按需加载页面模块
const test = () => import("@/pages/test");
const home = () => import("@/pages/home");
const login = () => import("@/pages/login");
const dashBoard = () => import("@/pages/dashBoard");
const articleAdd = () => import("@/pages/articleAdd");
const articleEdit = () => import("@/pages/articleEdit");
const articleList = () => import("@/pages/articleList");
const articleView = () => import("@/pages/articleView");

const aboutDeveloper = () => import("@/pages/aboutDeveloper");
const aboutWxApp = () => import("@/pages/aboutWxApp");

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
        title: '数据统计'
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
      path: 'articleAdd',
      component: articleAdd,
      meta: {
        title: '添加文章'
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
      component: aboutDeveloper,
      meta: {
        title: '关于开发者'
      }
    },
    {
      path: '/aboutWxApp',
      name: aboutWxApp,
      component: aboutWxApp,
      meta: {
        title: '关于小程序'
      }
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
