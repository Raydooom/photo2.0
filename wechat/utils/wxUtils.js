function wxToast(text) {
  wx.showToast({
    title: text,
    mask: true,
    duration: 1500
  })
}

module.exports = {
  wxToast: wxToast
}