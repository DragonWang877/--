<template>
  <div id="login">
    <div class="contain">
      <div class="left">
        <img :src="left" alt="" />
      </div>
      <div class="right">
        <div class="img">
          <img :src="right" alt="" />
        </div>
        <div class="tell">
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
            @input="input"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="code"
          >
            <el-button
              :plain="true"
              :disabled="/^1[3456789]\d{9}$/.test(phone) && flag ? false : true"
              :class="
                /^1[3456789]\d{9}$/.test(phone) && flag ? 'ok send' : 'send'
              "
              slot="suffix"
              @click="send"
            >
              {{ cutdown }}
            </el-button>
          </el-input>
          <el-button
            class="login"
            :disabled="!(log && code)"
            @click="login"
            :plain="true"
            >登录 / 注册</el-button
          >
        </div>
      </div>
      <School :dialogVisible="dialogVisible"  :userId="userId" :userData="userData" v-on:close="dialogVisible = false"/>
    </div>
  </div>
</template>

<script>
import School from "@/components/school";
import { postcode, postlogin} from "@/api/api";
import { random } from "@/utils/utils";
import left from "@/assets/img/loginleft.png";
import right from "@/assets/img/mobilelogo.png";
export default {
  name: "Login",
  data() {
    return {
      schoolList:[],
      school: "2",
      dialogVisible: false,
      flag: false,
      log: false,
      phone: "",
      code: "",
      num: "",
      yzm: random(1000, 9999),
      cutdown: "发送",
      left: left,
      right: right,
      userId:9,
      userData:{},
    };
  },
  methods: {
    input() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        this.log = true;
        if (this.cutdown == "发送") {
          this.flag = true;
        }
      } else {
        this.log = false;
      }
    },

    // 点击发送
    send() {
      this.flag = false;
      this.$message({
        message: "发送成功！",
        type: "success",
        duration: "500",
      });
      this.downtime();
      this.getcode();
    },

    // 倒计时
    downtime() {
      let time = 10;
      let timer = setInterval(() => {
        time--;
        this.cutdown = time + "s后重新发送";
        if (time < 1) {
          this.cutdown = "发送";
          this.flag = true;
          clearInterval(timer);
          this.flag = /^1[3456789]\d{9}$/.test(this.phone) ? true : false;
        }
      }, 1000);
      // this.getcode();
    },

    // 获取验证码
    getcode() {
      postcode({ tell: this.phone, yzm: this.yzm })
        .then((res) => {
          // console.log(res);
          if (res.code === 1) {
            this.num = res.data.code;
            this.$message({
              message: res.data.code,
              type: "success",
              duration: "3000",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击登录
    login() {
      this.getlogin();
    },

    // 登录接口
    getlogin() {
      // console.log(this.phone, this.num, this.code);
      let mess = this.$message({
        iconClass: "el-icon-loading",
        message: "登陆中...",
      });
      postlogin({ tell: this.phone, yzm: this.num, code: this.code }).then(
        (res) => {
          // console.log(res);
          if (res.code === 1) {
            // console.log(res.data.id);
            this.userId = res.data.id
            this.dialogVisible = true;
            this.userData = res.data
            // localStorage.setItem("user", JSON.stringify(res.data));
            // this.$router.push({ name: "Home" });
            mess.close();
            this.$message({
              message: res.message,
              type: "success",
              duration: "3000",
            });
          } else {
            this.$message({
              message: res.message,
              type: "error",
              duration: "3000",
            });
          }
        }
      );
    },

  
  },
  components: {
    School: School,
  },

  mounted() {
    if (localStorage.getItem("user")) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;

  .contain {
    background: #fff;
    width: 85%;
    height: 80%;
    border-radius: 16px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 75%;
      height: 75%;
    }
  }

  .right {
    flex: 1;
    .img {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      > img {
        width: 189px;
        height: 77px;
        text-align: center;
      }
    }
    .tell {
      width: 350px;
      margin: 0 auto;
      > .phone {
        width: 100%;
        margin-top: 30px;
        .el-input__inner {
          border: 0px solid #fff;
          border-bottom: 1px solid #ddd;
          border-radius: 0px;
        }
      }
      > .code {
        width: 100%;
        margin-top: 30px;
        .el-input__inner {
          border: 0px solid #fff;
          border-bottom: 1px solid #ddd;
          border-radius: 0px;
        }
        .el-input__suffix {
          .el-input__suffix-inner {
            display: inline-block;
            height: 100%;

            .send {
              height: 100%;
              // line-height: 40px;
              border: none;
              border-bottom: 1px solid #ccc;
              border-radius: 0%;
              cursor: not-allowed;
              color: rgb(165, 163, 163);
            }
            .ok {
              color: #0fbc77;
              cursor: pointer;
            }
          }
        }
      }
      .login {
        width: 100%;
        margin-top: 68px;
        background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
        border-radius: 5px;
        color: #fff;
      }
    }
  }
}
</style>
