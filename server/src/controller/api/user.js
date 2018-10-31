/**
 * 需要登录信息的接口
 */
const Auth = require("./auth");

module.exports = class extends Auth {

  // 获取用户信息
  async getUserInfoAction() {
    let token = this.header("token");
    let openid = await this.verifyOpenid(token);
    const userResult = await this.model('api/index').getUser({ openid: openid });
    userResult.praise_article = userResult.praise_article ? userResult.praise_article.split(",").length : "0";
    userResult.comment_article = userResult.comment_article ? userResult.comment_article.split(",").length : "0";
    delete userResult.openid;
    this.success(userResult, "用户信息获取成功");
  }

  // 获取用户收藏的文章列表
  async getCollectArticleAction() {
    let token = this.header("token");
    let openid = await this.verifyOpenid(token);
    const collectResult = await this.model('api/index').getCollectArticle({ openid: openid });
    let praiseArticle = collectResult[0].praise_article ? collectResult[0].praise_article.split(",") : [];
    let collectList = [];
    for (let i in praiseArticle) {
      const article = await this.model('api/index').getArticle({ id: ['=', praiseArticle[i]] });
      collectList.push(article);
    }
    this.success(collectList, "收藏文章");
  }

  // 获取用户评论过的文章列表
  async getCommentArticleAction() {
    let token = this.header("token");
    let openid = await this.verifyOpenid(token);
    const collectResult = await this.model('api/index').getUserComment({ openid: openid });
    let praiseArticle = collectResult[0].comment_article ? collectResult[0].comment_article.split(",") : [];
    console.log(praiseArticle)
    let collectList = [];
    for (let i in praiseArticle) {
      const article = await this.model('api/index').getArticle({ id: ['=', praiseArticle[i]] });
      console.log(article)
      collectList.push(article);
    }
    this.success(collectList, "评论文章");
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

  // 点赞统计
  async addPraiseAction() {
    let token = this.header("token");
    let { id } = this.post();
    let userId = this.verifyUserId(token).toString();
    const article = await this.model('api/index').getArticle({ id: id });
    let praiseList = article.praises ? article.praises.split(",") : [];
    if (praiseList.includes(userId)) {
      let index = praiseList.indexOf(userId);
      praiseList.splice(index);
      this.success({ praises: praiseList.length, isPraise: false }, "取消点赞")
    } else {
      praiseList.unshift(userId);
      this.success({ praises: praiseList.length, isPraise: true }, "点赞成功")
    }
    let data = {
      praises: praiseList.toString()
    }
    const result = await this.model('api/index').addPraise({ id: id }, data);
  }
}
