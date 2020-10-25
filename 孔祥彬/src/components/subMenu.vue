<template>
  <div>
    <template v-for="(item, index) in router">
      <el-submenu :key="index" v-if="item.children" :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <SubMenu :router="item.children" />
      </el-submenu>
      <el-menu-item :key="index" v-else :index="item.path">{{item.name}}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  // 接受父组件传来的参数 冒号后面规定格式
  //props 里的值不能和data里的值重名 因为都是this调用
  props: { router: Array },
  data() {
    return {};
  },
};
</script>

<style>
</style>