<template>
  <div style="padding-top:20px;">
    <article-body :id="id"></article-body>
  </div>
</template>

<script>
import articleBody from "./articleBody";
export default {
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  components: { articleBody }
};
</script>

<style>
</style>
