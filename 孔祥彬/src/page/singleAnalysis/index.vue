<template>
  <div id="singleAnalysis">
     <router-view ></router-view>
    <el-form ref="form" :model="form" label-width="100px" class="">
      <el-form-item label="成绩分析名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分析类型:">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="请选择"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-button class="btn">查询</el-button>
      <el-button class="btn" icon="el-icon-plus" @click="toAnalyse"
        >新增分析 </el-button
      >
    </el-form>
    <el-table :data="tableData" border style="width: 100%" size="small">
      <el-table-column prop="phone" label="成绩分析名称"></el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column prop="phone" label="年级"></el-table-column>
      <el-table-column prop="phone" label="入学年份"></el-table-column>
      <el-table-column prop="date" label="考试时间"></el-table-column>
      <el-table-column prop="phone" label="分析类型"></el-table-column>
      <el-table-column prop="name" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">参数设置</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">分析完成</el-tag>
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
import { gerTearchInfor } from "@/API/api";
export default {
  name: "SingleAnalysis",
  data() {
    return {
      form: {},
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      input1: "",
      input3: "",
      stage: {
        1: "小学",
        2: "初中",
        3: "高中",
      },
    };
  },
 
  methods: {
    //获取教师申请数据
    gerTearchInfor() {
      gerTearchInfor({
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
      this.gerTearchInfor();
    },

    //修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.gerTearchInfor();
    },

    clickBtn(row, status) {
      //浅拷贝 改变原数组 渲染页面
      row.status = status;
    },

    //获取当前行数据，并格式化（尽量减少对原数组数据的改变）

    // formatter(row) {
    //   return this.sex[row.sex];
    // },
    formatterStage(row) {
      return this.stage[row.stage];
    },
    // formatterSubject(row) {
    //   return this.subject[row.subject];
    // },

    changeTeacherInfo(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },

    toAnalyse() {
      // this.$router.push({ name: 'singleAnalysis', params: 'analyse'}) // -> /user/123
      // this.$router.push({ name: "analyse" });
      this.$router.push({ path: "/analyse" });
    },
  },

  mounted: function () {
    this.gerTearchInfor();
  },
};
</script>

<style lang="scss">
.singleAnalysis {
  width: 100%;
  height: 100%;
  po .el-form {
    display: flex;

    .el-input__inner {
      width: 0px !important;
    }
  }
}

.el-input {
  width: 120px;
}

.el-form-item {
  float: left;
  width: 225px;
}
.el-button {
  background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
  color: #fff;
}

.btn {
  float: left;
  margin-left: 30px;
}
.page {
  position: relative;
  right: 20px;
  bottom: -60px;
  .active {
    background-color: #1dbd84 !important;
  }
}
</style>