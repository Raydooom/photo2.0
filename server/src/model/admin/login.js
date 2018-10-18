module.exports = class extends think.Model {
  async getUser() {
    let userList = await this.model('admin_user').select();
    return userList;
  }
}