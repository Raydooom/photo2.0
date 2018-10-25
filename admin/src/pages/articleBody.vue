<template>
  <section>
    <slot></slot>
    <div class="main-container">
      <el-form ref="form" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入内容" clearable maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面图片">
              <upload @upLoadImg="getCoverUrl" :imgUrl="formData.coverUrl"></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择分类" prop="kindId">
              <el-select v-model="formData.kindId" placeholder="请选择">
                <el-option v-for="item in kindList" :key="item.value" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页展示">
              <el-switch v-model="formData.homeShow"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="文章内容">
              <quill-editor @getContent="getContent" :articleContent="formData.content"></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" round @click="publish">发布</el-button>
          <el-button round>取消</el-button>
        </el-row>
      </el-form>
    </div>
  </section>
</template>
<script>
import quillEditor from "../components/quillEditor"; //调用编辑器
import upload from "../components/upload";
import {
  getKindList,
  addArticle,
  updateArticle,
  getArticle
} from "../api/admin/";
export default {
  data() {
    return {
      kindList: "",
      formData: {
        title: "",
        coverUrl: "",
        kindId: 1,
        kindName: "",
        homeShow: false,
        content: ""
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }]
      }
    };
  },
  props: ["id"],
  components: {
    quillEditor,
    upload
  },
  watch: {
    id() {
      let params = { id: this.id };
      getArticle(params).then(res => {
        if (res.errno == 0) {
          this.formData.title = res.data.article_title;
          this.formData.kindId = res.data.kind_id;
          this.formData.homeShow = Boolean(res.data.home_show);
          this.formData.content = res.data.content;
          this.formData.coverUrl = res.data.cover_img;
          this.formData.content = res.data.content;
        } else {
          this.$message.error("获取详情失败");
          this.$router.go(-1);
        }
      });
    }
  },
  methods: {
    // 获取分类
    getKindList() {
      getKindList()
        .then(res => {
          this.kindList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取富文本框内容
    getContent(data) {
      this.formData.content = data;
    },
    // 获取封面图片路径
    getCoverUrl(data) {
      this.formData.coverUrl = data;
    },
    // 发布文章
    publish() {
      this.$refs["form"].validate(validate => {
        if (validate) {
          let params = {
            id: this.id,
            title: this.formData.title,
            coverUrl: this.formData.coverUrl,
            kind: this.formData.kindId,
            content: this.formData.content,
            homeShow: this.formData.homeShow ? "1" : "0"
          };
          if (!this.id) {
            addArticle(params).then(res => {
              if (res.errno == 0) {
                this.$message.success(res.errmsg);
              }
            });
            this.$router.go(-1);
          } else {
            updateArticle(params).then(res => {
              if (res.errno == 0) {
                this.$message.success(res.errmsg);
                this.$router.go(-1);
              }
            });
          }
        }
      });
    }
  },
  mounted() {
    this.getKindList();
  }
};
</script>
<style lang="scss" scoped>
.main-container {
  .el-row {
    margin: 20px 0;
  }
}
</style>
