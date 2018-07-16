<template>
    <div>
        列表页
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$axios.get("/api/articleList").then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
</style>
