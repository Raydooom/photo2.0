<template>
    <section>
        <slot></slot>
        <div class="form-wrap">
            <form>
                <ul>
                    <li>
                        <span>文章标题</span>
                        <div class="input-wrap">
                            <el-input v-model="input" placeholder="请输入内容" clearable maxlength="30"></el-input>
                        </div>
                    </li>
                    <li>
                        <span>选择分类</span>
                        <div class="input-wrap">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
                        <el-button type="primary" round>发布</el-button>
                        <el-button round>取消</el-button>
                    </li>
                </ul>
            </form>
        </div>
    </section>
</template>
<script>
import quillEditor from "../components/quillEditor"; //调用编辑器

export default {
  data() {
    return {
      content: "<h2>I am Example</h2>",
      editorOption: {
        // something config
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.form-wrap {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.05);
  li {
    span {
      font-size: 14px;
      display: block;
      margin: 20px 0 10px;
    }
    .input-wrap {
      max-width: 400px;
    }
    .editor{
        padding:20px 0;
    }
  }
}
</style>
