// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from './utils/http'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor' // 编辑器
import './assets/scss/theme.scss' // 主题颜色自定义
import './assets/fonts/iconfont.css' // 字体图标
import 'quill/dist/quill.core.css' // 编辑器css
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Cookie from 'js-cookie'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.prototype.$axios = http

Vue.config.productionTip = false

/* eslint-disable no-new */

// /*登录拦截 */
router.beforeEach((to, from, next) => {
  
  next();
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
