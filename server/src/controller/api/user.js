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
    delete userResult.openid;
    this.success(userResult, "用户信息获取成功");
  }

  // 获取用户发布的文章列表
  async getUserCollectAction() {
    let token = this.header("token");
    let openid = await this.verifyOpenid(token);
    const collectResult = await this.model('api/index').getUserCollect({ openid: openid });
    console.log(collectResult)
    let praiseArticle = collectResult[0].praise_article.split(",");
    let collectList = [];
    for (let i in praiseArticle) {
      const article = await this.model('api/index').getArticle({ id: ['=', praiseArticle[i]] });
      console.log(article)
      collectList.push(article);
    }
    this.success(collectList, "收藏列表");
  }



  // 发布评论
  async addArticleCommentAction() {
    if (!login.isLogin()) {
      this.fail("未登录");
      return;
    }
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
  async praiseCountAction() {
    if (!login.isLogin()) {
      this.fail("未登录");
      return;
    }
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
