<template>
  <div>
    <div class="main-container">
      <el-table :data="articleList" border>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" width="120" sortable align="center"></el-table-column>
        <!-- <el-table-column label="封面" width="200" align="center">
          <template slot-scope="scope">
            <img class="cover-img" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column> -->
        <el-table-column label="标题" width="200" prop="article_title" align="center"></el-table-column>
        <el-table-column label="描述" prop="description" align="center"></el-table-column>
        <el-table-column label="分类" width="120" sortable prop="kindName" align="center"></el-table-column>
        <el-table-column label="banner" width="120" sortable prop="home_show" align="center">
          <template slot-scope="scope">
            {{scope.row.home_show ? '是' : '否'}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            <div class="content" v-html="scope.row.content"></div>
          </template>
        </el-table-column> -->
        <el-table-column label="发布时间" width="160" sortable prop="create_date" align="center"></el-table-column>
        <el-table-column label="浏览量" width="120" sortable prop="views" align="center"></el-table-column>
        <el-table-column label="评论数" width="120" sortable prop="comments" align="center"></el-table-column>
        <el-table-column label="点赞数" width="120" sortable prop="praises" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="preview(scope.row.id)">查看</el-button>
            <el-button size="mini" @click="edit(scope.row.id)" type="text">编辑</el-button>
            <el-button size="mini" @click="del(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="total" :current-page="page" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleList, delArticle } from "../api/admin";
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        pageSize: this.pageSize,
        page: this.page
      };
      getArticleList(params).then(res => {
        if (res.errno == 0) {
          this.total = res.data.count;
          this.articleList = res.data.data;
        } else {
          this.$message.error("列表获取失败！");
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
      this.$router.push("preview/" + id);
    },
    edit(id) {
      this.$router.push("edit/" + id);
    },
    del(id) {
      this.$confirm("确定要删除该文章吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delArticle({ id }).then(res => {
            if (res.errno == 0) {
              this.$message.success("删除成功！");
              this.getList();
            } else {
              this.$message.error(res.errmsg);
            }
          });
        })
        .catch(() => {});
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
