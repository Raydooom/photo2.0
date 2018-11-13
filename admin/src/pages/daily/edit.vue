<template>
  <div style="padding-top:20px;">
    <daily-body :id="id"></daily-body>
  </div>
</template>

<script>
import dailyBody from "./body";
export default {
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  components: { dailyBody }
};
</script>

<style>
</style>
