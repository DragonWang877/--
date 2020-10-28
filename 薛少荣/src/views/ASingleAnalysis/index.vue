<template>
  <div id="ASingleAnalysis" v-loading="loading">
    <div>
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="成绩分析名称：">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分析类型：">
          <el-select v-model="optType" placeholder="请选择">
            <el-option
              v-for="(item, key, index) in options"
              :key="index"
              :label="item"
              :value="Number(key)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="statusType" placeholder="请选择">
            <el-option
              v-for="(item, key, index) in status"
              :key="index"
              :label="item"
              :value="Number(key)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间：">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.date"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small">查询</el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="clickAdd"
            >新增分析</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="num" style="width: 100px" label="编号">
      </el-table-column>
      <el-table-column prop="title" label="成绩分析名称" width="200"></el-table-column>
      <el-table-column
        prop="field"
        label="学段"
        :formatter="formatterField"
      ></el-table-column>
      <el-table-column prop="class" label="年级"></el-table-column>
      <el-table-column prop="yeardate" label="入学年份"></el-table-column>
      <el-table-column prop="test" label="考试时间"></el-table-column>
      <el-table-column prop="analyzetype" label="分析类型"></el-table-column>
      <el-table-column prop="name" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态" class="caozuo">
        <template slot-scope="scope">
          <div>
            <el-button type="success" v-if="scope.row.status === 1" size="small"
              >分析完成</el-button
            >
            <div v-if="scope.row.status === 0">
              <el-button
                type="primary"
                size="small"
                >参数设置</el-button
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
      :page-sizes="[1]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="num"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { postone } from "@/api/api";

export default {
  name: "ASingleAnalysis",
  data() {
    return {
      // log:false,
      optType:'',
      options:{
        0:"总体基本分析",
        1:'学业质量分析',
        2:'成绩高级分析'
      },
      statusType:'',
      status:{
        0:"参数设置",
        1:'分析完成'
      },
      form:{
        date:''
      },
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
      field: {
        0: "小学阶段",
        1: "初中阶段",
        2: "高中阶段",
      },
    };
  },
  methods: {
    // 请求数据
    getteacher() {
      postone(this.page).then((res) => {
        this.loading = false;
        this.tableData = res.data.list;
        this.num = res.data.num;
      });
    },

    // 学段
    formatterField(row) {
      return this.field[Number(row.field)];
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

    // 修改用户信息
    changeTeacherInfo(e) {
      var index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index,1,e)
    },

    // 点击新增分析
    clickAdd(){
      // this.log = true
      this.$router.push({path:'/add'})
    }
  },
  mounted() {
    this.getteacher();
  },
};
</script>

<style lang="scss">
#ASingleAnalysis {
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
  .top{
    height:40px;
  }
}

.el-pagination {
  position: absolute;
  bottom: 10%;
  right: 3%;
  font-size: 12px;
}

.el-input {
  width: 180px;
  // height: 20px;
}
.el-input__inner {
  height: 28px;
}
.el-button {
  line-height: 0.55;
}
.el-col-11{
  width: 160px;
  cursor: pointer;
}
</style>