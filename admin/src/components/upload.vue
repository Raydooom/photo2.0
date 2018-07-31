<template>
  <section>
    <el-upload class="upload-demo" drag :before-upload="beforeupload" action="https://api.raydom.wang/uploadImg" name="img" :on-change="handleChange">
      <img v-if="imageUrl" :src="imageUrl" class="cover">
      <div class="upload-icon">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em><br>建议尺寸：750*400，支持 jpg,png,gif
        </div>
      </div>
    </el-upload>
  </section>
</template>
<script>
export default {
  data() {
    return {
      imgType: ["image/jpeg", "image/png", "images/gif"],
      param: "",
      imageUrl: ""
    };
  },
  methods: {
    beforeupload(file) {
      console.log(this.imgType.includes(file.type));
      if (!this.imgType.includes(file.type)) {
        this.$message.error("图片格式错误！");
        console.log(123);
        return false;
      }
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;

      this.src = windowURL.createObjectURL(file);
      //重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append("img", file, file.name);
      //下面append的东西就会到form表单数据的fields中；
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      //然后通过下面的方式把内容通过axios来传到后台
      this.$axios
        .post("https://api.raydom.wang/uploadImg", this.param, config)
        .then(res => {
          this.imageUrl = `https://api.raydom.wang${res.data}`;
          this.$store.commit("coverUrl", this.imageUrl);
        });
      return false;
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
