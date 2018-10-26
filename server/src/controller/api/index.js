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
    let { title, coverUrl, kind, homeShow, content } = this.post();
    let data = {
      article_title: title,
      cover_img: coverUrl,
      kind_id: kind,
      home_show: homeShow,
      content: content,
      create_date: think.datetime(currentTime),
      update_date: think.datetime(currentTime)
    };
    const result = await this.model('admin/index').addArticle(data);
    this.success(result, "添加文章成功")
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

  // 发布评论
  async addArticleCommentAction() {
    let { id, userId, commentText } = this.post();
    let data = {
      article_id: id,
      comment_user_id: userId,
      comment_text: commentText,
      create_date: think.datetime(new Date())
    }
    const addCommentResult = await this.model('admin/index').addArticleComment(data);

    if (addCommentResult == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      const commentListResult = await this.model('admin/index').getArticleComment({ article_id: ['=', id] });
      let data = {
        comments: commentListResult.length
      }
      // 更新评论数量
      await this.model('admin/index').updateArticle({ id: id }, data);
      this.success(addCommentResult, "获取文章评论成功")
    }
  }

  // 浏览量统计
  async viewCountAction() {
    let { id } = this.post();
    const article = await this.model('admin/index').getArticle({ id: id });
    let data = {
      views: article[0].views + 1
    }
    const result = await this.model('admin/index').viewCount({ id: id }, data);
    if (result == 0) {
      this.fail("浏览量统计失败")
    } else {
      this.success({ views: article[0].views + 1 }, "浏览量统计成功")
    }
  }

  // 点赞统计
  async praiseCountAction() {
    let { id, userId } = this.post();
    const article = await this.model('admin/index').getArticle({ id: id });
    let praiseList = article[0].praises ? article[0].praises.split(",") : [];
    if (praiseList.includes(userId)) {
      this.fail("点赞失败，已点过", { praises: praiseList.length })
    } else {
      praiseList.unshift(userId);
      let data = {
        praises: praiseList.toString()
      }
      const result = await this.model('admin/index').praiseCount({ id: id }, data);
      this.success({ praises: praiseList.length }, "点赞成功！")
    }
  }

}
