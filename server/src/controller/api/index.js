module.exports = class extends think.Controller {
  // 获取banner
  async getBannerAction() {
    let { isBanner } = this.post();
    let condition = {
      home_show: isBanner ? "1" : "0"
    }
    const articleList = await this.model('api/index').getBannerList(condition);
    this.success(articleList, "获取banner列表成功")
  }
  // 获取文章列表
  async getArticleListAction() {
    let { page, pageSize } = this.post();
    const articleList = await this.model('api/index').getArticleList(page, pageSize);
    const kindList = await this.model('api/index').getKindList();
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
    const kindList = await this.model('api/index').getKindList();
    this.success(kindList, "获取分类列表")
  }

  // 根据分类ID获取文章
  async getKindArticleAction() {
    let { id } = this.post();
    const kindList = await this.model('api/index').getKindArticle({ kind_id: ['=', id] });
    this.success(kindList, "获取分类下文章成功")
  }

  // 根据id获取文章信息
  async getArticleAction() {
    let { id } = this.post();
    const article = await this.model('api/index').getArticle({ id: ['=', id] });
    const kindName = await this.model('api/index').getKindName({ id: article.kind_id });
    if (article == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      article.praises = article.praises ? article.praises.split(",").length : "0";
      article.kindName = kindName[0].name;
      this.success(article, "获取详情成功")
    }
  }

  // 根据ID获取文章评论
  async getArticleCommentAction() {
    let { id } = this.post();
    let commentData = [];
    const result = await this.model('api/index').getArticleComment({ article_id: ['=', id] });
    if (result == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      // 查询用户信息
      for (let i in result) {
        var user = await this.model('api/index').getUserInfo({ id: result[i].comment_user_id });
        result[i].userInfo = user[0] || [];
        commentData.push(result[i]);
      }
    }

    this.success(commentData, "获取文章评论成功")
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
    const addCommentResult = await this.model('api/index').addArticleComment(data);

    if (addCommentResult == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      const commentListResult = await this.model('api/index').getArticleComment({ article_id: ['=', id] });
      let data = {
        comments: commentListResult.length
      }
      // 更新评论数量
      await this.model('api/index').updateArticle({ id: id }, data);
      this.success(addCommentResult, "获取文章评论成功")
    }
  }

  // 浏览量统计
  async viewCountAction() {
    let { id } = this.post();
    const article = await this.model('api/index').getArticle({ id: id });
    let data = {
      views: article[0].views + 1
    }
    const result = await this.model('api/index').viewCount({ id: id }, data);
    if (result == 0) {
      this.fail("浏览量统计失败")
    } else {
      this.success({ views: article[0].views + 1 }, "浏览量统计成功")
    }
  }

  // 点赞统计
  async praiseCountAction() {
    let { id, userId } = this.post();
    const article = await this.model('api/index').getArticle({ id: id });
    let praiseList = article[0].praises ? article[0].praises.split(",") : [];
    if (praiseList.includes(userId)) {
      this.fail("点赞失败，已点过", { praises: praiseList.length })
    } else {
      praiseList.unshift(userId);
      let data = {
        praises: praiseList.toString()
      }
      const result = await this.model('api/index').praiseCount({ id: id }, data);
      this.success({ praises: praiseList.length }, "点赞成功！")
    }
  }

}
