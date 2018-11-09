<template>
  <section>
    <el-row v-loading="false">
      <quill-editor ref="Editor" v-model="content" :options="editorOption" @change="onEditorChange($event)">
      </quill-editor>
    </el-row>
    <el-upload id="quill-upload" class="avatar-uploader" :action="action" name="img" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError" :before-upload="beforeUpload">
    </el-upload>
  </section>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { uploadImgUrl } from "../api/admin";

// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];

export default {
  data() {
    return {
      action: uploadImgUrl, // 上传图片地址
      content: "",
      imgType: ["image/jpeg", "image/png", "images/gif"],
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector("#quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  props: ["articleContent"],
  components: {
    quillEditor
  },
  watch: {
    articleContent(newVal) {
      // console.log(newVal);
      this.content = newVal;
    }
  },
  methods: {
    // ...mapMutations(["getContent"]),
    onEditorChange({ editor, html, text }) {
      this.$emit("getContent", this.content);
    },

    beforeUpload(file) {
      if (!this.imgType.includes(file.type)) {
        this.$message.error("图片格式错误！");
        return false;
      } else if (file.size > this.fileSize) {
        this.$message.error(`图片大小不能超过${this.fileSize / 1024}kb`);
      }
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.imageUrl = windowURL.createObjectURL(file);
    },
    uploadSuccess(res) {
      let imageUrl = `${process.env.HOST}${res.data}`;
      this.insertImg(imageUrl);
    },
    // 图片插入编辑器
    insertImg(imageUrl) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.Editor.quill;
      // 如果上传成功
      if (imageUrl) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", imageUrl);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },

    uploadError() {}
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  mounted() {
    // console.log(this.content);
  }
};
</script>

<style>
.ql-editor {
  min-height: 200px;
}
.ql-snow .ql-editor img {
  max-width: 800px;
}
</style>
