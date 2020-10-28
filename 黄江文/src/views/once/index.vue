<template>
  <div id="once">
    <div class="header">
      <div>
        <span class="text">成绩分析名称：</span>
        <el-input size="small"
                  placeholder="请输入"
                  style="width: 160px"
                  class="input"></el-input>
        <span class="text">分析类型：</span>
        <el-select v-model="value"
                   size="small"
                   placeholder="请选择"
                   style="width: 100px">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span class="text">状态：</span>
        <el-select v-model="value"
                   size="small"
                   placeholder="请选择"
                   style="width: 100px">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span class="text">考试时间：</span>
        <el-date-picker v-model="value"
                        type="date"
                        size="small"
                        placeholder="选择日期"
                        style="width: 120px">
        </el-date-picker>
        <span class="btn">
          <el-button size="small">查询</el-button>
        </span>
      </div>
      <div>
        <el-button size="small"
                   @click="addAnalyse"><i class="el-icon-plus"></i> 新增分析</el-button>
      </div>
    </div>
    <el-table :data="tableDatas"
              style="width: 100%"
              size="small">
      <el-table-column prop="id"
                       label="编号"
                       align="center"
                       width="50px"></el-table-column>
      <el-table-column prop="title"
                       label="成绩分析名称"
                       align="center"></el-table-column>
      <el-table-column prop="stage"
                       label="学段"
                       align="center"></el-table-column>
      <el-table-column prop="class"
                       label="年级"
                       align="center"></el-table-column>
      <el-table-column prop="year"
                       label="入学年份"
                       align="center"></el-table-column>
      <el-table-column prop="testDate"
                       label="考试时间"
                       align="center"></el-table-column>
      <el-table-column prop="type"
                       label="分析类型"
                       align="center"></el-table-column>
      <el-table-column prop="name"
                       label="创建人"
                       align="center"></el-table-column>
      <el-table-column prop="date"
                       label="创建时间"
                       align="center"></el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       align="center">
        <template slot-scope="scope">
          <el-button type="success"
                     size="small"
                     style="background: rgb(29, 189, 132)"
                     v-show="scope.row.status == 1">分析完成</el-button>
          <el-button type="primary"
                     size="small"
                     v-show="scope.row.status == 0">参数设置</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
 
    <script>
import { getOnceMass } from '../../api/api.js'

export default {
  name: 'Once',
  data() {
    return {
      active: 0,
      tableDatas: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      options: [{
        value: '选项1',
        label: '分析创建'
      }, {
        value: '选项2',
        label: '数据导入'
      }, {
        value: '选项3',
        label: '报表选择'
      }, {
        value: '选项4',
        label: '参数设置'
      }, {
        value: '选项5',
        label: '分析完成'
      }],
      value: ''
    };
  },
  methods: {
    getOnceMass() {
      getOnceMass(this.page).then((res) => {
        let { data } = res.data;
        this.tableDatas = data.list;
      })
    },
    addAnalyse() {
      this.$router.push({ name: 'analyse' })
    }
  },
  mounted() {
    this.getOnceMass();
  }
}
    </script>

<style lang="scss">
.el-main {
  background-color: #e9eef3;
  #once {
    background-color: #ffffff;
    padding: 20px 10px;
    box-sizing: border-box;
    .el-button + .el-button {
      margin: 0;
    }
  }
}
.header {
  display: flex;
  height: 60px;
  display: flex;
  justify-content: space-between;
  .text {
    line-height: 30px;
    margin-left: 10px;
    font-size: 16px;
  }
  .input {
    width: 240px;
  }
  .el-button {
    background: linear-gradient(270deg, #17c7bb, #0fbc77);
    border-color: #0fbc77;

    span {
      color: #ffffff;
    }
  }
  .btn {
    margin-left: 40px;
  }
}
</style>