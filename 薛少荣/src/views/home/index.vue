<template>
  <div id="home">
    <el-container>
      <el-header>
        <div class="left">
          <img :src="right" alt="" />
        </div>
        <div class="right">
          <div class="users" @click="clickimg">
            <el-avatar :src="user.img"></el-avatar>
            <span>{{ user.nickName }}</span>
          </div>
          <div @click="loginout" class="out">
            <i class="el-icon-switch-button"></i> <span>退出</span>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <el-radio-group v-model="log">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group> -->
          <el-menu
            :default-active="active"
            :default-openeds="opened"
            :router="true"
            class="el-menu-vertical-demo"
          >
            
            <Sub :router="router" />
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer
        >Copyright © 易校园有限公司
        湘ICP备15014295号-2公安机关备案号：43011102001327
        友情链接：易校园</el-footer
      >
    </el-container>
    <School
      :dialogVisible="dialogVisible"
      :userId="user.id"
      :userData="user"
      v-on:close="dialogVisible = false"
    />
  </div>
</template>

<script>
import right from "@/assets/img/mobilelogo.png";
import Sub from "@/components/sub";
import School from "@/components/school";

export default {
  name: "Home",
  data() {
    return {
      log: true,
      dialogVisible: false,
      userId: 9,
      active: "",
      opened: [],
      user: {},
      right: right,
      router: JSON.parse(localStorage.getItem("router")),
      // router: [
      //   {
      //     name: "成绩分析",
      //     children: [
      //       {
      //         name: "单词分析",
      //         path: "/ASingleAnalysis",
      //       },
      //     ],
      //   },
      //   {JSON.parse(localStorage.getItem("router"))
      //     name: "学校管理",
      //     children: [
      //       {
      //         name: "教师管理",
      //         path: "/teacher",
      //       },
      //       {
      //         name: "申请管理",
      //         path: "/applyfor",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  components: {
    Sub: Sub,
    School: School,
  },
  watch: {
    $route(to) {
      //to:即将去哪个路由，from:从哪个路由过来
      this.active = to.path;
      this.router = JSON.parse(localStorage.getItem("router"));
    },

    router: function () {
      this.getopen(this.router);
      this.getactive(this.router, this.$route.path);
    },
  },
  methods: {

    //  handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    // 点击切换学校
    clickimg() {
      this.dialogVisible = true;
    },

    // 退出登录
    loginout() {
      let mess = this.$message({
        iconClass: "el-icon-loading",
        message: "退出登录中...",
      });
      localStorage.clear();
      setTimeout(() => {
        mess.close();
        this.$router.push({ path: "login" });
      }, 1500);
    },

    // 解决重定向 ， 获取active
    getactive(data, redirect) {
      // console.log(redirect)
      if (redirect === "/") {
        // 根据children来决定谁是第一个，也就是重定向的目标
        if (data[0].children) {
          this.getactive(data[0].children, this.$route.path);
        } else {
          this.active = data[0].path;
          this.$router.push({ path: data[0].path });
        }
      } else {
        // console.log(this.$route.path)
        this.active = this.$route.path;
      }
    },

    // 获取opend 当前打开的菜单
    getopen(data) {
      data.forEach((it) => {
        if (it.children) {
          this.opened.push(it.name);
          this.getopen(it.children);
        }
      });
    },
  },

  mounted() {
    // 判断有没有登录
    if (localStorage.getItem("user")) {
      let _user = localStorage.getItem("user");
      this.user = JSON.parse(_user);
      this.getopen(this.router);
      this.getactive(this.router, this.$route.path);
    } else {
      this.$router.push({ path: "login" });
    }
    // console.log(this.$route, this.router);
  },
};
</script>

<style lang="scss">
#home {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }

  .el-header,
  .el-footer {
    background: #b3c0d1;
    color: #333;
    text-align: center;
    // line-height: 60px;
  }
  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    font-size: 13px;
    line-height: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .left {
      width: 113px;
      height: 50px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .right {
      color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > .users {
        margin-right: 54px;
        display: flex;
        align-items: center;
        cursor: pointer;
        > span {
          margin-left: 10px;
        }
      }
    }
  }
  .el-footer {
    height: 40px !important;
    line-height: 40px;
    font-size: 13px;
    color: #fff;
    background: #343533;
  }
  .el-aside {
    background-color: #d3dce6;
  }

  .el-main {
    background-color: #e9eef3;
  }
}

.el-menu-vertical-demo {

}
.out {
  cursor: pointer;
}
</style>