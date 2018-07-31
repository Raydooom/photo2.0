export default {
  // 设置路由对应标题
  routerTitle(state, data) {
    state.routerTitle = data;
  },
  // 上传图片返回的url
  coverUrl(state, data) {
    state.coverUrl = data;
  },
  // 富文本编辑器返回的html内容
  changeContent(state, data) {
    state.publishContent = data;
  }
}
