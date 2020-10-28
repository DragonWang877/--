<template>
  <div id="app">
    <!-- 显示最外层的router -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {

  },
  // html挂载后执行(只执行一次)适用于请求数据
  mounted() {

  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
