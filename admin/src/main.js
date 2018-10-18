// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor' // 编辑器
import './assets/scss/theme.scss' // 主题颜色自定义
import './assets/fonts/iconfont.css' // 字体图标
import 'quill/dist/quill.core.css' // 编辑器css
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import Cookie from 'js-cookie'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */

// 
router.beforeEach((to, from, next) => {
  let routerTitle = to.meta.title;
  store.commit("routerTitle", routerTitle);
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
