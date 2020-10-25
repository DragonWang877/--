<template>
  <el-dialog
    title="选择学校"
    :visible.sync="dialogVisible"
    width="461px"
    class="_dialog"
  >
    <span class="_title">
      {{
        schollArr.length > 0
          ? `当前账号已关联 ${schollArr.length}个学校，请选择登录学校`
          : `当前账号已关联 ${schollArr.length}个学校,请先加入学校`
      }}</span
    >
    <div class="_dialog_radio">
      <el-radio
        v-model="schoolActive"
        border
        v-for="(item, index) in schollArr"
        :key="index"
        :label="item.id"
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="postLoginSchool">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postLoginSchool, getSchoolList } from "@/API/api";
export default {
  name: "Dialog",
  // 接受父组件传来的参数 冒号后面规定格式
  //props 里的值不能和data里的值重名 因为都是this调用
  props: { dialogVisible: Boolean, userId: String },
  data() {
    return {
      schoolActive: "1",
      schollArr: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  //当值发生改变时才会开始监听
  watch: {
    userId: function (newQuestion) {
      this.getSchoolList(newQuestion);
    },
  },

  methods: {
    //关闭弹窗
    close() {
      this.$emit("close");
    },

    //获取学校数据
    getSchoolList(id) {
      getSchoolList({ id: id }).then((res) => {
        let { data } = res.data;
        this.schollArr = data;
        this.schoolActive = data.length > 0 ? data[0].id + "" : "";
      });
    },

    //个人权限接口
    postLoginSchool() {
      this.$message({ message: "跳转中，请稍后", type: "success" });
      let id = this.schoolActive;
      postLoginSchool({ userId: this.userId, id: id }).then((res) => {
        //跳转页面
        this.$message.close();
        // params会受到重定向（redirect）的影响， login---->Home--->menu1

        // 使用params传参：默认会隐藏拼接的路径，同时需要使用name形式传递
        // this.$router.push({ name: "Login", params: { id: "456" } });

        // 使用query传参：默认显示/login?id=456，不受name、path的影响
        //  this.$router.push({ name: "Login", query: { id: "456" } });
        localStorage.setItem("router", JSON.stringify(res.data.data));
        // localStorage.setItem("user", JSON.stringify(this.user));
        // localStorage.setItem("user", JSON.stringify({id:0}));

        this.$router.push({ path: "/" });
        this.close();
      });
    },
  },
};
</script>

<style lang="scss" >
._dialog {
  ._title {
    margin: 0 auto;
    width: 381px;
  }
  ._dialog_radio {
    .el-radio {
      width: 381px;
      display: block;
      margin: 10px auto;
      .el-radio__input {
        float: right;
        margin-left: 20px;
      }
    }
  }
}
</style>