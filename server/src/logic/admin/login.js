module.exports = class extends think.Logic {
  indexAction() {
    this.rules = {
      account: {
        string: true,
        trim: true,
        method: "post"
      },
      password: {
        string: true,
        trim: true,
        method: "post"
      }
    }
  }
}
