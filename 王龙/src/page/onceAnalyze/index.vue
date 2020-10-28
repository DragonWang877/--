<template>
  <div id="onceAnalyze">
    <router-view></router-view>
    <div class="header">
      <div>
        <span class="text">成绩分析名称：</span>
        <el-input placeholder="请输入" class="input"></el-input>
        <span class="text">分析类型：</span>
        <el-select placeholder="请选择" v-model="tableData.type">
          <el-option
            v-for="(item, key, index) in type"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
        <span class="text">状态：</span>
        <el-select placeholder="请选择" v-model="tableData.status">
          <el-option
            v-for="(item, key, index) in status"
            :key="index"
            :label="item"
            :value="key"
          >
          </el-option>
        </el-select>
        <span class="text">
          <span class="demonstration">考试时间：</span>
          <el-date-picker
            type="date"
            placeholder="请选择"
            v-model="tableData.date"
          >
          </el-date-picker>
        </span>
      </div>
      <div>
        <el-button style="background: #12bf8a" class="serach">查询</el-button>
        <router-link to="anlyze">
          <el-button style="background: #12bf8a" @click="addAnlyze"><i class="el-icon-plus"></i> 新增分析</el-button></router-link>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" prop="id" align="center"></el-table-column>
      <el-table-column prop="analyseName" label="成绩分析名称" align="center">
      </el-table-column>
      <el-table-column label="年级" align="center"> 七年级 </el-table-column>
      <el-table-column label="入学年份" align="center">
        2018级
      </el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        align="center"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column label="考试时间" align="center"
        >2020-02-19</el-table-column
      >
      <el-table-column
        prop="type"
        label="分析类型"
        align="center"
        :formatter="formatterType"
      ></el-table-column>
      <el-table-column prop="date" label="创建时间" align="center">
        2020-02-27
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="handleClick(scope.row, 1)"
            v-if="scope.row.status == 1"
            >分析完成</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="handleClick(scope.row, 0)"
            v-if="scope.row.status == 0"
            >参数设置</el-button
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
import { _OnceAnalyse } from "@/api/api";
import { mapState } from "vuex";
export default {
  name: "OnceAnalyze",
  data() {
    return {
      tableData: [],
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },

  computed: {
    ...mapState("onceInfo", {
      stage: "stage",
      type: "type",
      status: "status",
    }),
  },
  methods: {
    onceAnalyse() {
      _OnceAnalyse(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
      });
    },
    handleClick(row, status) {
      row.status = status;
    },

    // 改掉stage里面的数据
    formatterStage(row) {
      return this.stage[row.stage];
    },

    //改掉type里面的数据
    formatterType(row) {
      return this.type[row.type];
    },

    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.loading = true;
      this.onceAnalyse();
    },

    changePage(e) {
      this.loading = true;
      this.page.pageIndex = e;
      this.onceAnalyse();
    },

    addAnlyze() {
      this.$router.push({ name: "anlyze" });
      console.log(1111);
    },
  },

  mounted: function () {
    this.onceAnalyse();
  },
};
</script>
<style lang="scss">
#onceAnalyze {
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
    .el-icon-date {
      position: absolute;
      left: 188px;
    }
    .serach {
      width: 128px;
    }
  }
  .pagenation {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>