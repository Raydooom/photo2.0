module.exports = class extends think.Controller {
  __before() {
    if (this.ctx.state.user && this.ctx.state.user.name) {
      this.success(this.ctx.state.user)
      console.log(this.ctx.state.user)
    } else {
      this.fail("未登录");
      return false;
    }
  }
  // 获取列表
  async getListAction() {
    let { page, pageSize } = this.post();
    const list = await this.model('admin/index').getList(page, pageSize);
    this.success(list, "获取成功")
  }

  // 添加文章
  async addArticleAction() {
    let { data } = this.post();
    this.success(data, "添加成功")
  }
}