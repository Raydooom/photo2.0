<template>
  <section>
    <slot></slot>
    <div class="main-container">
      <el-form ref="form" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="文字" prop="content">
              <el-input type="textarea" autosize :rows="3" v-model="formData.content" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="来自于" prop="from">
              <el-input v-model="formData.from" placeholder="请输入内容" clearable maxlength="12"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片">
              <upload @upLoadImg="getCoverUrl" :imgUrl="formData.img_url"></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择日期" prop="date">
              <el-date-picker v-model="formData.date" type="date" placeholder="选择日期">
              </el-date-picker>
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
import upload from "@/components/upload";
import { addDaily, updateDaily, getDaily } from "@/api/admin/";
export default {
  data() {
    return {
      kindList: "",
      formData: {
        from: "",
        img_url: "",
        date: "",
        content: ""
      },
      rules: {
        content: [{ required: true, message: "文字内容不能为空" }],
        from: [{ required: true, message: "出自不能为空" }],
        date: [{ required: true, message: "日期不能为空" }]
      }
    };
  },
  props: ["id"],
  components: {
    upload
  },
  watch: {
    id() {
      let params = { id: this.id };
      getDaily(params).then(res => {
        if (res.errno == 0) {
          this.formData = {
            ...res.data
          };
        } else {
          this.$message.error("获取详情失败");
          // this.$router.go(-1);
        }
      });
    }
  },
  methods: {
    // 获取封面图片路径
    getCoverUrl(data) {
      this.formData.img_url = data;
    },
    // 发布文章
    publish() {
      this.$refs["form"].validate(validate => {
        if (validate) {
          let params = {
            id: this.id,
            ...this.formData
          };
          if (!this.id) {
            addDaily(params).then(res => {
              if (res.errno == 0) {
                this.$message.success(res.errmsg);
                this.$router.go(-1);
              }
            });
          } else {
            updateDaily(params).then(res => {
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
