<template>
  <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" @change="onEditorChange($event)">
  </quill-editor>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      content: "",
      editor: "123",
      editorOption: {
        // something config
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    ...mapMutations([
      'changeContent'
    ]),
    onEditorChange({ editor, html, text }) {
      this.changeContent(this.content);
    }
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    // editor() {
    //   return this.$refs.myTextEditor.quillEditor;
    // }
  },
  mounted() {
    // console.log(this.content);
  }
};
</script>

<style>
.ql-editor {
  min-height: 200px;
}
</style>
