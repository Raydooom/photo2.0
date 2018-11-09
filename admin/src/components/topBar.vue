<template>
  <header>
    <h4>{{title}}</h4>
    <div class="user-info">
      <span class="msg-btn">
        <i class="el-icon-bell"></i>
        <i class="msg-num">123</i>
      </span>
      <span class="logout">
        <el-button type="primary" round icon="el-icon-news" @click="logout">退出</el-button>
      </span>
    </div>
  </header>
</template>

<script>
import { logout } from "@/api/admin";
export default {
  data() {
    return {};
  },
  computed: {
    title() {
      return this.$store.state.routerTitle;
    }
  },
  methods: {
    logout() {
      logout().then(res => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  background: $mainColor;
  h4 {
    color: #fff;
    line-height: 70px;
    font-size: 20px;
  }
  .user-info {
    text-align: right;
    .msg-btn {
      cursor: pointer;
      margin-top: 20px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      .msg-num {
        position: absolute;
        top: -8px;
        left: 40%;
        background: $red;
        border-radius: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 14px;
        height: 14px;
        padding: 0 4px;
      }
      .el-icon-bell {
        font-size: 20px;
        color: #fff;
      }
    }
    .logout {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
      margin-top: 15px;
    }
  }
}
</style>
