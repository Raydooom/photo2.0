/**
 * 需要登录信息的接口
 */
const Auth = require("./auth");

module.exports = class extends Auth {
  /**
   * 个人中心页面接口
   */
  // 获取用户信息
  async getUserInfoAction() {
    let token = this.header("token");
    let userId = await this.verifyUserId(token);
    const userResult = await this.model('api/index').getUser({ id: userId });
    userResult.praise_article = userResult.praise_article ? userResult.praise_article.split(",").length : "0";
    userResult.comment_article = userResult.comment_article ? userResult.comment_article.split(",").length : "0";
    delete userResult.openid;
    this.success(userResult, "用户信息获取成功");
  }

  // 获取用户收藏的文章列表
  async getCollectArticleAction() {
    let token = this.header("token");
    let userId = await this.verifyUserId(token);
    const collectResult = await this.model('api/index').getCollectArticle({ id: userId });
    let praiseArticle = collectResult[0].praise_article ? collectResult[0].praise_article.split(",") : [];
    let collectList = [];
    for (let i in praiseArticle) {
      const article = await this.model('api/index').getArticle({ id: ['=', praiseArticle[i]] });
      collectList.push(article);
    }
    this.success(collectList, "用户收藏的文章");
  }

  // 获取用户评论过的文章列表
  async getCommentArticleAction() {
    let token = this.header("token");
    let userId = await this.verifyUserId(token);
    const collectResult = await this.model('api/index').getUserComment({ id: userId });
    let praiseArticle = collectResult[0].comment_article ? collectResult[0].comment_article.split(",") : [];
    let collectList = [];
    for (let i in praiseArticle) {
      const article = await this.model('api/index').getArticle({ id: ['=', praiseArticle[i]] });
      collectList.push(article);
    }
    this.success(collectList, "用户评论过的文章");
  }

  /**
   * 文章相关接口
   */
  // 点赞统计(收藏)
  async addPraiseAction() {
    let token = this.header("token");
    let { id } = this.post();
    let userId = this.verifyUserId(token).toString();
    // 查询文章列表数据
    const article = await this.model('api/index').getArticle({ id: id });
    let praiseList = article.praises ? article.praises.split(",") : [];
    think.logger.info(praiseList, "已点赞id");
    if (praiseList.includes(userId)) {
      let index = praiseList.indexOf(userId);
      think.logger.info(index, "用户id");
      praiseList.splice(index, 1);
      think.logger.info(praiseList, "取消后");
      this.success({ praises: praiseList.length, isPraise: false }, "取消点赞")
    } else {
      praiseList.unshift(userId);
      this.success({ praises: praiseList.length, isPraise: true }, "点赞成功")
    }
    let data = {
      praises: praiseList.toString()
    }
    // 更新文章表
    const result = await this.model('api/index').updateArticle({ id: id }, data);

    // 查询用户表数据
    const userResult = await this.model('api/index').getUser({ id: userId });
    let praiseArticle = userResult.praise_article ? userResult.praise_article.split(",") : [];
    if (praiseArticle.includes(id)) {
      let index = praiseArticle.indexOf(id);
      praiseArticle.splice(index, 1);
    } else {
      praiseArticle.unshift(id);
    }
    let userData = {
      praise_article: praiseArticle.toString()
    }
    // 更新用户表
    const updateUser = await this.model('api/index').updateUser({ id: userId }, userData);
  }

  // 发布评论
  async addArticleCommentAction() {
    let token = this.header("token");
    let { id, commentText } = this.post();
    let userId = this.verifyUserId(token).toString();
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
      // 更新文章列表评论数量
      await this.model('api/index').updateArticle({ id: id }, data);
      this.success({ commentId: addCommentResult }, "获取文章评论成功")
    }

    // 查询用户表数据
    const userResult = await this.model('api/index').getUser({ id: userId });
    let commentArticle = userResult.comment_article ? userResult.comment_article.split(",") : [];
    if (commentArticle.includes(id)) {
      let index = commentArticle.indexOf(id);
      commentArticle.splice(index);
    } else {
      commentArticle.unshift(id);
    }
    let userData = {
      comment_article: commentArticle.toString()
    }
    // 更新用户表
    const updateUser = await this.model('api/index').updateUser({ id: userId }, userData);
  }
}
