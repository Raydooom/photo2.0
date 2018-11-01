const {
  severRequest
} = require("../../api/index");
const {
  wxToast
} = require("../../utils/wxUtils.js");
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    articleDetail: "",
    isLogin: true,
    scrollDirection: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    });
  },
  onShow() {
    severRequest("getArticle", {
      id: this.data.id
    }).then(res => {
      this.setData({
        articleDetail: res.data
      })
      let articleContent = res.data.content;
      WxParse.wxParse('article', 'html', articleContent, this, 5);
    })

    severRequest("viewCount", {
      id: this.data.id
    }).then(res => {
      let views = "articleDetail.views";
      this.setData({
        [views]: res.data.views
      })
    })
  },
  // 点赞
  addPraise(e) {
    if (app.globalData.isLogin) {
      let data = {
        id: this.data.id,
      }
      severRequest("addPraise", data).then(res => {
        let praises = "articleDetail.praises";
        let isPraise = "articleDetail.isPraise";
        this.setData({
          [praises]: res.data.praises,
          [isPraise]: res.data.isPraise
        })
        wxToast(res.errmsg);
      })
    } else {
      this.setData({
        isLogin: app.globalData.isLogin
      })
    }

  },
  // 监听页面滚动
  onPageScroll(e) {
    if (e.scrollTop < this.data.scrollTop || e.scrollTop < 300) {
      this.setData({
        scrollDirection: 0
      })
    } else {
      this.setData({
        scrollDirection: 1
      })
    }
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  // 分享统计
  onShareAppMessage(e) {
    severRequest("shareCount", {
      id: this.data.id
    }).then(res => {
      let shares = "articleDetail.shares";
      this.setData({
        [shares]: res.data.shares
      })
    })
  }
})