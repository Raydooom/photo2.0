const app = getApp();
const {
  wxToast
} = require("../../utils/wxUtils.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        this.triggerEvent('loginSuccess');
      }
    }
  }
})