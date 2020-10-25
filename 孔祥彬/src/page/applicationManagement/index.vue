<template>
  <div id="applicationManagement">
    <div class="inpBox">
      <div class="demo-input-suffix">
        <p class="title">手机号码：</p>
        <el-input placeholder="请输入手机号码" v-model="input1"> </el-input>
      </div>
      <div class="demo-input-suffix">
        <p class="title">姓名：</p>
        <el-input placeholder="请输入姓名" v-model="input3"> </el-input>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="date" label="申请时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <el-button
              type="success"
              size="small"
              @click="clickBtn(scope.row, 1)"
              >通过</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="clickBtn(scope.row, 2)"
              >拒绝</el-button
            >
          </div>
          <el-tag type="success" v-if="scope.row.status == 1">已通过</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">已拒绝</el-tag>
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
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import { gerTeacher } from "@/API/api";
export default {
  name: "applicationManagement",
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      input1:'',
      input3: ''
    };
  },

  methods: {
    //获取教师申请数据
    gerTeacher() {
      gerTeacher({
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize,
      }).then((res) => {
        let { list, num } = res.data.data;
        this.total = num;
        this.tableData = list;
      });
    },

    //修改当前条目数量
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.gerTeacher();
    },

    //修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.gerTeacher();
    },

    clickBtn(row, status) {
      //浅拷贝 改变原数组 渲染页面
      row.status = status;
    },

    //获取当前行数据，并格式化（尽量减少对原数组数据的改变）
    formatter(row) {
      //必须用 return
      return row.sex ? "男" : "女";
    },
  },

  mounted: function () {
    this.gerTeacher();
  },
};
</script>

<style lang="scss">
#applicationManagement {
  width: 100%;
  height: 100%;
  position: relative;
  .inpBox {
    display: flex;
    margin-bottom: 2px;
    .demo-input-suffix {
      display: flex;
      align-items: center;
      // width: 200px;
      .title{
        width: 110px;
      }
      .el-input__inner {
        width: 200px;
        height: 40px;
        padding: 0 !important;
      }
    }
  }

  .page {
    position: absolute;
    right: 20px;
    bottom: -60px;
    .active {
      background-color: #1dbd84 !important;
    }
  }
}
</style>