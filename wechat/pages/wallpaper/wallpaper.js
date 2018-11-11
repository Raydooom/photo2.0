const {
  wxToast,
  wxPromise
} = require("../../utils/wxUtils.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wallpaperList: [{
        id: 1,
        url: "https://server.raydom.wang/static/uploadImg/5oyo4cnyx4.jpg",
        day: "13",
        month: "2018.10",
        title: "立冬",
        praises: "20",
        text: "中国民间以立冬为冬季之始，立冬期间，有需进补以度严冬的食俗。"
      },
      {
        id: 2,
        url: "https://server.raydom.wang/static/uploadImg/gcafisukxvb.jpg",
        day: "12",
        month: "2018.10",
        title: "立冬",
        praises: "20",
        text: "中国民间以立冬为冬季之始，立冬期间，有需进补以度严冬的食俗。"
      }, {
        id: 3,
        url: "https://server.raydom.wang/static/uploadImg/o6hou4omkyd.jpg",
        day: "11",
        month: "2018.10",
        title: "立冬",
        praises: "20",
        text: "中国民间以立冬为冬季之始，立冬期间，有需进补以度严冬的食俗。"
      }
    ],
    total: 0,
    activeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      total: this.data.wallpaperList.length,
      activeIndex: this.data.wallpaperList.length - 1
    })
  },
  animationFinish(e) {
    if (e.detail.current == 0) {
      let newArr = this.data.wallpaperList;
      let data = [];
      for (let i = newArr.length - 1; i >= 0; i--) {
        data.unshift(this.data.wallpaperList[i]);
      }
      this.setData({
        activeIndex: newArr.length,
        wallpaperList: data
      })
      this.setData({
        total: this.data.wallpaperList.length
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})