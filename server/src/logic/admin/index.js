module.exports = class extends think.Logic {
  indexAction() {
    this.rules = {
      page: {
        defalut: 1,
        string: true,
        trim: true,
      },
      pageSize: {
        defalut: 10,
        string: true,
        trim: true,
      }
    }
  }
}
