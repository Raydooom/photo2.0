// pages/wallpaper/wallpaper.js
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      total: this.data.wallpaperList.length
    })
  },
  animationFinish(e) {
    if (e.detail.current == this.data.total - 1) {
      this.setData({
        wallpaperList: this.data.wallpaperList.concat(this.data.wallpaperList)
      })
      this.setData({
        total: this.data.wallpaperList.length
      })
    }
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