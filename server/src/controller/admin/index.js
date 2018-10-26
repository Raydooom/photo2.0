module.exports = class extends think.Controller {

  // 统一登录校验
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
      el.praises = el.praises ? el.praises.split(",").length : "0";
      kindList.forEach(item => {
        if (el.kind_id == item.id) {
          el.kindName = item.name
        }
      })
      list.data.push(el);
    });

    this.success(list, "获取文章列表成功")
  }

  // 获取分类列表
  async getKindListAction() {
    const kindList = await this.model('admin/index').getKindList();
    this.success(kindList, "获取分类列表")
  }

  // 添加文章
  async addArticleAction() {
    let currentTime = new Date();
    let { title, coverUrl, kind, homeShow, content, description } = this.post();
    let data = {
      article_title: title,
      cover_img: coverUrl,
      kind_id: kind,
      home_show: homeShow,
      description: description,
      content: content,
      create_date: think.datetime(currentTime),
      update_date: think.datetime(currentTime)
    };
    const result = await this.model('admin/index').addArticle(data);
    this.success(result, "添加文章成功")
  }

  // 删除文章
  async delArticleAction() {
    let { id } = this.post();
    const result = await this.model('admin/index').delArticle({ id: ['=', id] });
    if (result == 0) {
      this.fail("删除的文章不存在", "删除失败")
    } else {
      this.success(result, "删除文章成功")
    }
  }

  // 更新文章
  async updateArticleAction() {
    let currentTime = new Date();
    let { id, title, coverUrl, kind, homeShow, description, content } = this.post();
    let data = {
      article_title: title,
      cover_img: coverUrl,
      kind_id: kind,
      description: description,
      home_show: homeShow,
      content: content,
      update_date: think.datetime(currentTime)
    };
    const result = await this.model('admin/index').updateArticle({ id: id }, data);
    this.success(result, "更新成功")
  }

  // 根据id获取文章信息
  async getArticleAction() {
    let { id } = this.post();
    const result = await this.model('admin/index').getArticle({ id: ['=', id] });
    if (result == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      this.success(result[0], "获取详情成功")
    }
  }

  // 根据ID获取文章评论
  async getArticleCommentAction() {
    let { id } = this.post();
    const result = await this.model('admin/index').getArticleComment({ article_id: ['=', id] });
    if (result == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      this.success(result, "获取文章评论成功")
    }
  }
}
