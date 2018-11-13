<template>
  <div>
    <div class="main-container">
      <el-table :data="articleList" border>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" width="50" sortable align="center"></el-table-column>
        <el-table-column label="文字" width="200" prop="content" align="center"></el-table-column>
        <el-table-column label="来自于" prop="from" align="center"></el-table-column>
        <el-table-column label="显示日期" width="120" sortable align="center">
          <template slot-scope="scoped">
            {{scoped.row.year}}-{{scoped.row.month}}-{{scoped.row.day}}
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="160" sortable prop="create_date" align="center"></el-table-column>
        <el-table-column label="更新时间" width="160" sortable prop="update_date" align="center"></el-table-column>
        <el-table-column label="下载数" width="100" sortable prop="download" align="center"></el-table-column>
        <el-table-column label="点赞数" width="100" sortable prop="praises" align="center"></el-table-column>
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
import { getDailyList, delDaily } from "@/api/admin";
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
      getDailyList(params).then(res => {
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
          delDaily({ id }).then(res => {
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
