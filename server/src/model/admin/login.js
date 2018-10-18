module.exports = class extends think.Model {
  async getUser() {
    let model = this.model("admin_user");
    let userList = await model.select();
    return userList;
  }
}