<template>
  <el-container id="home">
    <el-header>
      <img src="../../assets/littleLogo.png" />
      <div class="out">
        <span @click="outLogin">
          <i class="el-icon-switch-button"></i>
          退出
        </span>
      </div>
      <div class="teacher"
           @click="dialogVisible=true">
        <img :src="user.photo"
             alt="">
        {{user.nickName}}
      </div>
    </el-header>
    <el-container>
      <el-menu :router="true"
               :default-active="active"
               :default-openeds="openeds"
               class="el-menu-vertical-demo">
        <el-aside width="210px">
          <SubMenu :navLeft="routerMenu" /> <!-- 这是个组件(左侧导航栏的) -->
        </el-aside>
      </el-menu>
      <el-main>
        <!-- home: 显示路由页面(当前页面下，也就是home的子项) -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
    <Dailog :dialogVisible="dialogVisible"
            :userId="user.id"
            v-on:colse="dialogVisible=false" />
  </el-container>
</template>

<script>
// 引入组件
import SubMenu from '@/components/subMenu.vue';
import Dailog from '@/components/dailog.vue';
export default {
  name: 'Home',
  data() {
    return {
      active: "/once",
      user: "",
      photo: "",
      openeds: [],
      routerMenu: JSON.parse(localStorage.getItem('router')),
      dialogVisible: false,
    }
  },
  //组件
  components: {
    SubMenu: SubMenu,
    Dailog: Dailog,
  },
  // 监听 切换同级children，监听$route的变化来修改菜单
  watch: {
    // to 去到的路由， from 从哪个路由过来的
    $route(to) {
      this.active = to.path;
      this.routerMenu = JSON.parse(localStorage.getItem('router'));
    },
    routerMenu() {
      this.redirectTo(this.routerMenu[0], this.$route.path);
      this.unfoldMenu(this.routerMenu);
    }
  },
  methods: {
    // 退出登录
    outLogin() {
      localStorage.clear();
      this.$router.push({ name: 'Login' })
    },
    // 默认展开目录
    unfoldMenu(r) {
      r.forEach(item => {
        if (item.children) {
          this.openeds.push(item.name)
          this.unfoldMenu(item.children)
        }
      })
    },
    // 手动解决重定向
    redirectTo(r, path) {
      // 如果进来的路径是'/' 说明需要重定向，不是'/'则不走重定向代码
      if (path !== '/') {
        this.active = this.$route.path;
        return;
      }
      // 根据children来决定谁是第一个，也就是重定向的目标
      if (r.children) {
        r.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.redirectTo(item)
            } else {
              this.active = item.path;
              this.$router.push({ path: item.path })
            }
          }
        })
      } else {
        this.active = r.path;
      }
    }
  },
  mounted() {
    if ((localStorage.getItem('user'))) {
      this.redirectTo(this.routerMenu[0], this.$route.path);
      this.user = JSON.parse(localStorage.getItem('user'));
      this.unfoldMenu(this.routerMenu);
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss">
#home {
  width: 100%;
  height: 100%;
  .el-header {
    line-height: 60px;
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
    img {
      width: 160px;
      height: 60px;
    }
    .teacher {
      color: #fff;
      float: right;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .out {
      color: #fff;
      float: right;
      cursor: pointer;
      span {
        margin-left: 20px;
        &:hover {
          color: greenyellow;
        }
      }
    }
  }
  .el-footer {
    background-color: #333;
    color: #fff;
    height: 40px !important;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
  }
  .el-aside {
    background-color: #fafafa;
    border-right: 1px solid #cccccc;
    .el-menu-vertical-demo {
      border-right: 0px solid #cccccc;
    }
  }
}
</style>