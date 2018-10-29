module.exports = class extends think.Model {
  // 获取banner
  async getBannerList(condition) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).select();
    return result;
  }
  // 获取文章列表
  async getArticleList(page, pageSize) {
    let articleModel = this.model("article_list");
    let result = await articleModel.page(page, pageSize).countSelect();
    return result;
  }
  // 获取分类列表
  async getKindList() {
    let kindModel = this.model("article_kind_list");
    let result = await kindModel.select();
    return result;
  }
  // 根据ID获取分类
  async getKindName(condition) {
    let kindModel = this.model("article_kind_list");
    let result = await kindModel.where(condition).select();
    return result;
  }
  // 根据ID获取文章列表
  async getKindArticle(condition) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).select();
    return result;
  }
  // 根据ID获取文章
  async getArticle(data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(data).select();
    return result;
  }
  // 根据ID获取文章评论
  async getArticleComment(data) {
    let commentModel = this.model("article_comment");
    let result = await commentModel.where(data).select();
    return result;
  }
  // 添加评论
  async addArticleComment(data) {
    let commentModel = this.model("article_comment");
    let result = await commentModel.add(data);
    return result;
  }
  // 浏览量统计
  async viewCount(condition, data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).update(data);
    return result;
  }
  // 点赞
  async praiseCount(condition, data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).update(data);
    return result;
  }
  // 根据用户ID获取用户信息
  async getUserInfo(condition){
    let userModel = this.model("user");
    let result = await userModel.where(condition).select();
    return result;
  }

};
