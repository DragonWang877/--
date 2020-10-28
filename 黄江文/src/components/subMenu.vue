<template>
  <div id="menu">
    <template v-for="(item, index) in navLeft">
      <el-submenu :key="index"
                  v-if="item.children"
                  :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <SubMenu :navLeft="item.children" />
      </el-submenu>
      <el-menu-item :key="index"
                    v-else
                    :index="item.path">{{ item.name }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SubMenu',
  // 接收父组件传过来的参数 // {}内规定传过来参数的格式
  props: { navLeft: Array },
  data() {
    return {
      // navLeft: 111 // props与data中的参数不能重名否则就会报错
    }
  },
  methods: {},
}
</script>

<style>
</style>