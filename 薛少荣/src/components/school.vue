<template>
  <div class="school">
    <el-dialog
      width="500px"
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="close"
    >
      <span class="span">{{
        schoolList.length === 0
          ? "您的账号当前未绑定学校,请先选择学校"
          : `您的账号已绑定${schoolList.length}个学校`
      }}</span>

      <template v-if="schoolList.length">
        <div class="xx" v-for="(item, index) in schoolList" :key="index">
          <el-radio v-model="school" :label="item.id" border>{{
            item.name
          }}</el-radio>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="Sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postschool, postschoolApply } from "@/api/api";
export default {
  name: "School",
  props: { dialogVisible: Boolean, userId: Number, userData: Object },
  data() {
    return {
      schoolList: [],
      school: "1",
    };
  },
  watch: {
    userId: function (newQuestion) {
      this.getschool(newQuestion);
    },
  },
  methods: {
    //点击关闭取消按钮
    close() {
      this.$emit("close");
    },

    // 点击确认获取用户权限
    Sure() {
    //   console.log(this.userData);
      postschoolApply({ userId: this.userId, id: this.school }).then((res) => {
        // console.log(res);
        if (res.data.length > 0) {
          localStorage.setItem("user", JSON.stringify(this.userData));
          localStorage.setItem("router", JSON.stringify(res.data));
          this.$router.push({ name: "Home" });
          this.close()
        }else{
            this.close()
        }
      });
    },

    // 弹出框的学校权限
    getschool(id) {
      postschool({ id: id }).then((res) => {
        // console.log(res);
        this.schoolList = res.data;
        this.school = res.data.length > 0 ? res.data[0].id : "";
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.span {
  margin-left: 33px;
}
.xx {
  width: 400px;
  .el-radio.is-bordered {
    width: 400px;
    display: block;
    margin-right: 0px !important;
    margin-left: 31px !important;
    margin-top: 20px;
  }
}
</style>