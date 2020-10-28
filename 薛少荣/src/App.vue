<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="div"><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name:"App"
};
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  >.div{
    width: 100%;
    height: 100%;
  }
}
</style>