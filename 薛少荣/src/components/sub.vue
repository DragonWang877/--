<template>
  <div id="sub">

    <template v-for="(item, index) in router">
      <el-submenu :index="item.name" :key="index" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <Sub :router="item.children" />
      </el-submenu>

      <el-menu-item :index="item.path" :key="index" v-else>{{
        item.name
      }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "Sub",
  props: { router: Array },
  methods: {},
  mounted() {
    console.log(this.router);
  },
};
</script>

<style>
</style>
