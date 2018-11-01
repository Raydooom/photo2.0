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
    let result = await articleModel.where(data).find();
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
  
  
  // 关于开发者内容获取
  async getAboutDeveloper(condition) {
    let model = this.model("about");
    let result = await model.where(condition).find();
    return result;
  }

  // 更新文章列表（评价数、点赞数、分享数）
  async updateArticle(condition, data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).update(data);
    return result;
  }

  /**
   * 用户相关
   * @param {*} condition 
   */
  // 创建新用户
  async createUser(data) {
    let userModel = this.model("user");
    let result = await userModel.add(data);
    return result;
  }
  // 根据openid查询用户
  async getUser(condition) {
    let userModel = this.model("user");
    let result = await userModel.where(condition).find();
    return result;
  }
  // 更新用户表
  async updateUser(condition,data) {
    let userModel = this.model("user");
    let result = await userModel.where(condition).update(data);
    return result;
  }
  // 查询用户收藏文章
  async getCollectArticle(condition) {
    let userModel = this.model("user");
    let result = await userModel.where(condition).select();
    return result;
  }
  // 查询用户评论文章
  async getUserComment(condition) {
    let userModel = this.model("user");
    let result = await userModel.where(condition).select();
    return result;
  }
  // 根据用户ID获取用户信息
  async getUserInfo(condition) {
    let userModel = this.model("user");
    let result = await userModel.where(condition).select();
    return result;
  }
};
