<template>
  <el-container id="home">
    <el-header>
      <div class="img">
        <img :src="mobilelogo" alt="" />
      </div>
      <div class="teach" @click="dialogVisible = true">
        <img :src="user.img" alt="" />
        <span>{{ user.flag }}</span>
      </div>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <SubMenu :router="router" />
        </el-menu>
      </el-aside>
      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>

    <Dialog
      :dialogVisible="dialogVisible"
      :userId="user.id"
      v-on:close="dialogVisible = false"
    />
  </el-container>
</template>

<script>
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import SubMenu from "@/components/subMenu.vue";
import Dialog from "@/components/dialog";
export default {
  name: "home",
  data() {
    return {
      active: "",
      mobilelogo: mobilelogo,
      dialogVisible: false,
      user: "",
      //默认展开有children的数据的节点
      openeds: [],
      // 有submenu，那必定会有children。
      router: JSON.parse(localStorage.getItem("router")) || [],
    };
  },

  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },

  methods: {
    //退出登入
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "logins" });
    },

    //获取数据里的name值 来默认展开下拉菜单
    getSubMenu(router) {
      router.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.getSubMenu(item.children);
        }
      });
    },

    //修改active 手动解决重定向
    modificationActive(router, path) {
      if (path !== "/") {
        //如果进入页面的path不是“/” 那就是当前子组件 需要重定向到当前子组件
        this.active = this.$route.path;
        return;
      }
      // 根据children来决定谁是第一个，也就是重定向的目标
      if (router.children) {
        router.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.modificationActive(item);
            } else {
              this.active = item.path;
              //手动重定向
              this.$router.push({ name: item.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },
  },

  //watch只会监听当前页面
  //切换同级children ， 监听$route的改变来修改菜单
  watch: {
    //to 将要去的页面 from 从哪个页面来的
    $route(to) {
      this.active = to.path;
      this.router = JSON.parse(localStorage.getItem("router"));
    },
    router: function () {
      this.getSubMenu(this.router);
      this.modificationActive(this.router[0], this.$route.path);
    },
  },

  //html挂载之后触发
  mounted: function () {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push({ name: "logins" });
    }
    this.getSubMenu(this.router);
    this.modificationActive(this.router[0], this.$route.path);
    /*
    1、this.$router: router的实例，包含全部路由和参数
    2、this.$route: 当前页面路由参数，包含传过来的参数params、query
    */
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  background: #fcfcfc;
  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    .out {
      position: absolute;
      top: 0px;
      right: 25px;
      color: #fff;
      cursor: pointer;
    }
    .img {
      width: 100px;
      height: 70px;
      img {
        width: 100px;
        height: 70px;
      }
    }
    .teach {
      height: 70px;
      position: absolute;
      top: 0;
      right: 115px;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .el-footer {
    background: #343533;
    color: #fff;
    text-align: center;
    line-height: 43px !important;
    height: 43px !important;
    font-size: 14px;
  }
  .el-aside {
    border-right: 1px solid #ccc;
    background: #fff;
    .el-menu-vertical-demo {
      border-right: 0px solid #fff;
    }
  }
}
</style>
