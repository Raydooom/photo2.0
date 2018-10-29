export const login = {
  isLogin() {
    console.log(this.cookie("jwt-token"))
    // if (controller.ctx.state.user && controller.ctx.state.user.name) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}