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
        page: this.data.page + 1,
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
        page: this.data.page,
        pageSize: this.data.pageSize
      }
      console.log(this.data.getMore)
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
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: res => {
        console.log(res)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})