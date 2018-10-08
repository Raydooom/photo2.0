<template>
  <div>
    <slot></slot>
    <div class="main-container">
      <el-table :data="articleList" border>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" width="120" sortable align="center"></el-table-column>
        <el-table-column label="封面" width="200" align="center">
          <template slot-scope="scope">
            <img class="cover-img" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column label="标题" width="200" prop="article_title" align="center"></el-table-column>
        <el-table-column label="分类" width="120" sortable prop="kind" align="center"></el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            <div class="content" v-html="scope.row.content"></div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="160" sortable prop="date" align="center"></el-table-column>
        <el-table-column label="浏览" width="120" sortable prop="views" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="preview(scope.row.id)">查看</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="total" :current-page="page" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      page: 1,
      pageSize: 1
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$axios
        .post("/api/articleList", {
          params: {
            pageSize: this.pageSize,
            page: this.page
          }
        })
        .then(res => {
          if (res.data.state == 1) {
            this.total = res.data.length;
            this.articleList = res.data.data;
          } else {
            this.$message.error("列表获取成功！");
          }
        });
    },
    // 翻页
    changePage(e) {
      this.page = e;
      this.getList();
    },
    // 查看
    preview(id) {
      this.$router.push({ path: "articleView", query: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-img {
  height: 100px;
  width: auto;
}
.content {
  height: 90px;
  overflow: hidden;
  img {
    max-height: 100px;
  }
}
.page {
  margin: 10px 0;
}
</style>
