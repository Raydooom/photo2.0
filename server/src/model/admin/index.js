module.exports = class extends think.Model {
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
  // 发布文章
  async addArticle(data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.add(data);
    return result;
  }
  // 删除文章
  async delArticle(data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(data).delete();
    return result;
  }
  // 更新文章
  async updateArticle(condition, data) {
    let articleModel = this.model("article_list");
    let result = await articleModel.where(condition).update(data);
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
  // 关于开发者内容编辑
  async editAboutDeveloper(condition, data) {
    let model = this.model("about");
    let result = await model.where(condition).update(data);
    return result;
  }
  // 关于开发者内容获取
  async getAboutDeveloper(condition) {
    let model = this.model("about");
    let result = await model.where(condition).find();
    return result;
  }

  // 精选相关
  // 添加
  async addDaily(data) {
    let model = this.model("daily");
    let result = await model.add(data);
    return result;
  }
  // 获取列表
  async getDailyList(page, pageSize) {
    let model = this.model("daily");
    let result = await model.page(page, pageSize).countSelect();
    return result;
  }
  // 删除
  async delDaily(condition) {
    let model = this.model("daily");
    let result = await model.where(condition).delete();
    return result;
  }
  // 获取详情
  async getDaily(condition) {
    let model = this.model("daily");
    let result = await model.where(condition).find();
    return result;
  }
  // 更新
  async updateDaily(condition, data) {
    let articleModel = this.model("daily");
    let result = await articleModel.where(condition).update(data);
    return result;
  }
}
