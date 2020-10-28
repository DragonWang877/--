<template>
  <div id="teacher">
    <div class="header">
      <div class="inpBox">
        <div class="demo-input-suffix">
          <p class="title">手机号码：</p>
          <el-input placeholder="请输入手机号码" v-model="input1"> </el-input>
        </div>
        <div class="demo-input-suffix">
          <p class="title">姓名：</p>
          <el-input placeholder="请输入姓名" v-model="input3"> </el-input>
        </div>
        <div class="btnBox">
          <el-button><i class="el-icon-eleme"></i> 邀请教师</el-button>
          <el-button
            style="background: #12bf8a"
            @click="$refs.openDialog.lock = true"
            ><i class="el-icon-plus"></i> 新增教师</el-button
          >
        </div>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" size="small">
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="name" label="教师姓名"></el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column
        prop="subject"
        label="任教科目"
        :formatter="formatterSubject"
      ></el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="formatter"
      ></el-table-column>
      <el-table-column prop="date" label="更新时间"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i
            class="el-icon-share"
            @click="$refs.openDialog.share(scope.row)"
          ></i
          ><i class="el-icon-delete-solid"></i> </template
      ></el-table-column>
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
    <AlterDialog
      ref="openDialog"
      :stage="stage"
      :subject="subject"
      :sex="sex"
    />
  </div>
</template>
<script>
import { gerTearchInfor } from "@/API/api";
import { mapState } from "vuex";
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
      input1: "",
      input3: "",
      lock: false,
    };
  },

  //
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex",
    }),
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

    formatter(row) {
      return this.sex[row.sex];
    },
    formatterStage(row) {
      return this.stage[row.stage];
    },
    formatterSubject(row) {
      return this.subject[row.subject];
    },

    changeTeacherInfo(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },

  mounted: function () {
    /*移除自定义事件监听器。
      如果没有提供参数，则移除所有的事件监听器；
      如果只提供了事件，则移除该事件所有的监听器；
      如果同时提供了事件与回调，则只移除这个回调的监听器。*/
    this.$bus.$off("teacherInfo");

    //监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
    this.$bus.$on("teacherInfo", this.changeTeacherInfo);
    this.gerTearchInfor();
  },
};
</script>
<style lang="scss" scoped>
#teacher {
  width: 100%;
  height: 100%;
  position: relative;
  .inpBox {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    .demo-input-suffix {
      display: flex;
      align-items: center;
      // width: 200px;
      .title {
        width: 110px;
      }
      .el-input__inner {
        width: 200px;
        height: 40px;
        padding: 0 !important;
      }
    }

    .btnBox {
      display: flex;
      align-items: center;
      margin-left: 361px;
    }
  }

  .el-icon-share {
    margin-right: 20px;
    color: rgb(18, 191, 138);
    cursor: pointer;
  }

  .el-icon-delete-solid {
    color: #f56c6c;
    cursor: pointer;
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