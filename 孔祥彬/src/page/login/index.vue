<template>
  <div id="login">
    <div class="mian">
      <div class="mian-content">
        <div class="left-c">
          <img :src="loginleft" alt="" />
        </div>
        <div class="right-c">
          <div class="img">
            <img :src="mobilelogo" alt="" />
          </div>
          <div class="input">
            <el-input
              class="phone"
              prefix-icon="el-icon-user"
              placeholder="请输入手机号"
              v-model="tell.iPhone"
            >
            </el-input>
            <el-input
              class="code"
              prefix-icon="el-icon-lock"
              placeholder="请输入短信验证码"
              v-model="tell.vcCode"
            >
              <div
                :class="
                  /^1[3456789]\d{9}$/.test(tell.iPhone) ? 'ok send' : 'send'
                "
                slot="suffix"
                @click="btnText === '发送' ? send() : ''"
              >
                {{ btnText }}
              </div>
            </el-input>
          </div>
          <div>
            <el-button class="btn" @click="login" :disabled="!tell.vcCode">
              登录 / 注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </div>
</template>


<script>
import { postCode, postTellLogin } from "@/API/api";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/dialog";

export default {
  name: "login",
  data() {
    return {
      tell: {
        iPhone: "",
        vcCode: "",
        verificationCode: "",
      },
      btnText: "发送",
      falg: "click",
      loginleft: loginleft,
      mobilelogo: mobilelogo,
      dialogVisible: false,
      user: "",
      schollArr: [],
      userId: "6",
    };
  },
  
  components: {
    Dialog: Dialog,
  },

  methods: {
    //发送验证码
    send() {
      let iPhones = this.tell.iPhone;
      this.$message({ message: "发送成功", type: "success" });
      this.time();
      if (/^1[3456789]\d{9}$/.test(this.tell.iPhone)) {
        postCode({ iPhone: iPhones })
          .then((res) => {
            let { data } = res.data;
            if (res.data.code === 1) {
              this.tell.verificationCode = data.code;
              this.tell.vcCode = data.code;
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //登入
    login() {
      let tell = this.tell;
      this.$message({ message: "登录中，请稍后", type: "success" });
      postTellLogin(tell).then((res) => {
        if (res.data.code === 1) {
          this.user = res.data.data;
          this.userId = res.data.data.id;
          this.$message.close();
          this.dialogVisible = true;
          localStorage.setItem("user", JSON.stringify(res.data.data));
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    //倒计时
    time() {
      let countDown = 10;
      let time = setInterval(() => {
        countDown--;
        this.btnText = countDown === 0 ? "发送" : `${countDown}s`;
        if (countDown < 1) {
          clearInterval(time);
          time = null;
        }
      }, 1000);
    },
  },

  mounted: function () {
    if (localStorage.getItem("user")) {
      //  query不会受到重定向（redirect）的影响， login---->Home?id=456--->menu1?id=456
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style lang="scss">
#login {
  height: 100%;
  .mian {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login/bg.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .mian-content {
      width: calc(100% - 240px);
      height: calc(100% - 200px);
      background: #fff;
      border-radius: 10px;
      display: flex;
      .left-c {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 500px;
          height: 400px;
        }
      }

      .right-c {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          margin: 120px auto 0;
          width: 200px;
          height: 80px;
          img {
            width: 200px;
            height: 80px;
          }
        }
        .input {
          width: 422px;
          .phone {
            width: 422px;
            margin-top: 30px;
            .el-input__inner {
              border: 0px solid #fff;
              border-bottom: 1px solid #ddd;
              border-radius: 0px;
            }
          }
          .code {
            width: 422px;
            margin-top: 30px;
            .el-input__suffix {
              .el-input__suffix-inner {
                display: inline-block;
                height: 100%;

                .send {
                  height: 100%;
                  line-height: 40px;
                  cursor: not-allowed;
                }
                .ok {
                  color: #0fbc77;
                  cursor: pointer;
                }
              }
            }
            .el-input__inner {
              border: 0px solid #fff;
              border-bottom: 1px solid #ddd;
              border-radius: 0px;
            }
          }
        }
        .btn {
          width: 422px;
          margin-top: 40px;
          height: 46px;
          background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
          border-radius: 5px;
          color: #fff;
        }
      }
    }
  }
}


</style>
