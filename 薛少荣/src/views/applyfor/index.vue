<template>
  <div id="apply" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号码">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="date" label="申请时间"></el-table-column>
      <el-table-column prop="address" label="操作" class="caozuo">
        <template slot-scope="scope">
          <div>
            <el-button
              type="danger"
              v-if="scope.row.status === 2"
              size="small"
              plain
              >已拒绝</el-button
            >
            <el-button
              type="success"
              v-if="scope.row.status === 1"
              size="small"
              plain
              >已通过</el-button
            >
            <div v-if="scope.row.status === 0">
              <el-button
                type="success"
                size="small"
                @click="clickbtn(scope.row, 1)"
                >通过</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="clickbtn(scope.row, 2)"
                >拒绝</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="num"
    >
    </el-pagination>
  </div>
</template>

<script>
import { postteacher } from "@/api/api";

export default {
  name: "Appply",
  data() {
    return {
      loading: true,
      page: {
        pageIndex: 1,
        pageSize: 6,
      },
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      num: 0,
    };
  },
  methods: {
    // 请求数据
    getteacher() {
      postteacher(this.page).then((res) => {
        this.loading = false;
        res.data.list.forEach((ele) => {
          if (ele.sex) {
            ele.sex = "男";
          } else {
            ele.sex = "女";
          }
        });
        this.tableData = res.data.list;
        this.num = res.data.num;
      });
    },

    // 点击同意拒绝按钮
    clickbtn(row, num) {
      row.status = num;
    },

    handleSizeChange(e) {
      console.log(e);
      this.loading = true;
      this.page.pageIndex = 1;
      this.page.pageSize = e;
      this.getteacher();
    },

    // 页数变化
    handleCurrentChange(e) {
      this.loading = true;
      this.page.pageIndex = e;
      this.getteacher();
    },
  },
  mounted() {
    this.getteacher();
  },
};
</script>

<style lang="scss">
#apply {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 8px 12px 12px 12px;
  box-sizing: border-box;
  font-size: 12px;
  .demo-form-inline {
    font-size: 13px;
  }
}

.caozuo > el-button {
  width: 50px;
  line-height: 0px;
  font-size: 12px;
}
.el-table td {
  padding: 5px 0px;
  font-size: 12px;
}
.el-pagination {
  position: absolute;
  bottom: 10%;
  right: 3%;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 11px;
}
</style>