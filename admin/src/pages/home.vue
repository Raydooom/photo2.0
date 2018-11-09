<template>
  <section class="main">
    <div class="menu">
      <div class="logo">
        我想学摄影
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
        <el-menu-item index="/dashBoard">
          <i class="el-icon-menu"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
        <el-submenu index="/articleList">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/articleList">文章列表</el-menu-item>
            <el-menu-item index="/articleAdd">添加文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/aboutWxApp">
          <i class="el-icon-menu"></i>
          <span slot="title">关于小程序</span>
        </el-menu-item>
        <el-menu-item index="/aboutDeveloper">
          <i class="el-icon-menu"></i>
          <span slot="title">关于开发者</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content-warp">
      <top-bar></top-bar>
      <div class="main-content">
        <transition name="slide-fade" mode="out-in">
          <router-view>
          </router-view>
        </transition>
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
  mounted() {
    // console.log(this.$store);
  },
  computed: {
    routerTitle() {
      return this.$store.state.routerTitle;
    }
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
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  transform: translateX(10px);
  opacity: 0;
}
.main-content {
  padding: 25px 25px;
  h3 {
    font-size: 20px;
    margin: 20px 0;
  }
}
</style>

