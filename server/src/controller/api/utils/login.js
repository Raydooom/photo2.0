export const login = {
  isLogin() {
    if (controller.ctx.state.user && controller.ctx.state.user.name) {
      return true;
    } else {
      return false;
    }
  }
}