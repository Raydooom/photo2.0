<template>
  <section class="main">
    <div class="menu">
      <div class="logo">
        我想学摄影
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
        <el-menu-item index="/dashBoard">
          <i class="el-icon-menu"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">文章</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content-warp">
      <top-bar></top-bar>
      <div class="main-content">
        <router-view>
          <h3>栏目标题</h3>
        </router-view>
      </div>
    </div>
  </section>
</template>
<script>
import topBar from "../components/topBar";

export default {
  components: {
    topBar
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  padding-left: 240px;
  .menu {
    position: fixed;
    left: 0;
    width: 240px;
    height: 100%;
    background: #fff;
    .el-menu-vertical-demo {
      border-right: none;
      box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.05);
    }
  }
}
.logo {
  color: #2d3b48;
  font-weight: bold;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.main-content {
  padding: 0 25px;
  h3 {
    font-size: 20px;
    margin: 20px 0;
  }
}
</style>

