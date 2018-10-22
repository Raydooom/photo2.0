<template>
  <section>
    <slot></slot>
    <div class="main-container">
      <el-form ref="form" :model="formData" :rules="rules" label-position="top">
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
              <upload></upload>
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
          <el-col :span="24">
            <el-form-item label="文章内容">
              <quill-editor></quill-editor>
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
import { mapGetters } from "vuex";
import { getKindList, addArticle } from "../api";
export default {
  data() {
    return {
      kindList: "",
      formData: {
        title: "",
        kindId: "01",
        kindName: ""
      },
      rules: {
        title: [{ required: true, message: "标题不能为空" }],
        kindId: [{ required: true, message: "标题不能为空" }]
      }
    };
  },
  components: {
    quillEditor,
    upload
  },
  computed: {
    coverUrl() {
      return this.$store.state.coverUrl;
    },
    content() {
      return this.$store.state.publishContent;
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
    // 发布文章
    publish() {
      this.$refs["form"].validate(validate => {
        if (validate) {
          let params = {
            title: this.formData.title,
            coverUrl: this.coverUrl,
            kind: this.formData.kindId,
            content: this.content
          };
          addArticle(params).then(res => {
            if (res.errcode == 0) {
              this.$message.success(res.data.msg);
            }
          });
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
</style>
