module.exports = class extends think.Controller {
  async indexAction() {
    if (await this.cache("articleList")) {
      this.success(await this.cache("articleList"), "获取banner列表成功")
    } else {
      let condition = {
        home_show: "1"
      }
      const articleList = await this.model('api/index').getBannerList(condition);
      this.cache("articleList", articleList);
      this.success(articleList, "获取banner列表成功")
    }

  }
}