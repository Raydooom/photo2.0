module.exports = class extends think.Model {
  async getList(page,pageSize) {
    let user = await this.model("admin_user").select();
    return user;
  }
};
