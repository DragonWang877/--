<template>
  <div id="login">
    <div class="content">
      <div class="left">
        <img :src="img.loginleft" alt="" />
      </div>
      <div class="right">
        <div class="right-content">
          <img :src="img.mobilelogo" alt="" />
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-document-remove"
            placeholder="请输入验证码"
            v-model="code"
          >
            <div
              :class="/^1[3456789]\d{9}$/.test(phone) ? 'sure' : 'send'"
              slot="suffix"
              @click="sendCode ? send() : ''"
            >
              {{ sendContent }}
            </div>
          </el-input>
          <el-button
            :class="
              /^1[3456789]\d{9}$/.test(phone) && code ? 'login' : 'nologin'
            "
            :disabled="/^1[3456789]\d{9}$/.test(phone) && code ? false : true"
            @click="login"
            >登录 / 注册</el-button
          >
        </div>
      </div>
    </div>
    <Dialog :dialogVisible="dialogVisible" :userId="userId" v-on:close="dialogVisible=false"/>
  </div>
</template>

<script>
import { random } from "@/utils/utils";
import { _postCode, _postPhoneLogin } from "@/api/api";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Login",
  data() {
    return {
      img: {
        loginleft: loginleft,
        mobilelogo: mobilelogo,
      },

      phone: "",
      code: "",
      loginBtn: true,
      sendCode: true,
      sendContent: "发送",
      requestCode: "",
      dialogVisible:false,
      userId: 0,
      list: [],
    };
  },
  components: {
    Dialog: Dialog,
  },
  methods: {
    send() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        this.postCode();
        this.time();
      }
    },

    //请求验证码
    postCode() {
      let phoneCodes = random(1000, 9999);
      let phones = this.phone;
      _postCode({
        phone: phones,
        phoneCode: phoneCodes,
      })
        .then((res) => {
          this.requestCode = res.userInfo.data.code;
          this.code = res.userInfo.data.code;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //计时器
    time() {
      let time = 10;
      let timer = setInterval(() => {
        time--;
        (this.sendCode = time === 0 ? true : false),
          (this.sendContent = time === 0 ? "发送" : `${time}s`),
          time < 1 ? clearInterval(timer) : "";
      }, 1000);
    },

    //手机登陆
    login() {
      _postPhoneLogin({
        phone: this.phone,
        code: this.code,
        newCode: this.requestCode,
      }).then((res) => {
        if (res.data.userInfo.code === 1) {
          //登陆成功 存入用户的信息
           this.dialogVisible = true;
          console.log(1)
          localStorage.setItem("user", JSON.stringify(res.data.userInfo));
         
          this.userId = res.data.userInfo.id;
          // this.getUserPermission();
        } else {
          alert(res.data.userInfo.message);
        }
      });
    },

  
  },

  mounted: function () {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") repeat;
  background-size: cover;
  .content {
    position: absolute;
    width: 1474px;
    height: 878px;
    top: 50%;
    left: 50%;
    margin-left: -737px;
    margin-top: -439px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    .left {
      flex: 1;
      img {
        margin: 0 auto;
        margin-top: 180px;
      }
    }
    .right {
      flex: 1;
      .right-content {
        width: 420px;
        height: 420px;
        margin: 0 auto;
        margin-top: 180px;
        img {
          width: 170px;
          height: 70px;
          margin: 0 auto;
        }
        .phone {
          margin-top: 30px;
        }
        .code {
          margin-top: 30px;
          .el-input__suffix {
            .el-input__suffix-inner {
              .send {
                line-height: 40px;
                cursor: no-drop;
              }
              .sure {
                color: aquamarine;
                cursor: pointer;
                line-height: 40px;
              }
            }
          }
        }
        .login {
          margin-top: 30px;
          width: 100%;
          height: 40px;
          background-color: #11bf8a;
          color: #fff;
        }
        .nologin {
          margin-top: 30px;
          width: 100%;
          height: 40px;
          background-color: #11bf8a;
          color: #fff;
          opacity: 0.6;
        }
      }
    }
  }
 
}
</style>