const {
  wxToast,
  wxPromise
} = require("../../utils/wxUtils.js");
const {
  severRequest
} = require("../../api/index");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wallpaperList: "",
    total: 0,
    activeIndex: 0,
    page: 1,
    pageSize: 5,
    addData: "",
    getMore: true,
    loadText: "正在加载",
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },
  getData() {
    let params = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    severRequest("getDailyList", params).then(res => {
      this.setData({
        page: this.data.page,
        wallpaperList: res.data.data,
        total: res.data.data.length,
        activeIndex: res.data.data.length - 1,
        loading: false
      })
    })
  },
  animationFinish(e) {
    // 分步加载
    if (e.detail.current == 0 && this.data.getMore) {
      let params = {
        page: this.data.page + 1,
        pageSize: this.data.pageSize
      }
      severRequest("getDailyList", params).then(res => {
        // 获取数据为空，不再请求
        if (res.data.data.length == 0) {
          this.setData({
            getMore: false,
            loadText: "没有更多了"
          })
        } else {
          this.setData({
            page: this.data.page + 1,
            addData: res.data.data,
            wallpaperList: res.data.data.concat(this.data.wallpaperList),
            activeIndex: res.data.data.length
          })
        }
      })
    }
  },

  downImg(e) {
    let data = {
      id: e.currentTarget.dataset.id,
      download: e.currentTarget.dataset.download + 1
    }
    severRequest("dailyDownload", data).then(res => {
      console.log(res.errmsg)
    })
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            wxToast("保存成功");
          },
          fail: err => {
            wxToast("保存失败");
          }
        })
      }
    })
  },
  // 点赞
  praise(e) {
    let data = {
      id: e.currentTarget.dataset.id,
      praises: e.currentTarget.dataset.praises + 1,
      index: e.currentTarget.dataset.index
    }
    severRequest("dailyPraise", data).then(res => {
      if (res.data == 1) {
        console.log(res.errmsg);
        let praises = `wallpaperList[${data.index}].praises`;
        this.setData({
          [praises]: data.praises
        })
      }
    })
  },
  // 分享
  share(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../wallpaperShare/wallpaperShare?id=' + id,
    })
  }
})