<template>
    <div>
    <el-dialog
      class="dialog"
      title="选择学校"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <div class="_title">
        {{
          list.length > 0
            ? `当前账号已关联 ${list.length}个学校，请选择登录学校`
            : `当前账号已关联 ${list.length}个学校,请先加入学校`
        }}
      </div>
      <el-radio
        class="el-radio"
        v-for="(item, index) in list"
        :key="index"
        v-model="schoolActive"
        :label="item.id"
        border
        >{{ item.name }}</el-radio
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
import { _postSchoolRouter ,_getUserPermission} from "@/api/api";
export default {
  name: "Dialog",
  props: { dialogVisible: Boolean, userId:Number, }, //定义传参的类型

  data() {
    return {
      schoolActive: "1",
      list: [],
    };
  },

  watch:{
   userId:function(newQuestion){
     this.getUserPermission(newQuestion)
   }
  },
  methods: {
    //确认登陆
    postSchoolRouter() {
      _postSchoolRouter({
        userId: this.userId,
        id: this.schoolactive,
      }).then((res) => {
         this.close()
        //登陆成功 存入用户的路由权限
        localStorage.setItem("router", JSON.stringify(res.data.data));
        this.$router.push({ name: "home" });
      });
    },

    // 关闭弹层
    close() {
      this.$emit("close");
    },

    //获取学校列表
    getUserPermission(id) {
      _getUserPermission({ id: id }).then((res) => {
        this.list = res.data;
        this.schoolactive = res.data.length > 0 ? res.data[0].id : "";
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
 .dialog {
    .el-radio {
      display: block;
      margin: 10px;
      .el-radio__input {
        float: right;
        margin-left: 20px;
      }
    }
  }



</style>