<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
b,
dt {
  font-weight: normal;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
i {
  font-style: normal;
}
body {
  margin: 0;
  background: $bgColor;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.05);
}
</style>
