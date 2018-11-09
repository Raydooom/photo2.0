<template>
  <section>
    <div class="main-container">
      <div class="mobile-view">
        <div class="cover-img"><img :src="articleInfo.cover_img" alt="封面图片"></div>
        <div class="content-wrap">
          <h2>{{articleInfo.article_title}}</h2>
          <div class="time-info">发布时间：{{articleInfo.create_date}} 浏览：{{articleInfo.views}}</div>
          <div class="article-content" v-html="articleInfo.content"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getArticle } from "../api/admin/";
export default {
  data() {
    return {
      articleInfo: ""
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      getArticle({ id: this.$route.params.id }).then(res => {
        if (res.errno == 0) {
          this.articleInfo = res.data;
        } else {
          this.$message.error("文章获取失败！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px 0;
  background: #efefef;
  .cover-img {
    height: 260px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efefef;
  }
  .content-wrap {
    padding: 20px 12px;
  }
  .mobile-view {
    width: 414px;
    height: 736px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin-right: 40px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); // 禁止选中
    * {
      -webkit-user-select: none;
      -moz-user-select: none;
    }
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    h2 {
      font-size: 24px;
      color: #333;
    }
    .time-info {
      font-size: 14px;
      color: #999;
      padding: 10px 0 20px;
    }

    .article-content {
      img {
        display: block;
        max-width: 100%;
      }
    }
  }
}
</style>
