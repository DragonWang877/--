<template>
  <div id="teacher" v-loading="loading">
    <div class="header">
      <span class="text">手机号码：</span>
      <el-input
        size="small"
        placeholder="请输入手机号"
        class="input"
      ></el-input>
      <span class="text">姓名：</span>
      <el-input size="small" placeholder="请输入姓名" class="input"></el-input>
      <span class="btn">
        <el-button size="small">搜索</el-button>
      </span>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <el-button
              @click="handleClick(scope.row, 1)"
              type="success"
              size="small"
              >通过</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleClick(scope.row, 2)"
              >拒绝</el-button
            >
          </div>
          <el-button
            @click="handleClick(scope.row, 1)"
            type="success"
            size="small"
            v-if="scope.row.status == 1"
            >通过</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-if="scope.row.status == 2"
            @click="handleClick(scope.row, 2)"
            >拒绝</el-button
          >
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
  </div>
</template>
<script>
import { _teacherApply } from "@/api/api";
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
  methods: {
    teacherApply() {
      _teacherApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
      });
    },
    handleClick(row, status) {
      row.status = status;
    },

    //获取每一行的数据
    formatter(row) {
      return row.sex ? "男" : "女";
    },

    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.loading = true;
      this.teacherApply();
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },

    changePage(e) {
      this.loading = true;
      this.page.pageIndex = e;
      this.teacherApply();
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
  },

  mounted: function () {
    this.loading = true;
    this.teacherApply();
    this.teacherApply();
    setTimeout(() => {
      this.loading = false;
    }, 1500);
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
    .input {
      width: 240px;
    }
  }
  .pagenation {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>