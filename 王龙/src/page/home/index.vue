<template>
    <el-container id="home">
      <el-header>
        <div class="teacher" @click="change">
          <img :src="user.img" alt="" />
          {{ user.name }}
        </div>

        <div class="out" @click="logingOut">
          <i class="el-icon-switch-button"></i>
          退出
        </div>
      </el-header>
      <el-container>
        <el-container>
          <el-menu
            :default-openeds="openeds"
            :default-active="active"
            :router="true"
          >
            <el-aside width="200px">
              <SubMenu :children="router" />
              <!-- 组件传参 -->
            </el-aside>
          </el-menu>
          <el-main><router-view></router-view></el-main>
        </el-container>
        <el-footer
          >Copyright © 易校园有限公司
          湘ICP备15014295号-2公安机关备案号：43011102001327
          友情链接：易校园</el-footer
        >
      </el-container>
      <Dialog :dialogVisible="dialogVisible" :userId="user.id" v-on:close="dialogVisible = false"/>
    </el-container>
      


</template>

<script>
import SubMenu from "@/components/submeau";
import Dialog from "@/components/dialog";
export default {
  name: "Home",
  data() {
    return {
      user: "",
      active: "",
      openeds: [],
      router: JSON.parse(localStorage.getItem("router")) || [],
      dialogVisible: false,
    };
  },
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },

  methods: {
    //退出登陆
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },

    //默认展开页面
    getopen(router) {
      router.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.getopen(item.children);
        }
      });
    },

    //手动解决重定向
    getactive(router, redirect) {
      // 如果进来是 '/' 说明需要重定向，不是'/'则不走我们的重定向代码
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
      if (router.children) {
        router.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.getActive(item);
            } else {
              this.active = item.path;
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },

    //点击头像切换
    change() {
      this.dialogVisible = true;
    },
  },

  watch: {
    //监听路由的改变 ，to 去哪个路由 ， from 来自那个路由
    $route(to) {
      this.active = to.path;
    },
     
  },

  mounted() {
    //默认展开页面
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getopen(this.router);
      this.getactive(this.router[0], this.$route.path);
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};

</script>

<style lang="scss">

  #home {
    width: 100%;
    height: 100%;
    .el-header {
      position: relative;
      background-color: #12bf8a;
      color: #333;
      line-height: 70px;
      height: 70px !important;
      .out {
        position: absolute;
        right: 20px;
        width: 60px;
        top: 0;
        float: right;
        cursor: pointer;
      }
      .teacher {
        cursor: pointer;
        width: 100px;
        position: absolute;
        right: 100px;
        top: 0;
        display: flex;
        justify-content: space-between;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 15px;
        }
      }
    }
    .el-footer {
      background-color: #343533;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 46px;
      height: 46px !important;
    }
   
    .el-aside {
      
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #fefefe;
    }
  }

</style>