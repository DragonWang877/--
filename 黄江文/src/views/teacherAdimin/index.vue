<template>
  <div id="teacher"
       v-loading="loading">
    <div class="header">
      <div>
        <span class="text">手机号码：</span>
        <el-input size="small"
                  placeholder="请输入手机号"
                  class="input"></el-input>
        <span class="text">姓名：</span>
        <el-input size="small"
                  placeholder="请输入姓名"
                  class="input"></el-input>
        <span class="btn">
          <el-button size="small">搜索</el-button>
        </span>
      </div>
      <div>
        <el-button style="border: 1px soild #12bf8a;"
                   size="small"><i class="el-icon-share"></i>邀请教师</el-button>
        <el-button style="background: #12bf8a;"
                   size="small"
                   @click="$refs.FormDialog.visible = true"><i class="el-icon-plus"></i> 新增教师</el-button>
      </div>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%"
              size="small">
      <el-table-column prop="name"
                       label="教师姓名"
                       align="center"></el-table-column>
      <el-table-column prop="age"
                       label="年龄"
                       align="center"></el-table-column>
      <el-table-column prop="sex"
                       label="性别"
                       align="center"
                       :formatter="formatter"> </el-table-column>
      <el-table-column prop="phone"
                       label="手机号"
                       align="center"></el-table-column>
      <el-table-column prop="stage"
                       label="学段"
                       align="center"
                       :formatter="formatterStage"></el-table-column>
      <el-table-column prop="subject"
                       label="任教科目"
                       align="center"
                       :formatter="formatterSubject"></el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       align="center">
        <template slot-scope="scope">
          <el-button type="success"
                     size="small"
                     v-show="scope.row.status == 1">正常</el-button>
          <el-button type="danger"
                     size="small"
                     v-show="scope.row.status == 0">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <i class="_icon el-icon-edit-outline"
             @click="$refs.FormDialog.edit(scope.row)"></i><i class="_icon el-icon-delete"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @size-change="changeSize"
                   @current-change="changePage"
                   :current-page="page.pageIndex"
                   :page-sizes="[5, 10]"
                   :page-size="page.pageSize"
                   :total="total"
                   layout="total, sizes, prev, pager, next, jumper"
                   class="pagenation">
    </el-pagination>
    <FormDialog ref="FormDialog"
                :sex="sex"
                :stage="stage"
                :subject="subject" />
  </div>
</template>
<script>
import { getTeacherMass } from '../../api/api.js'

export default {
  name: "Teacher",
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      visible: false,
      stage: {
        1: '小学阶段',
        2: '初中阶段',
        3: '高中阶段'
      },
      subject: {
        1: '语文',
        2: '数学',
        3: '英语',
        4: '道法',
        5: '思美',
        6: '体育'
      },
      sex: {
        0: '女',
        1: '男'
      }
    }
  },

  methods: {
    //判断性别(格式化处理)
    formatter(row) {
      return this.sex[row.sex];
    },
    // 年段
    formatterStage(row) {
      return this.stage[row.stage]
    },
    // 学科
    formatterSubject(row) {
      return this.subject[row.subject]
    },

    // 改变条数
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.loading = true;
      this.teacherApply();
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    //改变页数
    changePage(e) {
      this.loading = true;
      this.page.pageIndex = e;
      this.getTeacherMass();
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    // 获取教师信息
    getTeacherMass() {
      getTeacherMass(this.page).then((res) => {
        let { data } = res.data;
        this.tableData = data.list;
        this.total = data.num;
      })
    },

    // 修改信息
    updateInfos(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e)
    }
  },

  mounted() {
    this.loading = true;
    this.getTeacherMass();
    this.$bus.$off('teacherInfo')
    this.$bus.$on('teacherInfo', this.updateInfos)
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
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
    bottom: -33px;
    right: 0;
  }
  ._icon {
    margin-right: 14px;
    color: #12bf8a;
    font-size: 18px;
  }
  .el-table__header-wrapper {
    height: 40px;
  }
  .el-button + .el-button {
    margin-left: 0px;
  }
  .el-icon-edit-outline,
  .el-icon-delete {
    cursor: pointer;
  }
}
</style>