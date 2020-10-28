<template>
  <div>
    <el-dialog
      class="anmendInfo"
      :title="formInfo.id || formInfo.id == 0 ? '编辑信息' : '新增教师'"
      :visible.sync="dialogVisible"
      width="400px"
    >
      <el-form ref="form" :model="formInfo" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formInfo.name"
            placeholder="请问阁下尊姓大名"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="formInfo.age"
            placeholder="请问阁下芳龄几何"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formInfo.phone" placeholder="请问阁下联系方式"
            >></el-input
          >
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInfo.sex" placeholder="请选择性别">
            <el-option
              v-for="(item, key, index) in sex"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formInfo.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0" class="disabled">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学段" prop="stage">
          <el-select v-model="formInfo.stage" placeholder="请选择学段">
            <el-option
              v-for="(item, key, index) in stage"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任教科目" prop="subject">
          <el-select v-model="formInfo.subject" placeholder="请选择任教科目">
            <el-option
              v-for="(item, key, index) in subject"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AnmendInfo",
  props: {
    stage: Object,
    sex: Object,
    subject: Object,
  },
  data() {
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      formInfo: {},
      radio: "",
      dialogVisible: false,
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        phone: [
          { required: true, message: "请输入手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [{ required: true, message: "请选择科目", trigger: "change" }],
      },
    };
  },

  methods: {
    //点击编辑调起弹窗渲染对应的数据
    open(e) {
      this.dialogVisible = true;
      console.log(e);
      this.radio = e.status;
      this.formInfo = { ...e };
    },

    //提交改掉的信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         this.change()
        } 
      });
    },
    change() {
      setTimeout(() => {
        this.$bus.$emit(
          "formInfo",
          JSON.parse(JSON.stringify(this.formInfo))
        );
        this.$refs["form"].resetFields();
        this.dialogVisible = false;
        this.formInfo = {};
      }, 150);
    },

    //取消重置
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
      this.formInfo = {};
    },
  },
};
</script>

<style lang="scss">
.anmendInfo {
  .el-input--suffix .el-input__inner {
    width: 280px;
  }
  .el-form-item__content {
    text-align: center;
  }

  .disabled.is-checked {
    .el-radio__label {
      color: #f56c6c;
    }

    .el-radio__input.is-checked .el-radio__inner {
      background: #f56c6c;
      border-color: #f56c6c;
    }
  }
}
</style>