import { login } from "./utils/login";
module.exports = class extends think.Controller {
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

  // 点赞统计
  async praiseCountAction() {
    if (!login.isLogin()) {
      this.fail("未登录");
      return;
    }
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
