module.exports = class extends think.Model {
  // 获取文章列表
  async getArticleList(page, pageSize) {
    let articleModel = this.model("article_list");
    let articleList = await articleModel.page(page, pageSize).countSelect();
    return articleList;
  }
  // 获取分类列表
  async getKindList() {
    let kindModel = this.model("article_kind_list");
    let kindList = await kindModel.select();
    return kindList;
  }
};
