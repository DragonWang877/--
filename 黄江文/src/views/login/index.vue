<template>
  <div id="login">
    <div id="content">
      <div class="left">
        <img src="../../assets/imgs/loginleft.png" />
      </div>
      <div class="right">
        <div class="right-con">
          <img src="../../assets/imgs/mobilelogo.png" />
          <el-input class="phone"
                    placeholder="请输入手机号"
                    v-model="phone"
                    prefix-icon="el-icon-user">
          </el-input>
          <el-input class="code"
                    placeholder="请输入验证码"
                    v-model="code"
                    prefix-icon="el-icon-lock">
            <div :class="(/^1[3456789]\d{9}$/.test(phone) && mess === '发送') ? 'ok send' : 'send'"
                 slot="suffix"
                 :plain="true"
                 @click="send">{{ mess }}</div>
          </el-input>
          <el-button :class="
               /^1[3456789]\d{9}$/.test(phone) && code 
               ? 'login'
               : 'disable login'"
                     :plain="true"
                     :disabled="!(/^1[3456789]\d{9}$/.test(phone) && code)"
                     @click="logins">登录 / 注册</el-button>
        </div>
      </div>
    </div>
    <Dailog :dialogVisible="dialogVisible"
            :userId="userId"
            v-on:colse="dialogVisible=false" />
  </div>
</template>

<script>
import Dailog from '@/components/dailog.vue'
import { _random } from '../../utils/utils.js'
import { postCode, postJiao } from "@/api/api.js";

export default {
  name: 'Login',
  data() {
    return {
      phone: "",
      code: "",
      telCode: '',
      mess: "发送",
      userId: '0',
      dialogVisible: false
    }
  },

  // 组件
  components: {
    Dailog: Dailog,
  },
  methods: {
    // 接收验证码的接口
    postCode() {
      let telCode = _random(9999, 1000);
      this.$message.success('发送成功');
      postCode({ tel: this.phone, telCode: telCode }).then((res) => {
        let { data, code } = res.data;
        if (code === 1) {
          this.telCode = data.code;
          this.$message({
            message: data.code,
            type: "success",
            duration: "3000"
          })
        }
      })
    },

    // 发送验证码的点击按钮
    send() {
      if (/^1[3456789]\d{9}$/.test(this.phone) && this.mess == "发送") {
        let second = 10;
        this.postCode();
        let timer = setInterval(() => {
          second--;
          second === 0 ? this.mess = '发送' : this.mess = `${second}s`;
          if (second < 1) {
            clearInterval(timer);
          }
        }, 1000);
      }
    },

    // 登录按钮
    logins() {
      this.postJiao();
    },

    // 登录接口,获取用户信息
    postJiao() {
      // let { phone, telCode, code } = this;
      let _mess = this.$message({
        iconClass: "el-icon-loading",
        message: "登陆中请稍等...",
        duration: 15000,
        center: "center"
      })
      postJiao({
        tel: this.phone,
        telCode: this.telCode,
        code: this.code
      }).then((res) => {
        let { data, code, mess } = res.data;
        _mess.close();
        if (code === 1) {
          this.userId = data.id;
          localStorage.setItem('user', JSON.stringify(data));
          this.dialogVisible = true;
        }
        this.$message({
          message: mess,
          type: code === 1 ? "success" : "error"
        })
      })
    },
  },

  // html挂在后执行(只执行一次)适用于请求数据
  mounted: function () {
    if (localStorage.getItem('user')) {
      //  query不会受到重定向（redirect）的影响， login---->Home?id=456--->menu1?id=456
      this.$router.push({ name: 'Home' })
    }
  },
}
 </script>
 
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/bg.png") no-repeat;
  background-size: cover;
}
#content {
  background-color: #ffffff;
  width: calc(100% - 160px);
  height: calc(100% - 140px);
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
  justify-content: center;
  align-items: center;
  display: flex;
  img {
    width: 400px;
    height: 360px;
  }
}

.right {
  flex: 1;
  .right-con {
    color: #ccc;
    width: 500px;
    margin: 0 auto;
    img {
      width: 160px;
      height: 70px;
      margin-top: 160px;
      margin-left: 100px;
    }
    .phone,
    .code {
      width: 477px;
      margin-top: 20px;
      .el-input__inner {
        border: 0px solid #fff;
        border-bottom: 1px solid #ddd;
        border-radius: 0px;
      }
    }
    .code {
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
    }

    .login {
      margin-top: 40px;
      width: 477px;
      height: 46px;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
      border-radius: 5px;
      color: #fff !important;
    }
    .disable {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>