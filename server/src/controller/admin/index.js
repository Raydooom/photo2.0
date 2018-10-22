module.exports = class extends think.Controller {

  // 同意登录校验
  __before() {
    if (this.ctx.state.user && this.ctx.state.user.name) {
      // this.success(this.ctx.state.user)
    } else {
      this.fail("未登录");
      return false;
    }
  }

  // 获取文章列表
  async getArticleListAction() {
    let { page, pageSize } = this.post();
    const articleList = await this.model('admin/index').getArticleList(page, pageSize);
    const kindList = await this.model('admin/index').getKindList();

    // 分类数据组装
    let list = {
      count: articleList.count,
      totalPages: articleList.totalPages,
      pageSize: articleList.pageSize,
      currentPage: articleList.currentPage,
      data: []
    };
    articleList.data.forEach(el => {
      kindList.forEach(item => {
        if (el.kind_id == item.id) {
          el.kindName = item.name
        }
      })
      list.data.push(el);
    });

    this.success(list, "获取成功")
  }

  // 获取分类列表
  async getKindListAction() {
    const kindList = await this.model('admin/index').getKindList();
    this.success(kindList, "获取分类列表")
  }

  // 添加文章
  async addArticleAction() {
    let data = this.post();
    console.log(data)
    const result = await this.model('admin/index').addArticle();
    this.success(result, "添加成功")
  }


}