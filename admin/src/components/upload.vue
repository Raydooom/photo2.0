<template>
  <section>
    <el-upload class="upload-demo" drag :before-upload="beforeupload" :action="action" :on-success="uploadOnSuccess" name="img" :on-change="handleChange" :show-file-list="false">
      <img v-if="imageUrl" :src="imageUrl" class="cover">
      <div class="upload-icon">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <em>点击上传</em> 建议尺寸：750*400，支持 jpg,png,gif
        </div>
      </div>
    </el-upload>
  </section>
</template>
<script>
import { uploadImgUrl } from "../api/admin";
export default {
  data() {
    return {
      action: uploadImgUrl,
      imgType: ["image/jpeg", "image/png", "images/gif"],
      fileSize: "2048000",
      param: "",
      imageUrl: ""
    };
  },
  props: ["imgUrl"],
  watch: {
    imgUrl(val) {
      this.imageUrl = val;
    }
  },
  methods: {
    beforeupload(file) {
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
    uploadOnSuccess(res) {
      let imageUrl = `${process.env.HOST}${res.data}`;
      this.$emit("upLoadImg", imageUrl);
    },
    httprequest() {},
    handleChange(file) {}
  }
};
</script>
<style scoped>
.cover {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
}
.upload-icon {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.el-upload__text {
  color: #fff;
}
</style>
