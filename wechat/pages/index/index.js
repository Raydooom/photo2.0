// pages/index/index.js
const {
  severRequest
} = require("../../api/index");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: "",
    kindList: "",
    activeKind: 1,
    articleList: "",
    fixed: false,
    loading: true
  },
  onShow() {
    this.getData();
  },
  getData() {
    // 获取banner数据
    let data = {
      isBanner: true
    };
    severRequest("getBanner", data).then(res => {
      this.setData({
        bannerList: res.data
      })
    })
    // 获取分类列表数据
    severRequest("getKindList").then(res => {
      this.setData({
        kindList: res.data
      })
      this.changeKind();
    })
  },
  // 切换分类时获取分类数据
  changeKind(e) {
    if (e) {
      this.setData({
        activeKind: e.target.dataset.id
      })
    }
    let data = {
      id: this.data.activeKind
    }
    severRequest("getKindArticle", data).then(res => {
      this.setData({
        articleList: res.data,
        loading: false
      })
    })
  },
  // 滚动监听
  onPageScroll(e) {
    if (e.scrollTop < 265) {
      this.setData({
        fixed: false
      })
      wx.setNavigationBarTitle({
        title: "",
      })
    } else {
      wx.setNavigationBarTitle({
        title: "我想学摄影",
      })
      this.setData({
        fixed: true
      })
    }
  },
})