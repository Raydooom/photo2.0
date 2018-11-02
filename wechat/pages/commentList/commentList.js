const {
  severRequest
} = require("../../api/index");
const {
  wxToast
} = require("../../utils/wxUtils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: "",
    commentList: "",
    active: '',
    loading: true,
    focus: false,
    placeHolder: '请输入评论内容',
    msg: '',
    isReply: false,
    replyCommentId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title + '评论',
    })
    this.setData({
      articleId: options.id
    })
    this.getComments();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getComments();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 获取评论列表
   */
  getComments: function() {
    // 获取评论数据
    severRequest("getArticleComment", {
      id: this.data.articleId
    }).then(res => {
      this.setData({
        commentList: res.data,
        loading: false
      })
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 评论点赞
   */
  commentPraise: function(e) {
    let data = e.currentTarget.dataset;
    let that = this;
    wx.request({
      url: HOST + '/wechat/specialCommentPraise',
      data: {
        id: data.commentId,
        praise: data.praise + 1
      },
      success: (res) => {
        that.getComments();
      }
    })
  },
  /**
   * 弹出评论框
   */
  comment: function() {
    this.setData({
      active: 'active',
      focus: true,
      msg: '',
      placeHolder: '请输入评论内容',
      isReply: false
    })
  },
  /**
   * 失去焦点
   */
  inputBlur: function() {
    this.setData({
      focus: false,
    })
  },
  /**
   * 弹出回复框
   */
  reply: function(e) {
    let commentId = e.currentTarget.dataset.commentId;
    let user = e.currentTarget.dataset.user;
    if (this.data.focus) {
      this.setData({
        active: 'active',
        focus: false,
      })
    } else {
      this.setData({
        replyCommentId: commentId,
        active: 'active',
        focus: true,
        placeHolder: '回复 ' + user + ' :',
        isReply: true,
        msg: ''
      })
    }

  },
  /**
   * 提交评论
   */
  sendComment(e) {
    let text = e.detail.value;
    if (text.trim() == "") {
      wxToast("请输入评论内容");
      return false;
    }

    // 评论内容
    if (!this.data.isReply) {
      let data = {
        id: this.data.articleId,
        commentText: text
      }
      severRequest("addArticleComment", data).then(res => {
        this.getComments();
        this.setData({
          msg: '',
          active: '',
        })
      })
    } else {
      // 回复评论
      wx.request({
        url: HOST + '/wechat/commentSpecialReply',
        data: {
          commentId: that.data.replyCommentId,
          userId: that.data.userId,
          text: text
        },
        success: (res => {
          that.getComments();
          that.setData({
            msg: '',
            active: '',
            placeHolder: '请输入评论内容',
            isReply: false
          })
          console.log(res);
        })
      })
    }

  },
})