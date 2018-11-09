<template>
  <section>
    <div class="main-container">
      <el-form ref="form" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title" placeholder="请输入内容" clearable maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="内容">
              <quill-editor @getContent="getContent" :articleContent="formData.content"></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" round @click="publish">保存</el-button>
          <el-button round>取消</el-button>
        </el-row>
      </el-form>
    </div>
  </section>
</template>
<script>
import quillEditor from "../components/quillEditor"; //调用编辑器
import { editAboutDeveloper, getAboutDeveloper } from "../api/admin/";
export default {
  data() {
    return {
      formData: {
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }]
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    // 获取富文本框内容
    getContent(data) {
      this.formData.content = data;
    },
    // 发布文章
    publish() {
      this.$refs["form"].validate(validate => {
        if (validate) {
          let params = {
            key: "wxDeveloper",
            title: this.formData.title,
            content: this.formData.content
          };
          editAboutDeveloper(params).then(res => {
            if (res.errno == 0) {
              this.$message.success(res.errmsg);
            } else {
              this.$message.error("保存失败");
            }
          });
        }
      });
    }
  },
  mounted() {
    getAboutDeveloper({ key: "wxDeveloper" }).then(res => {
      this.formData.title = res.data.title;
      this.formData.content = res.data.content;
    });
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
