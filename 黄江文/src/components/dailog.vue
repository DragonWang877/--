<template>
  <el-dialog class="dialog"
             title="选择学校"
             :visible.sync="dialogVisible"
             width="461px"
             center>
    <span>{{ 
        schoolList.length > 0 
        ? `当前账号已关联${schoolList.length}个学校,请选择登陆的学校` 
        : `当前账号已关联${schoolList.length}个学校,请先加入学校` 
        }}</span>
    <div style="margin-top: 20px"
         v-for="(item, index) in schoolList"
         :key="index">
      <el-radio v-model="schoolIndex"
                :label="item.id"
                border>{{item.name}}</el-radio>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="colse">取 消</el-button>
      <el-button type="primary"
                 @click="sureIn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchoolList, postSchoolRouter } from '../api/api';

export default {
  name: 'Dailog',
  props: { dialogVisible: Boolean, userId: String },
  data() {
    return {
      schoolIndex: '1',
      schoolList: [],
    }
  },
  watch: {
    // 如果 `userId` 发生改变，这个函数就会运行
    userId: function (newQuestion) {
      // if (newQuestion !== oldQuestion) {  // 可以做优化
      this.getSchool(newQuestion)
      // }
    }
  },
  methods: {
    // 获取学校列表
    getSchool(id) {
      getSchoolList({
        id: id
      }).then((res) => {
        this.loading = false;
        let { data, code } = res.data;
        if (code === 1) {
          this.schoolList = data;
          this.schoolIndex = data.length > 0 ? data[0].id : '';
        }
      })
    },

    // 确认选择学校,然后跳转到home页面
    sureIn() {
      postSchoolRouter({
        id: this.schoolIndex,
        userId: this.userId
      }).then((res) => {
        let { data } = res.data
        localStorage.setItem('router', JSON.stringify(data));
        this.$router.push({ name: "Home" })
        this.colse();
      })
    },

    // 点取消关闭弹窗
    colse() {
      this.$emit("colse")
    }
  },

}
</script>

<style lang="scss">
.dialog {
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin: 10px auto;
  }
  .el-radio {
    display: block;
    margin: 10px auto;
    .el-radio__input {
      float: right;
    }
  }
}
</style>