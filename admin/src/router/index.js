import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/pages/home')), 'home')
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const dashBoard = r => require.ensure([], () => r(require('@/pages/dashBoard')), 'dashBoard')
const addArticle = r => require.ensure([], () => r(require('@/pages/addArticle')), 'addArticle')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: 'dashBoard',
      children: [
        {
          path: 'dashBoard',
          component: dashBoard
        },
        {
          path: 'addArticle',
          component: addArticle
        },

      ]
    }
  ]
})
