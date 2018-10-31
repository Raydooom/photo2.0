function wxToast(text, icon) {
  wx.showToast({
    title: text,
    mask: true,
    icon: icon ? "icon" : "none",
    duration: 1500
  })
}

module.exports = {
  wxToast: wxToast
}