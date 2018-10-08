<template>
  <section>
    <slot></slot>
    <div class="main-container">
      <form>
        <ul>
          <li>
            <span>文章标题</span>
            <div class="input-wrap">
              <el-input v-model="form.title" placeholder="请输入内容" clearable maxlength="30"></el-input>
            </div>
          </li>
          <li>
            <span>封面图片</span>
            <div class="input-wrap">
              <upload></upload>
            </div>
          </li>
          <li>
            <span>选择分类</span>
            <div class="input-wrap">
              <el-select v-model="form.kindId" placeholder="请选择">
                <el-option v-for="item in kindList" :key="item.value" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </li>
          <li>
            <span>文章内容</span>
            <div class="editor">
              <quill-editor></quill-editor>
            </div>
          </li>
          <li>
            <el-button type="primary" round @click="publish">发布</el-button>
            <el-button round>取消</el-button>
          </li>
        </ul>
      </form>
    </div>
  </section>
</template>
<script>
import quillEditor from "../components/quillEditor"; //调用编辑器
import upload from "../components/upload";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      kindList: "",
      form: {
        title: "",
        kindId: "",
        kindName: ""
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
      this.$axios.post("/api/kindList").then(res => {
        this.kindList = res.data.data;
      }).catch(err=>{
        console.log(err)
      });
    },
    // 发布文章
    publish() {
      console.log(this.content);
      if (!this.form.title) {
        this.$message.error("文章标题不能为空！");
        return false;
      } else if (!this.form.kindId) {
        this.$message.error("请选择文章分类！");
        return false;
      } else if (!this.content.trim()) {
        this.$message.error("请输入文章内容！");
        return false;
      } else {
        this.$axios
          .post("/api/publish", {
            params: {
              title: this.form.title,
              coverUrl: this.coverUrl,
              kind: this.form.kindId,
              content: this.content
            }
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.msg);
            }
          });
      }
    }
  },
  mounted() {
    this.getKindList();
  }
};
</script>
<style lang="scss" scoped>
li {
  span {
    font-size: 14px;
    display: block;
    margin: 20px 0 10px;
    font-weight: bold;
  }
  .input-wrap {
    max-width: 400px;
  }
  .editor {
    padding: 20px 0;
  }
}
</style>
