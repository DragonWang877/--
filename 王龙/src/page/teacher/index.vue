<template>
  <div id="teacher">
    <div class="header">
      <div>
        <span class="text">手机号码：</span>
        <el-input
          size="small"
          placeholder="请输入手机号"
          class="input"
        ></el-input>
        <span class="text">姓名：</span>
        <el-input
          size="small"
          placeholder="请输入姓名"
          class="input"
        ></el-input>
        <span class="btn">
          <el-button size="small">搜索</el-button>
        </span>
      </div>
      <div>
        <el-button><i class="el-icon-eleme"></i> 邀请教师</el-button>
        <el-button
          style="background: #12bf8a"
          @click="$refs.AnmendInfo.dialogVisible = true"
          ><i class="el-icon-plus"></i> 新增教师</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" align="center"> 1</el-table-column>
      <el-table-column prop="name" label="教师姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        :formatter="formatterAge"
      >
      </el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        align="center"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column
        prop="subject"
        label="任教科目"
        align="center"
        :formatter="formatterSubject"
      ></el-table-column>
      <el-table-column label="任教年纪/班级" align="center"
        >七年级</el-table-column
      >
      <el-table-column prop="date" label="更新时间" align="center">
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row, 1)"
            type="success"
            size="small"
            v-if="scope.row.status == 1"
            >正常</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-if="scope.row.status == 0"
            @click="handleClick(scope.row, 0)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i class="el-icon-share" @click="$refs.AnmendInfo.open(scope.row)"></i
          ><i class="el-icon-delete-solid"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page.pageIndex"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagenation"
    >
    </el-pagination>
    <AnmendInfo ref="AnmendInfo" :stage="stage" :subject="subject" :sex="sex" />
  </div>
</template>
<script>
import { _TeacherManagement } from "@/api/api";
import { mapState } from 'vuex';
export default {
  name: "Teacher",
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      loading: false,
    };
  },
   computed: {
    ...mapState("fromInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
      status: "status"
    }),
  },
  methods: {
    teacherApply() {
      _TeacherManagement(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
      });
    },
    handleClick(row, status) {
      row.status = status;
    },

    //改掉stage里面的数据
    formatterStage(row) {
      return this.stage[row.stage];
    },

    //改掉sex里面的数据
    formatterAge(row) {
      return this.sex[row.sex];
    },

    //改掉subject里面的数据
    formatterSubject(row) {
      return this.subject[row.subject];
    },

    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.loading = true;
      this.teacherApply();
    },

    changePage(e) {
      this.loading = true;
      this.page.pageIndex = e;
      this.teacherApply();
    },

    changeTeacherInfo(e) {
      console.log(e,'11111111111');
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },

  mounted: function () {
    this.$bus.$off("formInfo");
    this.$bus.$on("formInfo", this.changeTeacherInfo); //调用bus默认接收参数
    this.teacherApply();
  },
};
</script>
<style lang="scss">
#teacher {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    display: flex;
    height: 60px;
    display: flex;
    justify-content: space-between;
    .text {
      line-height: 30px;
      margin-left: 10px;
    }
    .input {
      width: 240px;
    }
  }
  .pagenation {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .el-icon-share,
  .el-icon-delete-solid {
    margin-right: 14px;
    font-size: 24px;
    color: #12bf8a;
    cursor: pointer;
  }
  .el-icon-delete-solid {
    color: #f56c6c;
  }
}
</style>