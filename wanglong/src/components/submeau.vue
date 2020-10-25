<template>
  <div>
     <template v-for="(item, index) in children">
        <el-submenu :index="item.name" :key="index" v-if="item.children">
          <template slot="title"><i :class="item.icon"></i>
          {{item.name}}
          </template>
          <SubMenu :children="item.children"/>
        </el-submenu>
        <el-menu-item :index="item.path" v-else :key="index">{{item.name}}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: { children: Array }, //定义传参的类型
  data() {
    return {

    };
  },
  methods: {},
  mounted() {
console.log(this.children,'111111111')
  },
};
</script>

<style >
</style>
