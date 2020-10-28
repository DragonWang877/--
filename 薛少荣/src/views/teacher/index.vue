<template>
  <div id="teacher" v-loading="loading">
    <div class="top">
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
      <div>
        <el-button type="success" plain size="small">邀请教师</el-button>
        <el-button
          type="success"
          size="small"
          @click="$refs.teacher.flag = true"
          >新增教师</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" size="small">
      <el-table-column prop="num" style="width: 100px" label="编号">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="name" label="教师姓名"> </el-table-column>
      <el-table-column
        prop="field"
        label="学段"
        :formatter="formatterField"
      ></el-table-column>
      <el-table-column
        prop="subject"
        label="任教科目"
        :formatter="formatterSubject"
      ></el-table-column>
      <el-table-column prop="class" label="任教年级/班级"></el-table-column>
      <el-table-column prop="date" label="更新时间"></el-table-column>
      <el-table-column prop="address" label="状态" class="caozuo">
        <template slot-scope="scope">
          <div>
            <el-button type="success" v-if="scope.row.status === 1" size="small"
              >正常</el-button
            >
            <div v-if="scope.row.status === 0">
              <el-button
                type="danger"
                size="small"
                @click="clickbtn(scope.row, 2)"
                >禁用</el-button
              >
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <div class="Icon" slot-scope="scope">
          <i class="el-icon-edit" @click="clickicon(scope.row)"></i>
          <i class="el-icon-delete"></i>
        </div>
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
    <Teacher ref="teacher" :field="field" :subject="subject" />
  </div>
</template>

<script>
import { postteachers } from "@/api/api";
import Teacher from "../../components/teacher";

export default {
  name: "teacher",
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
      field: {
        0: "小学阶段",
        1: "初中阶段",
        2: "高中阶段",
      },
      subject: {
        0: "语文",
        1: "数学",
        2: "英语",
        3: "政治",
        4: "物理",
        5: "化学",
      },
    };
  },
  components: {
    Teacher: Teacher,
  },
  methods: {
    // 请求数据
    getteacher() {
      postteachers(this.page).then((res) => {
        this.loading = false;
        this.tableData = res.data.list;
        this.num = res.data.num;
      });
    },

    // 学段
    formatterField(row) {
      return this.field[Number(row.field)];
    },

    // 科目
    formatterSubject(row) {
      return this.subject[Number(row.subject)];
    },

    // 点击编辑icon
    clickicon(row) {
      this.$refs.teacher.clickicon(row);
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
  },
  mounted() {
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo", this.changeTeacherInfo);
    this.getteacher();
  },
};
</script>

<style lang="scss">
#teacher {
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

.Icon {
  > .el-icon-edit {
    margin-right: 25px;
  }
  > i {
    color: rgb(35, 177, 130);
    cursor: pointer;
  }
}

.top {
  display: flex;
  justify-content: space-between;
}
</style>