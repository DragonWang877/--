<template>
  <div id="add">
    <div class="step">
      <el-steps :active="active" align-center>
        <el-step title="分析类型确定"></el-step>
        <el-step title="分数成绩导入"></el-step>
        <el-step title="报表类型选择"></el-step>
        <el-step title="报表参数设置"></el-step>
      </el-steps>
    </div>
    <div class="center">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分析名称" class="input" prop="name">
          <el-input v-model="form.title" placeholder="请选择分析名称"></el-input>
        </el-form-item>
        <el-form-item label="学段年级" class="input" prop="field">
          <el-select v-model="form.field" placeholder="请选择学段年级">
            <el-option label="一年级" value="0"></el-option>
            <el-option label="二年级" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" class="input" prop="yearDate">
          <el-select v-model="form.yeardate" placeholder="请选择入学年份">
            <el-option label="2020" value="0"></el-option>
            <el-option label="2020" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试科目" class="input" prop="test">
          <el-select v-model="form.subject" placeholder="请选择考试科目">
            <el-option
              v-for="(item, key, index) in subject"
              :key="index"
              :label="item"
              :value="Number(key)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" prop="testTime">
          <el-col :span="11" class="col">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="分析类型">
          <el-radio-group v-model="radio3" size="small">
            <el-radio-button label="总体基本分析"></el-radio-button>
            <el-radio-button label="学业质量分析"></el-radio-button>
            <el-radio-button label="成绩高级分析" disabled></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <el-button type="primary" size="small" @click="clickNext('form')">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      radio3: "总体基本分析",
      active: 0,
      subject: {
        0: "语文",
        1: "数学",
        2: "英语",
        3: "政治",
        4: "物理",
        5: "化学",
      },
      value1:[],
      form: {
        subject:'',
        yeardate:'',
        field:'',
        title:''
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "change"  }],
        field: [{ required: true, message: "请选择学段", trigger: "change" }],
        yearDate:[{ required: true, message: "请选择入学年份", trigger: "change" }],
        test:[{ required: true, message: "请选择考试科目", trigger: "change" }],
        testTime:[{ required: true, message: "请选择考试时间", trigger: "change" }],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },

    // 点击下一步
    clickNext(ref){
      this.$refs[ref].validate((boolean) => {
        if (boolean) {
          this.$refs["form"].resetFields();
        }
      });
    }
  },
};
</script>

<style lang="scss">
#add {
  width: 100%;
  height: 100%;
  .step {
    background: #fff;
    border-radius: 5px;
    height: 10%;
  }
  .center {
    width: 100%;
    height: 80%;
    background: #fff;
    border-radius: 5px;
    margin-top: 8px;
    overflow: hidden;
    >.el-form{
      width: 500px;
      margin:0 auto;
      margin-top:50px;
    }
  }
  .bottom {
    width: 100%;
    height: 8%;
    margin-top: 8px;
    background: #fff;
    border-radius: 5px;
    .el-button--small,
    .el-button--small.is-round {
      position: absolute;
      right: 3%;
      bottom: 8.5%;
    }
  }
  .input {
  width: 500px;
}

 .el-input {
  display: block;
  width: 419px;
}

.col {
  width: 419px !important;
}


}
.el-radio-button--small .el-radio-button__inner {
  padding: 9px 30px;
  font-size: 13px;
  border-radius: 0;
}

</style>