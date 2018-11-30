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
    id: "",
    daliyData: "",
    windowWidth: "",
    windowHeight: "",
    QrCode: "../../assets/images/QrCode.png",
    loading: true,
    qrCodeShow: true,
    textShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    wxPromise(wx.getSystemInfo).then(res => {
      console.log(res)
      this.setData({
        windowWidth: res.windowWidth * 0.7,
        windowHeight: res.windowHeight * 0.7
      })
      this.getData();
    })
  },
  getData() {
    let id = this.data.id;
    severRequest("getDaily", {
      id
    }).then(res => {
      this.setData({
        daliyData: res.data
      })
      this.createImg();
    })
  },
  // 二维码开关
  qrCodeSelect(e) {
    this.setData({
      qrCodeShow: e.detail.value
    })
    this.createImg();
  },
  // 文字开关
  textSelect(e) {
    this.setData({
      textShow: e.detail.value
    })
    this.createImg();
  },
  // 绘制图片
  createImg() {
    let width = this.data.windowWidth,
      height = this.data.windowHeight,
      margin = 20;

    const ctx = wx.createCanvasContext("canvas");
    let data = this.data.daliyData;

    wxPromise(wx.downloadFile, {
      url: data.img_url,
    }).then(res => {
      // ctx.translate(width * 0.15, 20);
      // ctx.scale(0.7, 0.7);
      // 背景图片
      ctx.drawImage(res.tempFilePath, 0, 0, width, height);

      if (this.data.textShow) {
        // 半透明背景
        const radialGradient = ctx.createLinearGradient(0, height, 0, height - margin * 6);
        radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        radialGradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
        ctx.setFillStyle(radialGradient);
        ctx.fillRect(0, height - margin * 6, width, margin * 6);
        // from 文字
        ctx.setFontSize(10);
        ctx.setFillStyle('#fff');
        ctx.fillText(data.from, margin, height - margin * 1.5);
        // 横线
        ctx.fillRect(margin, height - margin * 2.5, 20, 2);
        // 主要文字
        ctx.setFontSize(16);
        ctx.fillText(data.content, margin, height - margin * 3.2);
        // 年月
        ctx.setFontSize(10);
        ctx.fillText(data.year + '.' + data.month, margin, height - margin * 4.5);
        // 日期
        ctx.setFontSize(40);
        ctx.fillText(data.day, margin - 3, height - margin * 5.3);
      }

      if (this.data.qrCodeShow) {
        // 二维码
        ctx.setFillStyle('#fff');
        ctx.drawImage(this.data.QrCode, margin, margin, 40, 40);
        ctx.setFontSize(12);
        ctx.fillText("我想学摄影", margin + 45, 38);
        ctx.setFontSize(10);
        ctx.fillText("长按识别小程序", margin + 45, 53);
      }
      ctx.draw()
      this.setData({
        loading: false
      })
    }).catch(err => {
      console.log(err, '图片获取失败');
    })
  },

  saveImg() {
    let options = {
      x: 0,
      y: 0,
      fileType: "jpg",
      width: this.data.windowWidth,
      height: this.data.windowHeight,
      destWidth: this.data.windowWidth * 4,
      destHeight: this.data.windowHeight * 4,
      canvasId: 'canvas'
    }
    wxPromise(wx.canvasToTempFilePath, options).then(res => {
      wxPromise(wx.saveImageToPhotosAlbum, {
        filePath: res.tempFilePath
      }).then(res => {
        console.log(res)
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    
  }
})