<template>
	<section>
		<slot></slot>
		<div class="form-wrap">
			<form>
				<ul>
					<li>
						<span>文章标题</span>
						<div class="input-wrap">
							<el-input v-model="form.title" placeholder="请输入内容" clearable maxlength="30"></el-input>
						</div>
					</li>
					<li>
						<span>选择分类</span>
						<div class="input-wrap">
							<el-select v-model="form.kindId" placeholder="请选择">
								<el-option v-for="item in kindList" :key="item.value" :label="item.value" :value="item.id">
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

export default {
  data() {
    return {
      kindList: [{ value: "a", id: 1 }, { value: "b", id: 2 }],
      form: {
        title: "",
        kindId: "",
        kindName: ""
      },
      content: "<h2>I am Example</h2>",
      editorOption: {
        // something config
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    publish() {
      return false;
      if (!this.form.title) {
        this.$message.error("文章标题不能为空！");
        return false;
      } else if (!this.form.kindId) {
        this.$message.error("请选择文章分类！");
        return false;
      } else {
        this.$axios
          .post("/api/publish", {
            pramas: {
              title: this.title,
              kind: this.kindId
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
    .editor {
      padding: 20px 0;
    }
  }
}
</style>
