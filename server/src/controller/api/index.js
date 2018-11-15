/**
 * 不需要登录的查询接口
 * @public 
 */
const jwt = require('jsonwebtoken');
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
    let token = this.header("token");
    let { id } = this.post();
    const article = await this.model('api/index').getArticle({ id: ['=', id] });
    if (article == 0) {
      this.fail("文章不存在", "查询失败")
    } else {
      // 如果已登录查询该用户是否给该文章点赞
      if (token) {
        const { secret } = this.config('jwt');
        let userId = jwt.verify(token, secret).userId.toString();
        const article = await this.model('api/index').getArticle({ id: id });
        let praiseList = article.praises ? article.praises.split(",") : [];
        if (praiseList.includes(userId)) {
          article.isPraise = true;
        } else {
          article.isPraise = false;
        }
      }
      // 查询文章分类名称
      const kindName = await this.model('api/index').getKindName({ id: article.kind_id });
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
      // 查询每条用户信息
      for (let i in result) {
        var user = await this.model('api/index').getUserInfo({ id: result[i].comment_user_id });
        result[i].userInfo = user[0] || [];
        commentData.push(result[i]);
      }
    }

    this.success(commentData, "获取文章评论成功")
  }

  // 浏览量统计
  async viewCountAction() {
    let { id } = this.post();
    const article = await this.model('api/index').getArticle({ id: id });
    let data = {
      views: article.views + 1
    }
    const result = await this.model('api/index').updateArticle({ id: id }, data);
    if (result == 0) {
      this.fail("浏览量统计失败")
    } else {
      this.success({ views: article.views + 1 }, "浏览量统计成功")
    }
  }

  // 转发统计
  async shareCountAction() {
    let { id } = this.post();
    const article = await this.model('api/index').getArticle({ id: id });
    let data = {
      shares: article.shares + 1
    }
    const result = await this.model('api/index').updateArticle({ id: id }, data);
    this.success({ shares: article.shares + 1 }, "分享统计成功")
  }

  // 获取关于开发者
  async getAboutDeveloperAction() {
    let { key } = this.post();
    const result = await this.model('api/index').getAboutDeveloper({ key: key });
    if (result == 0) {
      this.fail("关于开发者获取失败")
    } else {
      this.success(result, "关于开发者获取成功")
    }
  }

  // 每日精选
  async getDailyListAction() {
    let { page, pageSize } = this.post();
    const result = await this.model('api/index').getDailyList(page, pageSize);
    this.success(result, "获取精选列表成功")
  }

  // 每日精选点赞
  async dailyPraiseAction() {
    let { id, praises } = this.post();
    const result = await this.model('api/index').updateDaily({ id }, { praises });
    this.success(result, "点赞统计成功")
  }
  // 下载统计
  async dailyDownloadAction() {
    let { id, download } = this.post();
    const result = await this.model('api/index').updateDaily({ id }, { download });
    this.success(result, "下载统计成功")
  }
}
