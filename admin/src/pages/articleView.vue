<template>
  <section>
    <slot></slot>
    <div class="main-container">
      <div class="mobile-view">
        <h2>{{articleInfo.article_title}}</h2>
        <div class="time-info">发布时间：{{articleInfo.date}} 浏览：{{articleInfo.views}}</div>
        <div class="article-content" v-html="articleInfo.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      articleInfo: null
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$axios
        .post("/api/articleInfo", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.articleInfo = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  padding: 40px 0;
  .mobile-view {
    width: 414px;
    height: 736px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;
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
